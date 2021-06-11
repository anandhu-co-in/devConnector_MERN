import './App.css';
import React,{Fragment,useEffect} from 'react'
import Landing from './components/layouts/Landing.js'
import Navbar from './components/layouts/Navbar.js'
import Login from './components/auth/Login.js'
import Register from './components/auth/Register.js'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import Alert from './components/layouts/Alert';
import {loadUser} from './redux/actions/auth'
import setAuthToken from './redux/utilities/setAuthToken'
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/Profile/Profiles';
import IndividualProfile from './components/Profile/IndividualProfile';
import Posts from './components/posts/Posts';
import Post from './components/Post/Post';
import { GET_POSTS } from './redux/actions/types';




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

        <Alert/>
        <Route exact path="/" component={Landing} />
        <Route exact path="/Login" component={Login}/>

        <section className="container">
          <Switch>
            <Route exact path="/Register" component={Register}/>
            <Route exact path="/Profiles" component={Profiles}/>
            <Route exact path="/Profile/:id" component={IndividualProfile}/>

            {/* For the dashboard route, the user should be authenticated, we have created a PivateRoute to display this component which displays dashboard only if authenticated, else redirects to login*/}
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/posts/:id" component={Post} />

          </Switch>

        </section>

    </Fragment>
  </Router>
  </Provider>
);
}
export default App;
