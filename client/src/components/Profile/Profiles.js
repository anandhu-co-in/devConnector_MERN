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
            <h1>Developers!<br/></h1>
            <h4>Browse and connect with developers!<br/><br/></h4>

                {profiles.length>0 ?
                
                profiles.map(item=><ProfileItem key={item._id} profileitem={item}/>)
                    
                :  <h1>No Profiles found</h1> }
                

        </Fragment>
 
    )
}

Profiles.propTypes = {

}

const mapStateToProps=state=>({
    profile:state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles)
