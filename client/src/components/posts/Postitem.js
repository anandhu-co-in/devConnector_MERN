import React from 'react'
import PropTypes from 'prop-types'
import Moment,{moment} from 'react-moment'
import {connect} from 'react-redux'
import {likePost,unlikePost,deletePost} from '../../redux/actions/post'

const Postitem = ({post,auth,likePost,unlikePost,deletePost}) => {
    return (
        <div className="post bg-white p-1 my-1">
        <div>
            <a href="profile.html">
            <img
                className="round-img"
                src={post.avatar}
                alt="Avart not loaded"
            />
            <h4>{post.name}</h4>
            </a>
        </div>
        <div>
            <p className="my-1">
            {post.text}
            </p>
            <p className="post-date">
                Posted on {post.date}  
                {/* Need to show date properly */}
                {/* <Moment format="YYYY/MM/DD">post.date</Moment> */}
            </p>

            <button onClick={e=>likePost(post._id)} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-up"></i>
            <span>{" "+ post.likes.length}</span>
            </button>
            
            <button onClick={e=>unlikePost(post._id)} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-down"></i>
            </button>
            
            <a href="post.html" className="btn btn-primary">
            Discussion <span className='comment-count'>{" "+ post.comments.length}</span>
            </a>


            {/* Showing the delte button, only if this post is from the current logged in user, So he can delete the post */}
            {auth.isAuthenticated && auth.loading==false && auth.user._id===post.user && 
                <button      
                type="button"
                onClick={()=>deletePost(post._id)}
                className="btn btn-danger">
                <i className="fas fa-times"></i>
                </button>
            }




        </div>
    </div>
    )
}

Postitem.propTypes = {

}

const mapStateToProps=state=>({
    auth:state.auth,

})

export default connect(mapStateToProps,{likePost,unlikePost,deletePost})(Postitem);
