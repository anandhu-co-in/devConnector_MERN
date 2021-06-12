import axios from 'axios';
import {setAlert} from './alert';

import {CLEAR_PROFILE, GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE,ACCOUNT_DELETED,GET_PROFILES,GET_REPOS} from './types';

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



//Get All the Profiles from db and store it in profiles array of the state

export const getProfiles=()=>async dispatch=>{

    console.log("getProfilesActionStarted")
    //First clear the current profile
    dispatch({type:CLEAR_PROFILE})

    //Get all the user profiles and add to the state
    try {    
        const res = await axios.get('/api/profile');
        console.log(res.data)

        dispatch({
            type:GET_PROFILES,
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

//Get a particular profile using the userID, and store it to profile of the state


export const getProfileByUserId=(userId)=>async dispatch=>{

    //First clear the current profile
    dispatch({type:CLEAR_PROFILE})

    //Get all the user profiles and add to the state
    try {    
        const res = await axios.get(`/api/profile/user/${userId}`);
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


//Get all githubRepos of ther user and store it to repos array of state

export const getGitHubRepos=(username)=>async dispatch=>{


    //Get all the user profiles and add to the state
    try {    
        console.log('calling gihub api')
        const res = await axios.get(`/api/profile/github/${username}`);
        console.log('called gihub api from frontend')
        dispatch({
            type:GET_REPOS,
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



        //This action will delete the experience using id

        export const deleteExperience = id => async dispatch =>{
            
            try {
                
                const res= await axios.delete(`api/profile/experience/${id}`) //Template literal? need to understand this

                dispatch({
                    type : UPDATE_PROFILE,
                    payload : res.data
                });

                dispatch(setAlert('Experience Removed','success'))

            } catch (err) {

                dispatch({
                    type:PROFILE_ERROR,
                    payload:{msg:err.response.statusText,status:err.response.status}
                });
                
            }
        }



        //Delete Eduction , smiliary to above one

        export const deleteEducation = id => async dispatch =>{
            
            try {
                
                const res= await axios.delete(`api/profile/education/${id}`) //Template literal? need to understand this

                dispatch({
                    type : UPDATE_PROFILE,
                    payload : res.data
                });

                dispatch(setAlert('Education Removed','success'))

            } catch (err) {

                dispatch({
                    type:PROFILE_ERROR,
                    payload:{msg:err.response.statusText,status:err.response.status}
                });
                
            }
        }


        //Delete current account

        export const deleteAccount = () => async dispatch =>{

            console.log("Delete Account Called");

            if(window.confirm("Are you sure to delete your account ?")){

                try {
                
                    const res= await axios.delete(`api/profile`) 
    
                    dispatch({type : CLEAR_PROFILE});
                    dispatch({type : ACCOUNT_DELETED});
    
                    dispatch(setAlert('Account Deleted','Success'))
    
                } catch (err) {
    
                    dispatch({
                        type:PROFILE_ERROR,
                        payload:{msg:err.response.statusText,status:err.response.status}
                    });
                    
                }


            }else{
                console.log("You denied the popup to delete your account");
            }

            

        }

