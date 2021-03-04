import React,{Fragment,useState} from 'react'
import {Link} from 'react-router-dom'
import {PropTypes} from 'prop-types'

//redux
import {connect} from 'react-redux'
import {setAlert} from '../../redux/actions/alert'
import {register} from '../../redux/actions/auth'


import axios from 'axios'

const Register = ({setAlert,register}) => {


    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        password2:""
    })

    const {name,email,password,password2}=formData;
    // const [name,setfunction]=useState('')
    // console.log(name)

    const handleChange=(e)=>setFormData({
        ...formData,[e.target.name]:e.target.value
    })


    const onSubmit=async (e)=>{
        e.preventDefault();
        if(password!==password2){

            setAlert('Passwords do not match','danger')
            // console.log("Passwords do not match");
        }
        else{
            console.log("passwords match");


            register({name,email,password});

            // const newUser={
            //     name,
            //     email,
            //     password
            // }

            // try {
                
            //     const config={
            //         headers:{
            //             'Content-Type':'application/json'
            //         }
            //      }

            //     const body=JSON.stringify(newUser);

            //     const res = await axios.post('/api/users',body,config) //starting from /api/ since we added proxy
            //     console.log(res.data)

            // } catch (error) {
                
            // }

        }
    }


    console.log(formData)


    return (
        <Fragment>
            
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={formData.name} onChange={e=>handleChange(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={e=>handleChange(e)} />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={formData.password2} onChange={e=>handleChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>

        </Fragment>
    )
}


Register.propTypes={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired
}


{/* export default Register */}
{/*Chaged to below one to connect to redux  */}
export default connect(null,{setAlert,register})(Register)
 {/*null in place of mapStateToProps, which we dont use in this case, we only call action from this component  */}

