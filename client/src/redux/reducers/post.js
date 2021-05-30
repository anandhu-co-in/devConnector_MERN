import { post } from 'request';
import {GET_POSTS,POST_ERROR,UPDATE_LIKES} from '../actions/types';


const initialState={
    posts:[],
    post:null,
    loading:true,
    error:{}
}


export default function(state=initialState,action){

    const {type,payload}=action;

    switch(type){

        case GET_POSTS:
            return {
                ...state,
                posts:payload,
                loading:false
            };

        case POST_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            };

        case UPDATE_LIKES:

            console.log("Updating likes..................")
            return{
                ...state,
                posts:state.posts.map(post=> post._id === payload.postId ? {...post, likes:payload.likes}:post)

                // goes through all post objects in posts array, if the id of current new likes array matches, with any of the post, then just replace the current likes array with new one!
            };
        
        default :
            return state;

    }


}