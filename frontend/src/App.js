import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import SignUp from './components/SignUp'

const App = props => {
  return(
    <div className="App">
      <Router>
        <Route exact path="/signup" component={SignUp} />
        {/* <Route exact path="/" component={Content} /> */}
        {/* <Route exact path="/poll/response/:id" component={PollResponseForm} /> */}
        {/* <Route path="/poll/results/:id" component={PollResults} /> */}
      </Router>
    </div>
  )
}

export default App