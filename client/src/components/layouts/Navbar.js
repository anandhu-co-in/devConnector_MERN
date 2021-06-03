import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../redux/actions/auth';

const Navbar = ({auth:{isAuthenticated,loading},logout}) => {

    //Links to display when loggedin
    const authLinks=(
        <ul>

            <li><Link to ='/profiles'>Developers</Link></li>
            <li><Link to ='/posts'>Posts</Link></li>

            <li>
                <Link to ='/dashboard'>
                    <i className='fas fa-user'></i>{' '}
                    Dashboard
                </Link>
            </li>

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
            <li><Link to ='/profiles'>Developers</Link></li>
            <li><Link to ='/register'>Register</Link></li>
            <li><Link to ='/login'>Login</Link></li>
        </ul>
    )


    return (
        <div>

            <nav className="navbar bg-dark">
            <h1>
                <Link to ='/'><i className="fas fa-code"></i> DevConnector ----- W o R  k in pRogResS  ---   </Link>
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
