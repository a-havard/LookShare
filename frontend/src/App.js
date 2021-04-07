import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/Profile'

const App = props => {
  return(
    <div className="App">
      <Router>
        <Route exact path="/" component ={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/profile" component={Profile} props={1} />
      </Router>
    </div>
  )
}

export default App