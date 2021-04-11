
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Dashboard from '../src/Components/Dashboard/dashboard'


function App() {
  return (
    <div className="App">
       <Router>
           <Switch>
               {/* <Route path="/signup" exact component={SignUp} /> */}
               <Route path="/login" exact component={Login} />
               <Route path="/dashboard" component={Dashboard} />
           </Switch>
       </Router>
    </div>
  );
}

export default App;
