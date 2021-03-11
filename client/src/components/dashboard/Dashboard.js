import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {getCurrnetProfile} from '../../redux/actions/profile';


const Dashboard = ({getCurrnetProfile,auth,profile}) => {

    useEffect(()=>{
        getCurrnetProfile();
    },[])


    return (
        <div>
            Dashboard
        </div>
    )
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
