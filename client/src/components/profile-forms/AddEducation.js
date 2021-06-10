import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {addEducation} from '../../redux/actions/profile'
import {connect} from 'react-redux'

const AddEducation = ({addEducation,history}) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  //just created a state to store whether to disable or enable the to field based on 'current' value
  const [toDateDisabled, toggleToDisabled] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
      e.preventDefault();
      addEducation(formData,history)

  }

  return (
    // <Fragment>
    //   <section className="container">
    //     <h1 className="large text-primary">Add Education Details</h1>
    //     <p className="lead">
    //       <i className="fas fa-code-branch"></i> Add any shool/college you have attended
    //     </p>
    //     <small>* = required field</small>
    //     <form className="form" >
    //       <div className="form-group">
    //         <input
    //           type="text"
    //           placeholder="* School/College"
    //           name="school"
    //           value={school}
    //           onChange={(e) => onChange(e)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <input
    //           type="text"
    //           placeholder="* Degree"
    //           name="degree"
    //           value={degree} onChange={(e) => onChange(e)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <input type="text" placeholder="Location" name="fieldofstudy" value={fieldofstudy} onChange={(e) => onChange(e)} />
    //       </div>
    //       <div className="form-group">
    //         <h4>From Date</h4>
    //         <input type="date" name="from" value={from} onChange={(e) => onChange(e)}/>
    //       </div>
    //       <div className="form-group">
    //         <p>
    //           <input type="checkbox" name="current" value={current} checked={current} onChange={
                  
    //               e => {
    //                   setFormData({...formData,current:!current,to:''})
    //                   toggleToDisabled(!toDateDisabled)  
    //                 }
                  
    //               } />{' '}Current Job
    //         </p>
    //       </div>
    //       <div className="form-group">
    //         <h4>To Date</h4>
    //         <input type="date" name="to" value={to} onChange={(e) => onChange(e)} disabled={toDateDisabled?'disabled':''}/>
    //       </div>
    //       <div className="form-group">
    //         <textarea
    //           name="description"
    //           cols="30"
    //           rows="5"
    //           placeholder="Course Description"
    //           value={description} onChange={(e) => onChange(e)}
    //         ></textarea>
    //       </div>
    //       <input type="submit" className="btn btn-primary my-1" />
    //       <Link className="btn btn-light my-1" to="/dashboard">
    //         Go Back
    //       </Link>
    //     </form>
    //   </section>
    // </Fragment>

<>
  <h1>Add Your Education<br /></h1>
  <h4><i className="fas fa-graduation-cap" /> Add any school, bootcamp, etc that you have attended</h4>
  <form className="create-profile-form"onSubmit={e=>onSubmit(e)}>

    <div className="input-group">
      <label>School or Bootcamp</label>
      <input type="text"  name="school" value={school} onChange={(e) => onChange(e)} required />
    </div>

    <div className="input-group">
      <label>Degree or Certificate</label>
      <input type="text"  name="degree" value={degree} onChange={(e) => onChange(e)} required />
    </div>

    <div className="input-group">
      <label>Field of Study</label>
      <input type="text"  name="fieldofstudy" value={fieldofstudy} onChange={(e) => onChange(e)} required />
    </div>

    <div className="input-group">
      <label>From Date</label>
      <input type="date"  name="from" value={from} onChange={(e) => onChange(e)} required />
    </div>

    <div className="input-group-checkbox">
      <input type="checkbox" name="current" value={current} checked={current} onChange={
                  
                                e => {
                                    setFormData({...formData,current:!current,to:''})
                                    toggleToDisabled(!toDateDisabled)  
                                  }
                                
                                } />{' '}Current School or Bootcamp 
    </div>

    <div className="input-group">
      <label>To Date</label>
      <input type="date" placeholder="* School/College" name="to" value={to} onChange={(e) => onChange(e)} disabled={toDateDisabled?'disabled':''} required />
    </div>
    <div className="input-group">
      <label>Bio</label>
      <textarea placeholder="* School/College" name="description" value={description} onChange={(e) => onChange(e)} required />
    </div>
    <button type="submit" className="primaryGreenButton">Submit</button>
    <Link to='/dashboard'><button type="button" className="normalButtonButton"><i className="fas fa-arrow-circle-left" /> Go Back</button></Link>
    
  </form>
</>















  );
};

AddEducation.propTypes = {};

export default connect(null,{addEducation})(withRouter(AddEducation));


// This page was pretty same as Add Eperience, only changed the few fields for API, and form labels, and instead of addExperience action, we call addEducatin Action