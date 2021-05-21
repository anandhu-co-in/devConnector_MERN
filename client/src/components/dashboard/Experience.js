import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const Experience = ({experience}) => {

    console.log("EXPERINCE COMPONENET")
    console.log(experience)

    const experiences = experience.map((exp)=>{

        return(
        <tr key={exp._id}>
            <td className="hide-sm">{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '}
                {exp.to === null ? (
                    'Now'
                ):(
                    <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                )}

            </td>

            <td>
                <button className="btn btn-danger">Delete</button>

            </td>

        </tr>

        );
    });


    return (
        <Fragment>

            <h2 className="m-2">Experience Details</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
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

Experience.propTypes = {

}

export default Experience
