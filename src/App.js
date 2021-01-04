import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import ListComponent from './components/ListComponent';
import NotFound from './components/NotFound';

import 'antd/dist/antd.css';
import './index.css';
import './App.css';


function PrivateRoute({ children, ...rest }) {
  let auth = localStorage.getItem('jwt');
  if (auth) {
    return (<Route
      {...rest}
      render={() =>
      (
        children
      )
      }
    />);
  }
  return (
    <Redirect
      to={{
        pathname: "/admin/login",
      }}
    />
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        User Management
      </header>
      <Router>
        <>
          <Switch>
            <Route path='/' exact component={HomeComponent} />
            <Route path='/user/register' exact component={RegisterComponent} />
            <Route path='/admin/login' exact component={LoginComponent} />
            <PrivateRoute path='/admin/users/list' exact component={ListComponent} />
            <Route component={NotFound} />
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
