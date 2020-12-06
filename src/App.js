import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import Login from "./pages/auth";
import Home from "./pages/home";
import './App.css';
import { Layout } from 'antd';

import React, { useContext, createContext, useState, useEffect } from "react";
import useGlobalAuthUser from "./global_hooks/auth_user"

const axios = require('axios').default;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('bearer_token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header></Header>
      <Content>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          </Switch>
        </Router>
      </Content>
      <Footer>Created with love</Footer>
    </Layout>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ children, ...rest }) => {
  const [auth, authActions] = useGlobalAuthUser();
  const bearer_token = localStorage.getItem('bearer_token')
  
  useEffect(async () => {
    await authActions.checkAuth()
  }, []);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        bearer_token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
