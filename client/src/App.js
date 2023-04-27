import './App.css';
import {  BrowserRouter, Route,useLocation, Switch} from 'react-router-dom'
import About from './components/About/About.jsx';
import Detail from './components/Detail/Detail.jsx';
import Form from './components/Form/Form.jsx';
import Nav from './components/Nav/Nav.jsx';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';


function App() {
  const { pathname } = useLocation();

  return (
      <div className ="App">
        
          {pathname !== "/" && <Nav className='nav'/>}
        <Switch>
          <Route exact path = "/" component ={Landing} />
          <Route exact path = "/home" component = {Home} />
          <Route exact path = "/activities" component = {Form} />
          <Route exact path = "/countries/:id" component = {Detail} />
          <Route exact path = "/about" component = {About} />
        </Switch>
      </div>
  );
}

export default App;
