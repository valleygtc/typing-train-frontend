import React, { useState, useEffect } from 'react';
import { message, Button } from 'antd';

import FunctionBar from './FunctionBar.jsx';
import { get } from './utils';
import config from './config';
const { BACKEND_PREFIX } = config;


/**
 */
export default function Home() {
  const [ articles, setArticles ] = useState([]);
  const [ pagination, setPagination ] = useState({
    current: 1,
    pageSize: null,
    total: null,
  });
  const [ searchTitle, setSearchTitle ] = useState('');
  const [ managing, setManaging ] = useState(false);

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

  const handleSearch = (title) => {
    console.log('handleSearch: %o', {title});
    setSearchTitle(title);
    // TODO: refresh
  }

  const handleSearchReset = () => {
    setSearchTitle('');
    // TODO: refresh
  }

  return (
    <div>
      <FunctionBar
        managing={managing}
        onSearch={handleSearch}
        onSearchReset={handleSearchReset}
        onManagingChange={setManaging}
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
