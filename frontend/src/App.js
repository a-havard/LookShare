import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import ProfilePage from './components/ProfilePage'
import ExplorePage from './components/Explore'

const App = props => {
  return(
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/" component ={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route  path="/profile/:id" component={()=><ProfilePage  />}   />
        <Route  path="/explore" component={()=><ExplorePage/>}   />
        </Switch>
      </Router>

    </div>
  )
}

export default App