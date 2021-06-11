import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layouts/Spinner'
import {getPosts} from '../../redux/actions/post'
import Postitem from './Postitem'
import CreatePostForm from './CreatePostForm'

const Posts = ({post:{posts,loading},getPosts}) => {


    useEffect(()=>{
        getPosts();
    },[]) //Need to check why brad is passing getPosts here in the array instead of living it empty like me 



    return loading?<Spinner/>: (
        // <Fragment>

        //     <h1 className="large text-primary">
        //         Posts
        //     </h1>
        //     <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

        //         {/* Post form comes here */}
        //         <CreatePostForm/>

        //     <div className="posts">

        //     {posts.map((post,index)=>
        //         <Postitem post={post}/>
        //     )}
                

        //     </div>
            
        // </Fragment>

        <Fragment>

            <h1><i class="fas fa-pen-nib"></i> POSTS</h1> <br/> <br/>

                {/* Post form comes here */}
            <CreatePostForm/>


            {posts.map((post,index)=>
                <Postitem post={post}/>
            )}
                

            
        </Fragment>

    )
}

Posts.propTypes = {

}

const mapStateToProps=state=>({
    post:state.post
})

export default connect(mapStateToProps,{getPosts})(Posts)
