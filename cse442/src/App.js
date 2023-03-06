import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages';
import Navbar from './Navbar';


function App() {
    return (
	<Router>
	    <Navbar />
      <Switch>
          <Route exact path='/'>
	      <Home />
	  </Route>
	  <Route path='/signin'>
	      <SignIn />
	  </Route>
	  <Route path='/signup'>
	      <SignUp />
	  </Route>
      </Switch>
    </Router>
  );
}

export default App;



