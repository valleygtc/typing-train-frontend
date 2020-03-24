import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Input } from 'antd';
import { message } from 'antd';

import { post } from './utils';
import config from './config';
const { BACKEND_PREFIX } = config;

const { TextArea } = Input;


export default function AddForm() {
  const history = useHistory();

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

  const handleFinishFailed = (errorInfo) => {
    console.error(errorInfo);
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  return (
    <Form
      name="AddForm"
      {...layout}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '必须输入文章标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="内容"
        name="content"
        rules={[{ required: true, message: '必须输入文章内容' }]}
      >
        <TextArea autoSize={{minRows: 10}} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}
