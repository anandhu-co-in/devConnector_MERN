import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {getCurrnetProfile} from '../../redux/actions/profile';

import Spinner from '../layouts/Spinner'

import {Link} from 'react-router-dom'


const Dashboard = ({getCurrnetProfile,auth:{user},profile:{profile,loading}}) => {

    useEffect(()=>{
        getCurrnetProfile();
    },[])


    //If profile is still loading, dashboard should displayed the spinner gif. Other wise display the dashboard (Using ternary condition)

    //Investigate : - Whey did i add profile===null below??

    return  loading && profile===null ?<Spinner/>:<Fragment>

        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>

        {profile!==null?<Fragment>Has Profile</Fragment> : <Fragment> 
            
            <p>You haven't yet setup your profile.</p> <br/>
            <Link to ='/create-profile' className="btn btn-primary">Create Profile</Link>
            
        </Fragment> }

    
    </Fragment>

    // return (
    //     <div>
    //         Dashboard
    //     </div>
    // )
}

Dashboard.propTypes = {
    getCurrnetProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth,
    profile:state.profile
});

export default connect(mapStateToProps,{getCurrnetProfile})(Dashboard);
