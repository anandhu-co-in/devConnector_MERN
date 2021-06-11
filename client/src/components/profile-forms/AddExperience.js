import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {addExperience} from '../../redux/actions/profile'
import {connect} from 'react-redux'

const AddExperience = ({addExperience,history}) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const { title, company, location, from, to, current, description } = formData;

  //just created a state to store whether to disable or enable the to field based on 'current' value
  const [toDateDisabled, toggleToDisabled] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
      e.preventDefault();
      addExperience(formData,history)

  }

  return (
    // <Fragment>
    //   <section className="container">
    //     <h1 className="large text-primary">Add An Experience</h1>
    //     <p className="lead">
    //       <i className="fas fa-code-branch"></i> Add any developer/programming
    //       positions that you have had in the past
    //     </p>
    //     <small>* = required field</small>
    //     <form className="form" onSubmit={e=>onSubmit(e)}>
    //       <div className="form-group">
    //         <input
    //           type="text"
    //           placeholder="* Job Title"
    //           name="title"
    //           value={title}
    //           onChange={(e) => onChange(e)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <input
    //           type="text"
    //           placeholder="* Company"
    //           name="company"
    //           value={company} onChange={(e) => onChange(e)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => onChange(e)} />
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
    //           placeholder="Job Description"
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
  <h1>Add New Experience<br /></h1>
  <h4><i className="fas fa-code-branch" /> Add any developer/programming positions that you have had in the past</h4>
  <form className="create-profile-form" onSubmit={e=>onSubmit(e)}>
    <div className="input-group">
      <label>Job Title</label>
      <input type="text" name="title" value={title} onChange={(e) => onChange(e)} required />
    </div>
    <div className="input-group">
      <label>Company</label>
      <input type="text" name="company" value={company} onChange={(e) => onChange(e)} required/>
    </div>
    <div className="input-group">
      <label>Location</label>
      <input type="text" name="location" value={location} onChange={(e) => onChange(e)} required/>
    </div>
    <div className="input-group">
      <label>From Date</label>
      <input type="date" name="from" value={from} onChange={(e) => onChange(e)} required/>
    </div>


    <div className="input-group-checkbox">
      <input type="checkbox" name="current" value={current} checked={current} onChange={
                                e => {
                                    setFormData({...formData,current:!current,to:''})
                                    toggleToDisabled(!toDateDisabled)  
                                  }
                                
                                } />{' '}Current Job
    </div>


    <div className="input-group">
      <label>To Date</label>
      <input type="date"  name="to" value={to} onChange={(e) => onChange(e)} disabled={toDateDisabled?'disabled':''} />
    </div>
    <div className="input-group">
      <label>Bio</label>
      <textarea placeholder="Job Description" name="description"  value={description} onChange={(e) => onChange(e)} defaultValue={""} />
    </div>
    <button type="submit" className="primaryGreenButton">Submit</button>
    <Link to='/dashboard'><button type="button" className="normalButtonButton"><i className="fas fa-arrow-circle-left" /> Go Back</button></Link>
  </form>
</>














  );
};

AddExperience.propTypes = {};

export default connect(null,{addExperience})(withRouter(AddExperience));


//export default connect(mapStateToProps,{createProfile,getCurrnetProfile})(withRouter(EditProfile)); 