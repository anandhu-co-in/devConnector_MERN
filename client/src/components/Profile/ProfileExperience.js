import React from 'react'
import PropTypes from 'prop-types'

const ProfileExperience = ({experience}) => {
    return (
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>


        
          {experience.map(exp=>
            
            <div>
              <h3 className="text-dark">{exp.company}</h3>
              <p>"ADD DATE FORM exp variable here"</p>
              <p><strong>Position: </strong>{exp.location}</p>
              <p>
                <strong>Description: </strong>{exp.description}
              </p>
            </div>            
            )}
        </div>


    )
}

ProfileExperience.propTypes = {

}

export default ProfileExperience
