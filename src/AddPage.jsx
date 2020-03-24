import React from 'react';
import { message } from 'antd';

import AddForm from './AddForm.jsx';
import { post } from './utils';
import config from './config';
const { BACKEND_PREFIX } = config;


export default function AddPage({
  history,
}) {
  const handleFinish = async (values) => {
    const title = values['title'];
    const body = {
      title,
      content: values['content'],
    }
    const resp = await post(`${BACKEND_PREFIX}/api/article/add`, body);
    if (resp.status !== 200) {
      message.error('网络异常，添加文章失败');
      console.error('Error: %o', { resp });
      return ;
    }

    message.success(`成功添加文章“${title}”`);
    console.log('Success: %o', { resp });
    history.goBack();
  };

  return (
    <AddForm onFinish={handleFinish} />
  );
}
