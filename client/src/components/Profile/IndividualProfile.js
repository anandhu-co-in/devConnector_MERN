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

                <Link to='/profiles'><button className="normalButtonButton"><i className="fas fa-arrow-circle-left"></i> Back to Profiles</button></Link>

                {auth.isAuthenticated && auth.loading==false && auth.user._id===profile.user._id && <Link to="/edit-profile">
                      <button className="normalButtonButton"><i className="fas fa-edit"></i> Edit Profile</button>
                    </Link>}
                
                <ProfileTop profile={profile}/>
                <ProfileAbout profile={profile}/>



                <br /><h2><i className="fas fa-graduation-cap" /> Experience and Education</h2>

                <div className="expEdu">
                    <div className="experience">
                        <h2>Experience</h2><br />
                        <ProfileExperience experience={profile.experience}/>
                    </div>
                    <div className="education">
                        <h2>Education</h2><br/>
                        <ProfileEducation education={profile.education}/>
                    </div>
                </div>


                <ProfileGIthub githubusername={profile.githubusername}/>   
                {/* Hope i need to comeback here to fix if githubusernme is empty */}

   
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
