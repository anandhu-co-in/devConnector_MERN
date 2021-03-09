import {REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from '../actions/types';


const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated : null,
    loading : true,
    user :null
}


export default function(state=initialState,action){

    const {type,payload}=action;
    
    console.log("Auth reducer");
    console.log(payload)


    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);

            console.log(payload)
            console.log(payload.token)

            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        
        case LOGOUT:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR : //This syntax to execute same thing for both the types
            localStorage.removeItem('token')
            console.log('token removed from local storage')
   
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }


        case USER_LOADED:

            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }


        default :
            return state;

    }


}