import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {getProfiles} from '../../redux/actions/profile';
import ProfileItem from './ProfileItem';

import Spinner from '../layouts/Spinner'

const Profiles = ({profile:{profiles,loading},getProfiles}) => {


    //Call getProfiles, (only)the first time This components is rendered
    useEffect(()=>{
        console.log("Executing Profile.js Use Effect..");
        getProfiles();
        console.log("Executed Profile.js Use Effect..");
    },[])

    return ( 
        
        loading?<Spinner/>:

        <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect with developers
            </p>
            <div className="profiles">

                {profiles.length>0 ?
                
                profiles.map(item=><ProfileItem key={item._id} profileitem={item}/>)
                    
                :  <h1>No Profiles found</h1> }
                
            </div>
        </Fragment>
 
    )
}

Profiles.propTypes = {

}

const mapStateToProps=state=>({
    profile:state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles)
