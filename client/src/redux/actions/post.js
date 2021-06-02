import axios from 'axios';
import {setAlert} from  './alert'
import {GET_POSTS,POST_ERROR, UPDATE_LIKES,DELETE_POST,ADD_POST, GET_POST,ADD_COMMENT,REMOVE_COMMENT} from './types';


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


//Delete post
export const deletePost = postId => async dispatch =>{

    console.log("started deletePost action")

    try {
        
        const res = await axios.delete(`/api/posts/${postId}`);

        console.log(res.data)

        dispatch({
            type:DELETE_POST,
            payload:postId
        })

        dispatch(setAlert('Post deleted','success'))

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}


//Add post
export const addPost = (formData) => async dispatch =>{

    console.log("Started addPost Action")

    try {
        

        const config = {
            'Content-Type':'application/json'
        }

        const res = await axios.post('/api/posts',formData,config);

        console.log(res)

        dispatch({
            type:ADD_POST,
            payload:res.data
        })

        dispatch(setAlert('Posted succesfully','success'))

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}




//Get Single Post

export const getPost = (postId) => async dispatch =>{

    try {
        
        console.log("Gettin post using... "+`/api/posts/${postId}`)
        const res = await axios.get(`/api/posts/${postId}`);
        console.log("Got post");

        console.log("getPostResponse------>"+res.data)
        console.log(res.data)
        dispatch({
            type:GET_POST,
            payload:res.data
        })

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}



//Add comment

export const addComment = (formData,postId) => async dispatch =>{

    try {

        const config = {
            'Content-Type':'application/json'
        }


        const res = await axios.put(`/api/posts/comment/${postId}`,formData,config);
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        })

        dispatch(setAlert('Comment Added','success'))

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}



//Delete comment

export const deleteComment = (postId,commentId) => async dispatch =>{

    try {

        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type:REMOVE_COMMENT,
            payload:res.data
        })

        dispatch(setAlert('Comment Deleted','success'))

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
