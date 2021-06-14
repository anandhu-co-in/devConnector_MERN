import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'


import {deleteEducation} from '../../redux/actions/profile';

const Education = ({education,deleteEducation}) => {

    const experiences = education.map((edu,key)=>{

        return(
        // <tr key={edu._id}>
        //     <td className="hide-sm">{edu.school}</td>
        //     <td className="hide-sm">{edu.degree}</td>
        //     <td>
        //         <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {' '}
        //         {edu.to === null ? (
        //             'Now'
        //         ):(
        //             <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        //         )}

        //     </td>

        //     <td>
        //         <button onClick={()=>deleteEducation(edu._id)} className="btn btn-danger">Delete</button>

        //     </td>

        // </tr>

        <tr key={key}>
            <td className="column1">{edu.school}</td>
            <td className="column2">{edu.degree}</td>
            <td className="column3">
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {' '}
                    {edu.to === null ? (
                        'Now'
                    ):(
                        <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                    )}
            </td>
            <td className="column4">
                <button onClick={()=>deleteEducation(edu._id)} className="redDeleteButton"><i className="far fa-trash-alt"></i> Delete</button>
            </td>
        </tr>

        );
    });


    return (
        <Fragment>

                
        <h3>Education Details</h3>
                    <table id="tablegeleral">
                        <thead>
                            <tr className="table100-head">
                                <th className="column1">School</th>
                                <th className="column2">Degree</th>
                                <th className="column3">Years</th>
                                <th className="column4">Options</th>
                            </tr>
                        </thead>

{/*Calling the experience function which returns the experience HTMLS  which populates inside thead*/}

                <tbody>{experiences}</tbody> 


            </table>


            
        </Fragment>
    )
}

Education.propTypes = {

}

export default connect(null,{deleteEducation})(Education)
