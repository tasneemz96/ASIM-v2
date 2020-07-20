import React from 'react';
import SignUp from './components/signup.component';
import SignIn from './components/signin.component';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Route path='/register' component={SignUp}/>
      <Route path='/login' component={SignIn}/>
    </Router>
  );
}

export default App;
