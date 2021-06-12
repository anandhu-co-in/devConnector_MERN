import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Alert = props => {
    return (

        props.alerts!=null &&
        props.alerts.length>0 &&
        props.alerts.map(alert=>(
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>
        ))
             
    )
}

Alert.propTypes = {
    alerts:PropTypes.array.isRequired
}

const mapStateToProps = state =>{
    return {alerts:state.alert}
}
//https://stackoverflow.com/questions/45573277/react-expected-an-assignment-or-function-call-and-instead-saw-an-expression

export default connect(mapStateToProps)(Alert) //This component doesnt call any action, we obtain the valuse from store.


{/* <div className="alerts">
    <div className="alert alert-danger">Error Occured</div>
    <div className="alert alert-success">Error Occured</div>
    <div className="alert alert-success">Error Occured</div>
</div> */}