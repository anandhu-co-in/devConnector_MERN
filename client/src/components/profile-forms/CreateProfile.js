import React,{Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {Link,withRouter} from 'react-router-dom' // Withourouter thing is to get the history object, which we will need to pass into the create profile action
import {createProfile} from '../../redux/actions/profile'
import {connect} from 'react-redux'
import Alert from '../layouts/Alert';



// createProfile action available here as i passed it through connect, history avaialable as i used withRouter in connect (check bottom of this page)

const CreateProfile = ({createProfile,history}) => {

    const [formData, setFormData] = useState({
        company:'',
        website:'',
        location:'',
        status:'',
        skills:'',
        githubusername:'',
        bio:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        youtube:'',
        instagram:''
    })


    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData


    const onChange = e =>setFormData({...formData, [e.target.name]:e.target.value})


    // below state to loggle visibility of social network fields. that html is displayed If value is true. Called from onclick of Add Social Net Links Button (See below html)
    const [displaySocialInputs, setDisplaySocialInputs] = useState(false)

    console.log(formData);


    //OnSubmit, called from the form onsubmit (see below), to do the profile creatin 
    const onSubmit=e=>{
      e.preventDefault();
      createProfile(formData,history); // I got confused initialy as how we are able to call createProfile action, which returns a dispatch function, But i missed that we are not calling it directly, here, noticed we passed it thourgh the connect to props!
    }


    return (
//         <Fragment>

//         <h1 className="large text-primary">
//             Create Your Profile
//         </h1>
//         <p className="lead">
//             <i className="fas fa-user"></i> Let's get some information to make your
//             profile stand out
//         </p>
//         <small>* = required field</small>

//         <form className="form" onSubmit={e => onSubmit(e)}>
//         <div className="form-group">
//           <select name="status" value={status} onChange={onChange}>
//             <option value="0">* Select Professional Status</option>
//             <option value="Developer">Developer</option>
//             <option value="Junior Developer">Junior Developer</option>
//             <option value="Senior Developer">Senior Developer</option>
//             <option value="Manager">Manager</option>
//             <option value="Student or Learning">Student or Learning</option>
//             <option value="Instructor">Instructor or Teacher</option>
//             <option value="Intern">Intern</option>
//             <option value="Other">Other</option>
//           </select>
//           <small className="form-text"
//             >Give us an idea of where you are at in your career</small
//           >
//         </div>
//         <div className="form-group">
//           <input type="text" placeholder="Company" name="company" value={company} onChange={onChange}/>
//           <small className="form-text"
//             >Could be your own company or one you work for</small
//           >
//         </div>
//         <div className="form-group">
//           <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
//           <small className="form-text"
//             >Could be your own or a company website</small
//           >
//         </div>
//         <div className="form-group">
//           <input type="text" placeholder="Location" name="location" value={location} onChange={onChange}/>
//           <small className="form-text">City & state suggested (eg. Boston, MA)</small
//           >
//         </div>
//         <div className="form-group">
//           <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} />
//           <small className="form-text"
//             >Please use comma separated values (eg.
//             HTML,CSS,JavaScript,PHP)</small
//           >
//         </div>
//         <div className="form-group">
//           <input
//             type="text"
//             placeholder="Github Username"
//             name="githubusername"
//             value={githubusername} onChange={onChange}
//           />
//           <small className="form-text"
//             >If you want your latest repos and a Github link, include your
//             username</small
//           >
//         </div>
//         <div className="form-group">
//           <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange}></textarea>
//           <small className="form-text">Tell us a little about yourself</small>
//         </div>

//         <div className="my-2">
//           <button type="button" className="btn btn-light" onClick={()=>setDisplaySocialInputs(!displaySocialInputs)}>
//             Add Social Network Links
//           </button>
//           <span>Optional</span>
//         </div>

//         {displaySocialInputs && <Fragment>

//                 <div className="form-group social-input">
//                 <i className="fab fa-twitter fa-2x"></i>
//                 <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange}/>
//                 </div>

//                 <div className="form-group social-input">
//                 <i className="fab fa-facebook fa-2x"></i>
//                 <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange}/>
//                 </div>

//                 <div className="form-group social-input">
//                 <i className="fab fa-youtube fa-2x"></i>
//                 <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange}/>
//                 </div>

//                 <div className="form-group social-input">
//                 <i className="fab fa-linkedin fa-2x"></i>
//                 <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onChange}/>
//                 </div>

//                 <div className="form-group social-input">
//                 <i className="fab fa-instagram fa-2x"></i>
//                 <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange}/>
//                 </div>

//             </Fragment>}


//         <input type="submit" className="btn btn-primary my-1" />
//         <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
//       </form>

// </Fragment>


<Fragment>

<Alert/>


<h1>Create profile!<br/></h1>
<h4>Let's get some information to make your profile stand out</h4>

 <form className="create-profile-form" onSubmit={e => onSubmit(e)}>
  <div className="input-group">
    <select name="status" value={status} onChange={onChange}>
      <option value={0}>* Select Professional Status</option>
      <option value="Developer">Developer</option>
      <option value="Junior Developer">Junior Developer</option>
      <option value="Senior Developer">Senior Developer</option>
      <option value="Manager">Manager</option>
      <option value="Student or Learning">Student or Learning</option>
      <option value="Instructor">Instructor or Teacher</option>
      <option value="Intern">Intern</option>
      <option value="Other">Other</option>
    </select>
  </div>
  <div className="input-group">
    <label>Company</label>
    <input type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
  </div>
  <div className="input-group">
    <label>Website</label>
    <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
  </div>
  <div className="input-group">
    <label>Location</label>
    <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
  </div>
  <div className="input-group">
    <label>Skills (Enter skills, comma separated) *</label>
    <input type="text" placeholder="* skills" name="skills" value={skills} onChange={onChange} />
  </div>
  <div className="input-group">
    <label>Github Username</label>
    <input type="text" placeholder="Github username" name="githubusername" value={githubusername} onChange={onChange} />
  </div>
  <div className="input-group">
    <label>Bio</label>
    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange} />
  </div>
  <button type="button" className="normalButtonButton" onClick={()=>setDisplaySocialInputs(!displaySocialInputs)}>Add Social Network Links (Optional)</button>
      {/* Learning: I had to add type=button for above button tag, whithout it it submits the form! */}
 
  {displaySocialInputs && <Fragment>
    
    <div className="input-group-social">
      <i className="fab fa-twitter fa-2x" />
      <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange}/>
    </div>
    <div className="input-group-social">
      <i className="fab fa-facebook fa-2x" />
      <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
    </div>
    <div className="input-group-social">
      <i className="fab fa-youtube fa-2x" />
      <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
    </div>
    <div className="input-group-social">
      <i className="fab fa-linkedin fa-2x" />
      <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onChange} />
    </div>
    <div className="input-group-social">
      <i className="fab fa-instagram fa-2x" />
      <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange}/>
    </div>

  </Fragment>}


  <button type="submit" className="primaryGreenButton">Submit</button>
  <Link to='/dashboard'><button className="normalButtonButton"><i className="fas fa-arrow-circle-left" /> Go Back</button></Link>
</form>


</Fragment>
    )
}  

CreateProfile.propTypes = {};

export default connect(null,{createProfile})(withRouter(CreateProfile)); 

{/* withrouter used above, since we need that history object, you can see in destructed from propp  */}


