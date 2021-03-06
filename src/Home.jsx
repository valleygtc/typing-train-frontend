import React, { useState, useEffect } from 'react';
import { message, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import FunctionBar from './FunctionBar.jsx';
import {
  fetchArticleList,
  fetchArticle,
  reqDel,
} from './utils';


/**
 * @param {boolean} managing
 * @param {object} history - react-router routePorps
 */
export default function Home({
  managing=false,
  history,
}) {
  const [ articles, setArticles ] = useState([]);
  const [ pagination, setPagination ] = useState({
    current: 1,
    pageSize: null,
    total: null,
  });
  const [ searchTitle, setSearchTitle ] = useState('');

  const handleManagingChange = (managing) => {
    if (managing) {
      history.push('/manage');
    } else {
      history.push('/');
    }
  }

  const refreshArticles = async () => {
    console.log('App: refreshData');
    let respJSON;
    try {
      respJSON = await fetchArticleList(pagination.current, searchTitle);
    } catch (e) {
      message.error('网络异常，刷新失败');
      return
    }
    setArticles(respJSON.data);
    setPagination({
      ...pagination,
      pageSize: respJSON['pagination']['per_page'],
      total: respJSON['pagination']['total'],
    });
  }

  useEffect(() => {
    refreshArticles();
  }, []);

  const handleSearch = async (title) => {
    console.log('handleSearch: %o', {title});
    setSearchTitle(title);

    let respJSON;
    try {
      respJSON = await fetchArticleList(1, title);
    } catch (e) {
      message.error('网络异常，刷新失败');
      return
    }
    setArticles(respJSON.data);
    setPagination({
      ...pagination,
      current: 1,
    });
  }

  const handleSearchReset = async () => {
    console.log('handleSearchReset.');
    const title = ''
    setSearchTitle(title);
  
    let respJSON;
    try {
      respJSON = await fetchArticleList(1, title);
    } catch (e) {
      message.error('网络异常，刷新失败');
      return
    }
    setArticles(respJSON.data);
    setPagination({
      ...pagination,
      current: 1,
    });
  }

  const handleEnterTyping = (id) => {
    history.push(`/typing?id=${id}`);
  }

  const handleCheckClick = async (id) => {
    let article;
    try {
      article = await fetchArticle(id);
    } catch (e) {
      message.error('网络异常，获取文章失败');
      return
    }
    Modal.info({
      icon: null,
      title: `题目：${article.title}`,
      content: (
        <pre>
          {article.content}
        </pre>
      ),
      width: '800px',
      onOk() {},
    });
  }

  const handleUpdateClick = (id) => {
    history.push(`/update?id=${id}`);
  }

  const handleDelClick = (id, title) => {
    Modal.confirm({
      title: `确认删除文章“${title}”？`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        let msg;
        try {
          msg = await reqDel(id);
        } catch (e) {
          message.error('网络异常，删除文章失败');
          return
        }
        message.success(`成功删除文章“${title}”`);
        console.log('Success: %o', { msg });
        refreshArticles();
      },
    });
  }

  return (
    <div>
      <FunctionBar
        managing={managing}
        onSearch={handleSearch}
        onSearchReset={handleSearchReset}
        onManagingChange={handleManagingChange}
      />
      <ul>
        {articles.map((item) => (
          <li key={item.id}>
            <Button type="link" onClick={() => handleEnterTyping(item.id)}>{item.title}</Button>
          {managing
            ? (<>
                <Button size="small" onClick={() => handleCheckClick(item.id)}>查看</Button>
                <Button size="small" onClick={() => handleUpdateClick(item.id)}>更改</Button>
                <Button size="small" onClick={() => handleDelClick(item.id, item.title)}>删除</Button>
              </>)
            : null
          }</li>
        ))}
      </ul>
    </div>
  );
}
