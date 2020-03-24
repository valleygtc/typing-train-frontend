import React, { useEffect } from 'react';
import { Form, message } from 'antd';

import UpdateForm from './UpdateForm.jsx';
import { post, fetchArticle } from './utils';
import config from './config';
const { BACKEND_PREFIX } = config;


export default function UpdatePage({
  history,
  location,
}) {
  const [ form ] = Form.useForm();

  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  useEffect(() => {
    const fetchData = async () => {
      let article;
      try {
        article = await fetchArticle(id);
      } catch (e) {
        message.error('网络异常，获取文章失败');
        return
      }
      form.setFieldsValue({
        title: article.title,
        content: article.content,
      });
    }
    fetchData();
  }, []);

  const handleFinish = async (values) =>{
    const title = values['title'];
    const body = {
      id,
      title,
      content: values['content'],
    }
    const resp = await post(`${BACKEND_PREFIX}/api/article/update`, body);
    if (resp.status !== 200) {
      message.error('网络异常，修改文章失败');
      console.error('Error: %o', { resp });
      return ;
    }

    message.success(`成功修改文章“${title}”`);
    console.log('Success: %o', { resp });
    history.goBack();
  }

  return (
    <UpdateForm
      form={form}
      onFinish={handleFinish}
    />
  );
}
