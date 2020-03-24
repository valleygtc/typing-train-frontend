import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { message, Button } from 'antd';

import FunctionBar from './FunctionBar.jsx';
import { get } from './utils';
import config from './config';
const { BACKEND_PREFIX } = config;


/**
 */
export default function Home({
  managing=false,
}) {
  const [ articles, setArticles ] = useState([]);
  const [ pagination, setPagination ] = useState({
    current: 1,
    pageSize: null,
    total: null,
  });
  const [ searchTitle, setSearchTitle ] = useState('');
  const history = useHistory();

  const handleManagingChange = (managing) => {
    if (managing) {
      history.push('/manage');
    } else {
      history.push('/');
    }
  }

  const fetchData = async (
    current,
    searchTitle,
  ) => {
    const params = {
      page: current,
      title: searchTitle,
    }
    const resp = await get(`${BACKEND_PREFIX}/api/articles/titles/`, params);
    if (resp.status !== 200) {
      console.error('Error: %o', { resp });
      throw new Error('resp status !== 200')
    }

    const respJSON = await resp.json();
    console.log('App fetchData: receive resp: %o', { respJSON });
    return respJSON;
  }

  const refreshData = async () => {
    console.log('App: refreshData');
    let respJSON;
    try {
      respJSON = await fetchData(pagination.current, searchTitle);
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
    refreshData();
  }, []);

  const handleSearch = async (title) => {
    console.log('handleSearch: %o', {title});
    setSearchTitle(title);

    let respJSON;
    try {
      respJSON = await fetchData(1, title);
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
      respJSON = await fetchData(1, title);
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
  // add
  // check
  // delete
  // update

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
          <li>{item.title}
          {managing
            ? (<>
                <Button>查看</Button>
                <Button>更改</Button>
                <Button>删除</Button>
              </>)
            : null
          }</li>
        ))}
      </ul>
    </div>
  );
}
