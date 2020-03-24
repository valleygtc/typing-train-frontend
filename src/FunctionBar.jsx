import React from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const handleAddClick = () => {
    history.push('/add');
  }

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
        ? <Button type="primary" onClick={handleAddClick}>添加</Button>
        : <Button type="primary" onClick={() => onManagingChange(true)}>管理</Button>
      }
    </div>
  )
}
