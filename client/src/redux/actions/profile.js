import axios from 'axios';
import {setAlert} from './alert';

import {GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE} from './types';

//Get current users profile

export const getCurrnetProfile=()=>async dispatch=>{

    try {
        
        const res = await axios.get('/api/profile/me');

        console.log("inside getCurrentProfileAction res.get results : ");
        console.log(res.data)

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

    console.log("edited-------------->1");
    dispatch(setAlert(edit?'Profile Updated':'Profile Created','success'));
    console.log("edited-------------->2");


    // If editing, redirect to dashboard, since we are in action, we cant redirect like earlier, need to do it via history object like this :
    if(!edit){
        console.log("navigating back to dashboard")
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



//Add experience
//Copied above create profile and modified
export const addExperience = (formData,history,edit=false) => async dispatch=>{

    try {
    
        const config = {
            'Content-Type':'application/json'
        }
        
        const res=await axios.put('api/profile/experience',formData,config);
    
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
    
        dispatch(setAlert('Experience Added','success'));
    
    
        // If editing, redirect to dashboard, since we are in action, we cant redirect like earlier, need to do it via history object like this :
        history.push('/dashboard');
    
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


    //Add education, this is smiliar to addExperiencce, only API url and the Alert msg modified

    export const addEducation = (formData,history,edit=false) => async dispatch=>{

        try {
        
            const config = {
                'Content-Type':'application/json'
            }
            
            const res=await axios.put('api/profile/education',formData,config);
        
            dispatch({
                type:UPDATE_PROFILE,
                payload:res.data
            });
        
            dispatch(setAlert('Education Added','success'));
        
        
            // If editing, redirect to dashboard, since we are in action, we cant redirect like earlier, need to do it via history object like this :
            history.push('/dashboard');
        
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