import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {getCurrnetProfile,deleteAccount} from '../../redux/actions/profile';

import Spinner from '../layouts/Spinner'

import {Link} from 'react-router-dom'
import { DashboardActions } from './DashboardActions';

import Experience from './Experience';
import Education from './Educaction';
import Alert from '../layouts/Alert';


const Dashboard = ({getCurrnetProfile,deleteAccount,auth:{user},profile:{profile,loading}}) => {



    useEffect(()=>{
        getCurrnetProfile();
    },[])

 

    //If profile is still loading, dashboard should displayed the spinner gif. Other wise display the dashboard (Using ternary condition)

    //Investigate : - Whey did i add profile===null below??

    return  loading && profile===null ?<Spinner/>:<Fragment>

        <Alert/>

        <h1>Welcome {user && user.name}!<br/><br/></h1>

        {/* If profile exists, then dashboard actions dubb compoents is displayed */}
        {profile!==null?<Fragment> 
            <DashboardActions/> 
            <Experience experience={profile.experience}/> 
            <Education education={profile.education}/>  

            </Fragment> : <Fragment> 
            
            <h4>You do not have a profile yet!<br/><br/></h4>
            <Link to ='/create-profile'><button class="greenButton"><i class="fas fa-user-graduate"></i> Create Profile</button></Link>
                
        </Fragment> }
        <button class="redDeleteButton deleteAccountButton" onClick={()=>{console.log("Delete account cicked"); deleteAccount()}}><i class="far fa-trash-alt"></i> Delete Account </button>

    
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
