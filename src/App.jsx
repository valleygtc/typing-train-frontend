import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Layout } from 'antd';

import Home from './Home.jsx';
import AddPage from './AddPage.jsx';
import UpdatePage from './UpdatePage.jsx';

const { Header, Content, Footer } = Layout;


export default function App() {
  return (
    <Router>
      <Layout style={{
        minHeight: '100vh',
      }}>
        <Header>
          <Link to="/">typing-train</Link>
        </Header>
        <Content style={{
          flexGrow: '1',
          width: '1000px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
        }}>
          <Switch>
            <Route path="/add" component={AddPage} />
            <Route path="/update" component={UpdatePage} />
            <Route path="/manage" render={(routeProps) => <Home managing {...routeProps} />} />
            <Route path="/" component={Home} />
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
