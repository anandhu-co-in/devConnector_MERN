import React, { Fragment, useEffect } from 'react';
import {connect} from 'react-redux';
import {getProfileByUserId} from '../../redux/actions/profile'
import Spinner from '../layouts/Spinner';
import {Link} from 'react-router-dom'

const IndividualProfile = ({match, getProfileByUserId,profile:{profile,loading},auth}) => {

    useEffect(()=>{
        getProfileByUserId(match.params.id)
    },[]) //I Missed to add the [] and got into an infinte loop

    return (
        <div>

            {profile==null||loading?<Spinner/>:<Fragment>

                <Link to='/profiles' className="btn btn-light">Back to Profiles</Link>

                {auth.isAuthenticated && auth.loading==false && auth.user._id===profile.user._id && <Link to="/edit-profile" className="btn btn-light">Edit</Link>}
                

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
