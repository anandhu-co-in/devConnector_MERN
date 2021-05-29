import React, { Fragment, useEffect } from 'react';
import {connect} from 'react-redux';
import {getProfileByUserId} from '../../redux/actions/profile'
import Spinner from '../layouts/Spinner';
import {Link} from 'react-router-dom'
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGIthub from './ProfileGIthub';

const IndividualProfile = ({match, getProfileByUserId,profile:{profile,loading,repos},auth}) => {

    useEffect(()=>{
        getProfileByUserId(match.params.id)
    },[]) //I Missed to add the [] and got into an infinte loop

    return (
        <div>

            {profile==null||loading?<Spinner/>:<Fragment>

                <Link to='/profiles' className="btn btn-light">Back to Profiles</Link>

                {auth.isAuthenticated && auth.loading==false && auth.user._id===profile.user._id && <Link to="/edit-profile" className="btn btn-light">Edit</Link>}
                
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile}/>
                    <ProfileAbout profile={profile}/>
                    <ProfileExperience experience={profile.experience}/>
                    <ProfileEducation education={profile.education}/>
                    <ProfileGIthub githubusername={profile.githubusername}/>   
                {/* Hope i need to comeback here to fix if githubusernme is empty */}

                </div>

   
            </Fragment> 
            }

            
        </div>
    )
}

const mapSateToProps=state=>({
    profile : state.profile,
    auth:state.auth
})

export default connect(mapSateToProps,{getProfileByUserId})(IndividualProfile)
