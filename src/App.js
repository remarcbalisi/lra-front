import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Login from "./pages/auth";
import Home from "./pages/home";
import './App.css';
import { Layout } from 'antd';
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
            <Route exact path="/home">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Content>
      <Footer>Created with love</Footer>
    </Layout>
  );
}

export default App;
