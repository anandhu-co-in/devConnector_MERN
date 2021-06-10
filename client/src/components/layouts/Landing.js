import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  //Landing page should not be accessible if logged in already
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (

    <section className="landing">
      <div className="banner">
        <h1>devConnector</h1>
        <h3>Clone of Brad Traversy's devConnector</h3>
      </div>

      <div className="landing-button">
        <Link to="/register"><button className="normalButtonButton leftbtn">Sign Up</button></Link>
        <Link to="/login"><button className="primaryGreenButton rightbtn">Login</button></Link>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
