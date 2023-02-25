import React, { Component } from 'react';  
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';  
import Home from './components/Home';  
import LoginForm from './components/LoginForm';  
import SignUpForm from './components/SignUpForm';  
import './App.css';  
import 'bootstrap/dist/css/bootstrap.min.css';
   
class App extends Component {  
  render() {  
    return (  
       <Router>  
           <div className="p-3 mb-2 bg-gradient-secondary ">  
            <ul className="list-group">  
              <li className="list-group-item list-group-item-secondary">  
                <Link to="/">Home</Link>  
              </li>  
              <li className="list-group-item list-group-item-secondary">  
                <Link to="/login">Login </Link>  
              </li>  
              <li className="list-group-item list-group-item-secondary">  
                <Link to="/signup">Signup</Link>  
              </li>  
            </ul>  
           <Routes>  
                 <Route exact path='/' element={< Home />}></Route>  
                 <Route exact path='/login' element={< LoginForm />}></Route>  
                 <Route exact path='/signup' element={< SignUpForm />}></Route>  
          </Routes>  
          </div>  
       </Router>  
   );  
  }  
}  
export default App;  