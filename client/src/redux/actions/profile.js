import axios from 'axios';
import {setAlert} from './alert';

import {GET_PROFILE,PROFILE_ERROR} from './types';

//Get current users profile

export const getCurrnetProfile=()=>async dispatch=>{

    try {
        
        const res = await axios.get('/api/profile/me');

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        
    } catch (err) {
        console.log(err.res);

        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }

}


// Create or update profile
export const createProfile = (formData,history,edit=false) => async dispatch=>{

try {

    const config = {
        'Content-Type':'application/json'
    }
    
    const res=await axios.post('api/profile',formData,config);

    dispatch({
        type:GET_PROFILE,
        payload:res.data
    });

    dispatch(setAlert(edit?'Profile Updated':'Profile Created'));


    // If editing, redirect to dashboard, since we are in action, we cant redirect like earlier, need to do it via history object like this :
    if(!edit){
        history.push('/dashboard');
    }

} catch (err) {

    const errors=err.response.data.errors; //Check below sample API response to understand this
    
    if(errors){
        errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
    }
    
    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:err.response.statusText,status:err.response.status}
    });

}

}


// createProfile/EditProfile API response in case of errors
// {
//     "errors": [
//         {
//             "msg": "Status is requried",
//             "param": "status",
//             "location": "body"
//         }
//     ]
// }