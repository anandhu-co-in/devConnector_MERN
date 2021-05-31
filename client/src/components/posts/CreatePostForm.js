import React ,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addPost} from '../../redux/actions/post'


const CreatePostForm = ({addPost}) => {

    const [formData, setFormData] = useState({
        text:''
    })

    
   
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    console.log(formData);
    e.preventDefault();
    addPost(formData)
    }


    return (
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={e=>onSubmit(e)}>
          <textarea
            onChange={e=>onChange(e)}
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

CreatePostForm.propTypes = {

}

export default connect(null,{addPost})(CreatePostForm)
