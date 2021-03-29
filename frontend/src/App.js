import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

const App = props => {
  return(
    <div className="App">
      <Router>
        <Route exact path="/" component ={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Router>
    </div>
  )
}

export default App