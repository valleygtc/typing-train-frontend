import React, { useState } from 'react';
import { Input, Button } from 'antd';


/**
 * @param {function(string)} onSearch
 * @param {function()} onReset
 */
export default function SearchBar({
  onSearch,
  onReset,
}) {
  const [ value, setValue ] = useState('');

  const handleReset = () => {
    setValue('');
    onReset();
  }

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Input.Search
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSearch={(value) => onSearch(value)}
        enterButton
      />
      <div
        style={{
          marginLeft: '10px',
        }}
      >
        <Button type="primary" onClick={handleReset}>重置</Button>
      </div>
    </div>
  );
}
