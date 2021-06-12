import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../redux/actions/auth';

const Navbar = ({auth:{isAuthenticated,loading},logout}) => {

    //Links to display when loggedin
    const authLinks=(
        <div class="nav-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profiles">Developers</Link>
            <Link to="/posts">Posts</Link>
            <a onClick={logout} href='#!'><i class="fas fa-sign-out-alt"></i> Sign Out</a>
        </div>
    );

    //Links to display when not logged in
    const guestLinks=(
        <div class="nav-links">
            <Link to="/profiles">Developers</Link>
            <Link to="/register">Register</Link>
            <Link to='/login'><i class="fas fa-sign-in-alt"></i> Sign In</Link>
        </div>
    )

    return (
        <div>
            <nav class="main-nav">
                <a class="logo">        
                    <h2>
                        <i class="fas fa-laptop-code"></i>{' '}
                        devConnector
                    </h2>
                </a>
                {!loading && (<Fragment>{isAuthenticated?authLinks:guestLinks}</Fragment>)}
            </nav>
        </div>
    )
}


Navbar.propTypes={
    logout:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}


const mapStateToProps = state =>({
    auth:state.auth
})



export default connect(mapStateToProps,{logout})(Navbar);
