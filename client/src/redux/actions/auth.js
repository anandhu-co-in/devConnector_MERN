import axios from 'axios';
import {REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR} from './types';
import {setAlert} from './alert'

import setAuthToken from '../utilities/setAuthToken'



//Register user using api call

export const register = ({name,email,password}) => async dispatch =>{

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body=JSON.stringify({name,email,password});
    
    try {

        const res = await axios.post('/api/users',body,config);

        console.log("Registration success")
        console.log(res.data)
        //If registration is success

        dispatch({
            type : REGISTER_SUCCESS,
            payload : res.data
        });
        
        console.log("Dispath coplete")

    } catch (err) {

        const errors=err.response.data.errors; //axios gives us response and data properties in the error/response object.

        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg, 'danger')));
        }


        dispatch({
            type:REGISTER_FAIL
        });
    }

}


// Load user

export const loadUser = () => async dispatch => {

    //If token exists in locas storage set it to axios headers'  'x-auth-token"
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }


    try{
        const res=await axios.get('api/auth');

        dispatch({
            type :USER_LOADED,
            payload:res.data
        });
    }
    catch(err){
        dispatch({
            type:AUTH_ERROR
        })
    }

}