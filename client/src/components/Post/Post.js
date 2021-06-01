import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import {getPost} from '../../redux/actions/post'
import Postitem from '../posts/Postitem'
import { Link } from 'react-router-dom'

const Post = ({getPost,post:{post,loading},match}) => {


    useEffect(()=>{
        getPost(match.params.id) //Using the match variable to get the id which is present in the url
    },[])
    
    return (

        
        loading || post===null ?<Spinner/> : 
        <Fragment>
            <Link class="btn" to="/posts">Back to Posts</Link>
            <Postitem post={post} showActions={false}/>
        </Fragment>

    )
}

Post.propTypes = {

}

const mapStateToProps=state=>({
    post:state.post
})


export default connect(mapStateToProps,{getPost})(Post)
