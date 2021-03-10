import React from 'react';
import PropTypes from 'prop-types';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


// const PrivateRoute = ({component:Component,auth:{isAuthenticated,loading},...rest}) => {
//     return (

//         <Route {...rest} render={props=>!isAuthenticated && !loading?(<Redirect to ='/login'/>):(<Component {...props}/>)}/>

//     )
// }


const PrivateRoute = (props) => {
    if (!props.auth.isAuthenticated && !props.auth.loading) {
        return <Redirect to='/login' />;
    } else {
        return <Route exact path={props.path} component={props.component} />
    }
}

PrivateRoute.propTypes = {
    auth :PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps)(PrivateRoute);