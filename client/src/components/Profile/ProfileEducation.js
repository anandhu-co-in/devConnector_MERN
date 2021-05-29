import React from 'react'
import PropTypes from 'prop-types'

const ProfileEducation = ({education}) => {


    return (
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>


          {education.map(ed=>          
          
          <div>
            <h3>{ed.shool}</h3>
            <p>Show date in this foramt : Sep 1993 - June 1999</p>
            <p><strong>Degree: </strong>{ed.degree}</p>
            <p><strong>Field Of Study: </strong>{ed.fieldofstudy}</p>
            <p><strong>Description: </strong>{ed.description}</p>
          </div>
          
          )}

        </div>
    )
}


ProfileEducation.propTypes = {

}

export default ProfileEducation
