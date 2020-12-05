import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Login from "./pages/auth";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import './App.css';

const App = () => {
  return (
    <div>
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
    </div>
  );
}

export default App;
