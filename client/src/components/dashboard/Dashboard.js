import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {getCurrnetProfile,deleteAccount} from '../../redux/actions/profile';

import Spinner from '../layouts/Spinner'

import {Link} from 'react-router-dom'
import { DashboardActions } from './DashboardActions';

import Experience from './Experience';
import Education from './Educaction';


const Dashboard = ({getCurrnetProfile,deleteAccount,auth:{user},profile:{profile,loading}}) => {



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

        {/* If profile exists, then dashboard actions dubb compoents is displayed */}
        {profile!==null?<Fragment> 
            <DashboardActions/> 
            <Experience experience={profile.experience}/> 
            <Education education={profile.education}/>  

            <div className="my-2">
                <button onClick={()=>{console.log("Delete account cicked"); deleteAccount()}} className="btn btn-danger">
                    <i className="fa fa-user"></i> Delete My Account
                </button>
            </div>

            </Fragment> : <Fragment> 
            
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

export default connect(mapStateToProps,{getCurrnetProfile,deleteAccount})(Dashboard);
