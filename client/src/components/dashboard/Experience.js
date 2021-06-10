import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'

import {deleteExperience} from '../../redux/actions/profile';


const Experience = ({experience,deleteExperience}) => {

    console.log("EXPERINCE COMPONENET")
    console.log(experience)

    const experiences = experience.map((exp)=>{

        return(
        // <tr key={exp._id}>
        //     <td className="hide-sm">{exp.company}</td>
        //     <td className="hide-sm">{exp.title}</td>
        //     <td>
        //         <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '}
        //         {exp.to === null ? (
        //             'Now'
        //         ):(
        //             <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
        //         )}

        //     </td>

        //     <td>
        //         <button onClick={()=>deleteExperience(exp._id)} className="btn btn-danger">Delete</button> 
        //         {/* I added the imported delete experience action in the onlick listener of delte button, so in a particlay row, that action will be called with that exp's id */}

        //     </td>

        // </tr>

        <tr>
            <td className="column1">{exp.company}</td>
            <td className="column2">{exp.title}</td>
            <td className="column3">
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '}
                {exp.to === null ? (
                    'Now'
                ):(
                    <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                )}
            </td>
            <td className="column4">
                <button onClick={()=>deleteExperience(exp._id)} className="redDeleteButton"><i className="far fa-trash-alt"></i> Delete</button>
            </td>
        </tr>


        );
    });


    return (
        <Fragment>

            {/* <h2 className="m-2">Experience Details</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th>Edit</th>
                    </tr>
                </thead> */}


    
        <h3>Experience Details</h3>
                    <table id="tablegeleral">
                        <thead>
                            <tr className="table100-head">
                                <th className="column1">Company</th>
                                <th className="column2">Title</th>
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

Experience.propTypes = {

}

export default connect(null,{deleteExperience})(Experience)
