import React from 'react';
import Signup  from "./Signup";
import {Container} from 'react-bootstrap'
import {AuthProvider} from '../contexts/AuthContext'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ResetPassword from './ResetPassword'
import UpdateProfile from './UpdateProfile'
function App() {
  return (
    <>
    <Container className="mt-3">
      <Router>
    <AuthProvider>
        <Switch>
          <PrivateRoute path="/" exact component={Dashboard} />
          <PrivateRoute path="/update-profile" exact component={UpdateProfile} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/reset-password" exact component={ResetPassword} />
        </Switch>
    </AuthProvider>
    </Router>
    </Container>
    </>
  );
}

export default App;
