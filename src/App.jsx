import React from 'react';
import { Layout, Button } from 'antd';

import Home from './Home.jsx';

const { Header, Content, Footer } = Layout;


export default function App() {
  return (
    <Layout style={{
      minHeight: '100vh',
    }}>
      <Header>
        <Button type="link">typing-train</Button>
      </Header>
      <Content style={{
        flexGrow: '1',
        width: '1000px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
      }}>
        <Home />
      </Content>
      <Footer style={{
        textAlign: 'center',
      }}>
        Footer
      </Footer>
    </Layout>
  );
}
