import React, {Fragment}from 'react'
import PropTypes from 'prop-types'
import Moment,{moment} from 'react-moment'
import {connect} from 'react-redux'
import {likePost,unlikePost,deletePost} from '../../redux/actions/post'
import { Link } from 'react-router-dom'

const Postitem = ({post,auth,likePost,unlikePost,deletePost,showActions}) => {
    return (
        // <div className="post bg-white p-1 my-1">
        //     <div>
        //         <a href="profile.html">
        //         <img
        //             className="round-img"
        //             src={post.avatar}
        //             alt="Avart not loaded"
        //         />
        //         <h4>{post.name}</h4>
        //         </a>
        //     </div>
        //     <div>
        //         <p className="my-1">
        //         {post.text}
        //         </p>
        //         <p className="post-date">
        //             Posted on {post.date}  
        //             {/* Need to show date properly */}
        //             {/* <Moment format="YYYY/MM/DD">post.date</Moment> */}
        //         </p>


        //         {showActions && <Fragment>
                    
        //                 <button onClick={e=>likePost(post._id)} type="button" className="btn btn-light">
        //                 <i className="fas fa-thumbs-up"></i>
        //                 <span>{" "+ post.likes.length}</span>
        //                 </button>
                        
        //                 <button onClick={e=>unlikePost(post._id)} type="button" className="btn btn-light">
        //                 <i className="fas fa-thumbs-down"></i>
        //                 </button>
                        
        //                 <Link to={`posts/${post._id}`} className="btn btn-primary">
        //                 Discussion <span className='comment-count'>{" "+ post.comments.length}</span>
        //                 </Link>


        //                 {/* Showing the delte button, only if this post is from the current logged in user, So he can delete the post */}
        //                 {auth.isAuthenticated && auth.loading==false && auth.user._id===post.user && 
        //                     <button      
        //                     type="button"
        //                     onClick={()=>deletePost(post._id)}
        //                     className="btn btn-danger">
        //                     <i className="fas fa-times"></i>
        //                     </button>
        //                 }

        //             </Fragment>}
        //     </div>
        // </div>

    <div className="posts-preview">
        <div className="profilepic">
            <img src={post.avatar} alt="Gravatar not loaded" />
            {post.name}
        </div>
        <div className="posts-preview-right">
            {post.text}
            <p>
                Posted on <Moment format='LL'>{post.date}</Moment>
            </p>

            {showActions && <Fragment>
                <div>
                    <button  onClick={e=>likePost(post._id)} className="normalButtonButton"><i className="fas fa-thumbs-up" /> {" "+ post.likes.length}</button>
                    <button onClick={e=>unlikePost(post._id)} className="normalButtonButton"><i className="fas fa-thumbs-down" /> 0</button>
                    <Link to={`posts/${post._id}`}>
                        <button className="greenButton">Discussion {"("+ post.comments.length+")"}</button>
                    </Link>
                    {auth.isAuthenticated && auth.loading==false && auth.user._id===post.user &&
                       <button onClick={()=>deletePost(post._id)} className="normalButtonButton"><i className="far fa-trash-alt" />{" "}Delete</button>
                    } 
                </div>
                
                </Fragment>}



        </div>
    </div>



    )
}


Postitem.defaultProps={
    showActions : true
}

Postitem.propTypes = {

}

const mapStateToProps=state=>({
    auth:state.auth,

})

export default connect(mapStateToProps,{likePost,unlikePost,deletePost})(Postitem);
