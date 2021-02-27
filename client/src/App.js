import './App.css';
import React,{Fragment} from 'react'
import Landing from './components/layouts/Landing.js'
import Navbar from './components/layouts/Navbar.js'
import Login from './components/auth/Login.js'
import Register from './components/auth/Register.js'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import Alert from './components/layouts/Alert';


//Enclosed the whole jsx in provider tag and passed in the store


const App = () =>

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
export default App;
