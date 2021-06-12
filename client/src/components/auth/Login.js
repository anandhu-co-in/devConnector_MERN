import React,{Fragment,useState} from 'react'
import {Link, Redirect} from 'react-router-dom'

import {connect} from 'react-redux';
import PropTypes from 'prop-types' 
import {login} from '../../redux/actions/auth'
import Alert from '../layouts/Alert';


const Login = ({login,isAuthenticated}) => {

    const [formData,setFormData]=useState({
        email:"",
        password:""
    })

    const {email,password}=formData;

    const handleChange=(e)=>setFormData({
        ...formData,[e.target.name]:e.target.value
    })


    const onSubmit=async (e)=>{
        e.preventDefault();
        console.log("Login on Submit");
        login(email,password);
    }


    console.log(formData)

    //If user is logged in,redirect to the dashboard. We dont need to see login page
    if(isAuthenticated){
      return <Redirect to ='/dashboard'/>;
    }


    return (
        <Fragment>
{/*             
      <h1 className="large text-primary">Login</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>

        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={e=>handleChange(e)} />
          </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={formData.password} onChange={e=>handleChange(e)}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
 */}


<main className="main-container">
        
        <div className="left-side">
            <div className="welcomemessage">
                <h1>Welcome to DevConnector</h1>
                <h4>A Social Network for Developers</h4>
                <Link to="/register"><button className="primaryGreenButton">REGISTER</button></Link>
            </div>
        </div>

        <div className="right-side">

            <form className="loginform" onSubmit={e=>onSubmit(e)}>
                <Alert/>
                <h3>SIGN IN TO YOUR ACCOUNT</h3>
                <div className="input-group">
                    <label>Email</label>
                    <input type="text" placeholder="youremail@gmail.com" name="email" value={formData.email} onChange={e=>handleChange(e)}/>
                    
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input type="password" placeholder="******************" name="password" value={formData.password} onChange={e=>handleChange(e)}/>
                </div>
                
                <div className="input-group">
                    <input className="button" type="submit" value="SIGN IN"/>
                </div>

                <div className="input-group">
                    <Link to="/register">Do not have and account?</Link>
                </div>

            </form>


        </div>


    </main>




        </Fragment>
    )
}

Login.propTypes={
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
}

const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
});



export default connect(mapStateToProps,{login})(Login)
