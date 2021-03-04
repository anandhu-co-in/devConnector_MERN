import axios from 'axios';


// This function attaches the token to the axios header as "x-auth-token" if the token is passed to the function (it exists), 
// so we do not need to include it manually every time we are doing http request with axios to our api server. 
// If we invoke the function without passing the token or it does not exist the function simply deletes the token from the axios header.


const setAuthToken = token =>{
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}


export default setAuthToken;