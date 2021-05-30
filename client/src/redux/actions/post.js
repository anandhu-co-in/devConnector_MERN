import axios from 'axios';
import {setAlert} from  './alert'
import {GET_POSTS,POST_ERROR, UPDATE_LIKES} from './types';


//Get posts

export const getPosts = () => async dispatch =>{

    try {
        
        const res = await axios.get('/api/posts');

        dispatch({
            type:GET_POSTS,
            payload:res.data
        })

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}


//Like
export const likePost = postId => async dispatch =>{
    
    console.log("started likePost Action")

    try {
        
        console.log("Calling api-------------")
        const res = await axios.put(`/api/posts/like/${postId}`);
        console.log("Called api--------------");
        console.log(res.data)

        console.log("dispatching--------------");

        dispatch({
            type:UPDATE_LIKES,
            payload:{postId, likes:res.data}
        })

        console.log("tey end--------------");
    } catch (err) {

        console.log("Error while liking--------------");
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}


//Unlike- Same as like, just calling different api
export const unlikePost = postId => async dispatch =>{

    console.log("started unlike Action")

    try {
        
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        console.log(res.data)

        dispatch({
            type:UPDATE_LIKES,
            payload:{postId, likes:res.data}
        })

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}