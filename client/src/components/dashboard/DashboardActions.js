import React from "react";
import { Link } from "react-router-dom";

export const DashboardActions = () => {
  return (
    // <div>
    //   <div className="dash-buttons">
    //     <Link to="/edit-profile" className="btn btn-light">
    //       <i className="fas fa-user-circle text-primary"></i> Edit Profile
    //     </Link>
    //     <Link to="/add-experience" className="btn btn-light">
    //       <i className="fab fa-black-tie text-primary"></i> Add Experience
    //     </Link>
    //     <Link to="/add-education" className="btn btn-light">
    //       <i className="fas fa-graduation-cap text-primary"></i> Add Education
    //     </Link>
    //   </div>
    // </div>

  <div className="dashboardActions">
    <Link to="/edit-profile"><button className="greenButton"><i className="far fa-address-card"></i> Edit Profile</button></Link>
    <Link to="/add-experience"><button className="greenButton"><i className="fas fa-briefcase"></i> Add Experience</button></Link>
    <Link to="/add-education"><button className="greenButton"><i className="fas fa-user-graduate"></i> Add Education</button></Link>
  </div>

  );
};


// This is just a dumb component