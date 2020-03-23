import React from 'react';
import { Button } from 'antd';

import SearchBar from './SearchBar.jsx';


/**
 * @param {boolean} managing
 * @param {function(string)} onSearch
 * @param {function()} onSearchReset
 * @param {function(boolean)} onManagingChange
 */
export default function FunctionBar({
  managing,
  onSearch,
  onSearchReset,
  onManagingChange,
}) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <div style={{
        width: '50%',
      }}>
        <SearchBar
          onSearch={onSearch}
          onReset={onSearchReset}
        />
      </div>
      {managing
        ? <Button type="primary" onClick={() => {console.log('click add button')}}>添加</Button>
        : <Button type="primary" onClick={() => onManagingChange(true)}>管理</Button>
      }
    </div>
  )
}
