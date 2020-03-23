import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Layout } from 'antd';

import Home from './Home.jsx';

const { Header, Content, Footer } = Layout;


export default function App() {
  return (
    <Router>
      <Layout style={{
        minHeight: '100vh',
      }}>
        <Header>
          <Link
            to="/"
            style={{
              color: 'white',
            }}
          >typing-train</Link>
        </Header>
        <Content style={{
          flexGrow: '1',
          width: '1000px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
        }}>
          <Switch>
            {/* <Route path="/manage">
              <Users />
            </Route> */}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Content>
        <Footer style={{
          textAlign: 'center',
        }}>
          Footer
        </Footer>
      </Layout>
    </Router>
  );
}
