import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../redux/actions/auth';

const Navbar = ({auth:{isAuthenticated,loading},logout}) => {

    //Links to display when loggedin
    const authLinks=(
        <ul>
            <li>
                <a onClick={logout} href='#!'>
                    <i className='fas fa-sign-out-alt'></i>{' '}
                    Logout
                </a>
            </li>
        </ul>
    );

    //Links to display when not logged in
    const guestLinks=(
        <ul>
            <li><Link to ='#!'>Developers</Link></li>
            <li><Link to ='/register'>Register</Link></li>
            <li><Link to ='/login'>Login</Link></li>
        </ul>
    )


    return (
        <div>

            <nav className="navbar bg-dark">
            <h1>
                <a href="index.html"><i className="fas fa-code"></i> DevConnector</a>
            </h1>
            
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
