import React from 'react';
import { Form, Button, Input } from 'antd';

const { TextArea } = Input;


export default function AddForm({
  onFinish,
}) {
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
      onFinish={onFinish}
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
