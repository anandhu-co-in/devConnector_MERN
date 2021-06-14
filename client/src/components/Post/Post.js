import React,{Fragment,useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import {getPost,addComment,deleteComment} from '../../redux/actions/post'
import Postitem from '../posts/Postitem'
import { Link } from 'react-router-dom'
import Alert from '../layouts/Alert'
import Moment from 'react-moment'

const Post = ({getPost,post:{post,loading},match,addComment,deleteComment,auth}) => {


    const [formData, setformData] = useState({
        text:''
    })

    useEffect(()=>{
        getPost(match.params.id) //Using the match variable to get the id which is present in the url
    },[])


    //keep on storing the current typed comment value into formData object
    const onChange = (e) => setformData({ ...formData, [e.target.name]: e.target.value });


    const onSubmit = e =>{
      console.log("Submite clicked")
      e.preventDefault();
      addComment(formData,post._id);
     }




    
    return (

        
        loading || post===null ?<Spinner/> : 
        <Fragment>

            <Alert/>

            {/* <Link className="btn" to="/posts">Back to Posts</Link> */}
            <Link to="/posts"><button className="normalButtonButton"><i className="fas fa-arrow-circle-left" /> Back to Posts</button></Link>
            <br/>
            <br/>
            <h1><i className="fas fa-pen-nib"></i> Discussion on Post</h1><br></br>
            <Postitem post={post} showActions={false}/>

            {/* Add comments, Better separate this into separate component as Brad did, but i just added it here to finish the course quickly */}

                {/* <div className="post-form">
                    <div className="bg-primary p">
                    <h3>Leave A Comment</h3>
                    </div>
                    <form className="form my-1" onSubmit={e=>onSubmit(e)}>
                    <textarea
                        onChange={e=>onChange(e)}
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Comment on this post"
                        required
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                    </form>
                </div> */}

                <br/>
                <div className="create-post">
                    <h2>Add Comment...</h2>
                    <form className="create-post-form" onSubmit={e=>onSubmit(e)}>
                        <textarea onChange={e=>onChange(e)} name="text" cols={30} rows={5} placeholder="Leave your comment" required defaultValue={""} />
                        <input type="submit" className="greenButton" defaultValue="Post" />
                    </form>
                </div>

                

            {/* Lopp through the comments within post and display */}

            {/* <div className="comments">

                {post.comments?.map((comment)=>
                
                    <div className="post bg-white p-1 my-1">
                        <div>
                            <a href="profile.html">
                            <img
                                className="round-img"
                                src={comment.avatar}
                                alt="Avatar not loaded"
                            />
                            <h4>{comment.name}</h4>
                            </a>
                        </div>
                        <div>
                            <p className="my-1">
                            {comment.text}
                            </p>
                            <p className="post-date">
                                {comment.date}
                            </p>

                            {!auth.loading && auth.user._id===comment.user &&(
                            <button type="button" className="btn btn-danger" onClick={e=>deleteComment(post._id,comment._id)}>
                                <i className="fas fa-times"></i>
                            </button>
                             )}

                        </div>

                    </div>
                )}

            </div> */}

            
            {post.comments?.map((comment)=>
            
            <div className="posts-preview">
                <div className="profilepic">
                    <img src={comment.avatar} alt=""/>
                    {comment.name}
                </div>
                <div className="posts-preview-right">
                    {comment.text}
                    <div> <Moment format='LL'>{comment.date}</Moment></div>
                    <div>

                    {!auth.loading && auth.user._id===comment.user &&(
                            // <button type="button" className="btn btn-danger" onClick={e=>deleteComment(post._id,comment._id)}>
                            //     <i className="fas fa-times"></i>
                            // </button>
                            <button onClick={e=>deleteComment(post._id,comment._id)} className="normalButtonButton"><i className="far fa-trash-alt"></i> Delete</button>
                             )}

                        {/* <button className="normalButtonButton"><i className="fas fa-thumbs-up"></i> 12</button>
                        <button className="normalButtonButton"><i className="fas fa-thumbs-down"></i> 0</button>
                        <button className="greenButton">Discussion (0)</button>
                        <button className="normalButtonButton"><i className="far fa-trash-alt"></i> Delete</button> */}
                    </div>
                </div>
            </div>

            )}


        </Fragment>

    )
}

Post.propTypes = {

}

const mapStateToProps=state=>({
    post:state.post,
    auth:state.auth
})


export default connect(mapStateToProps,{getPost,addComment,deleteComment})(Post)
