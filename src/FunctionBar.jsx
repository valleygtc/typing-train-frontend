import React from 'react';
import { Button } from 'antd';

import SearchBar from './SearchBar.jsx';


export default function FunctionBar({
  onSearch,
  onSearchReset,
}) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <div style={{
        width: '50%',
      }}>
        <SearchBar />
      </div>
      <Button type="primary" onClick={() => {console.log('click manage button')}}>管理</Button>
    </div>
  )
}
