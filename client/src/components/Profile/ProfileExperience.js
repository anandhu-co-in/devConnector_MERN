import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileExperience = ({experience}) => {
    return (
          <Fragment>

          
        
          {experience.map(exp=>
            
            // <div>
            //   <h3 className="text-dark">{exp.company}</h3>
            //   <p>"ADD DATE FORM exp variable here"</p>
            //   <p><strong>Position: </strong>{exp.location}</p>
            //   <p>
            //     <strong>Description: </strong>{exp.description}
            //   </p>
            // </div>     
            
            <Fragment>
              <h3>{exp.company}</h3>
              <p>Date in formatOct 2011 - Current</p><br/>
              <p><strong>Location: </strong>{exp.location}</p>
              <p><strong>Position: </strong>{exp.title}</p>
              <p><strong>Description: </strong>{exp.description}</p>
              <br/>
              
            </Fragment>

            )}

          </Fragment>  

    )
}

ProfileExperience.propTypes = {

}

export default ProfileExperience
