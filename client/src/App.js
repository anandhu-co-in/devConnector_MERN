import './App.css';
import React,{Fragment,useEffect} from 'react'
import Landing from './components/layouts/Landing.js'
import Navbar from './components/layouts/Navbar.js'
import Login from './components/auth/Login.js'
import Register from './components/auth/Register.js'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import Alert from './components/layouts/Alert';
import {loadUser} from './redux/actions/auth'
import setAuthToken from './redux/utilities/setAuthToken'


//When you open app, If token exists in locas storage set it to axios headers'  'x-auth-token"
if(localStorage.token){
      setAuthToken(localStorage.token)
  }


const App = () =>{

//using useeffects call load user once the app loads, []at the end makes it work only once in beginning
useEffect(() => {
  console.log("APP.js UseEffect Executed")
  store.dispatch(loadUser()); //store.dispatch, to dispath action from this page
}, []);

 
return(
//Enclosed the whole jsx in provider tag and passed in the store
<Provider store={store}> 
  <Router>
    <Fragment>
      <Navbar />
        <Route exact path="/" component={Landing} />

        <section className="container">

          <Alert/>

          <Switch>

            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />

          </Switch>

        </section>

    </Fragment>
  </Router>
  </Provider>
);
}
export default App;
