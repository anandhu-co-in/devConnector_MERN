import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'


import {deleteEducation} from '../../redux/actions/profile';

const Education = ({education,deleteEducation}) => {

    const experiences = education.map((edu)=>{

        return(
        <tr key={edu._id}>
            <td className="hide-sm">{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {' '}
                {edu.to === null ? (
                    'Now'
                ):(
                    <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                )}

            </td>

            <td>
                <button onClick={()=>deleteEducation(edu._id)} className="btn btn-danger">Delete</button>

            </td>

        </tr>

        );
    });


    return (
        <Fragment>

            <h2 className="m-2">Education Details</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th>Edit</th>
                    </tr>
                </thead>

{/*Calling the experience function which returns the experience HTMLS  which populates inside thead*/}

                <thead>{experiences}</thead> 


            </table>


            
        </Fragment>
    )
}

Education.propTypes = {

}

export default connect(null,{deleteEducation})(Education)
