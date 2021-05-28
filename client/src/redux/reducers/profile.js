import {GET_PROFILE,PROFILE_ERROR,CLEAR_PROFILE, LOGOUT,UPDATE_PROFILE,GET_PROFILES,GET_REPOS} from '../actions/types';

const initialState={
    profile:null,
    profiles:[],
    repos:[],
    loading:true,
    error:{}
};



export default function(state=initialState,action){

    const {type,payload}=action;

    switch(type){

        case GET_PROFILE:
        case UPDATE_PROFILE:
            console.log("GET_PROFILE REDUCER CASE")
            console.log({...state,profile:payload})
            return{...state,profile:payload,loading:false}

        case GET_PROFILES:
            return {...state,profiles:payload,loading:false}
        
        case GET_REPOS:
            return {...state,repos:payload,loading:false}

        case PROFILE_ERROR:
            return{...state,error:payload,loading:false}

        case CLEAR_PROFILE:
            console.log("ClreaedProfile")
             return{...state,profile:null,repos:[],loading:false}    

        default:
            return state;
    }



}