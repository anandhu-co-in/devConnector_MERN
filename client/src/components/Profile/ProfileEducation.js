import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileEducation = ({education}) => {


    return (
    <Fragment>

      
    {education.map(ed=>          
          
          // <div>
          //   <h3>{ed.shool}</h3>
          //   <p>Show date in this foramt : Sep 1993 - June 1999</p>
          //   <p><strong>Degree: </strong>{ed.degree}</p>
          //   <p><strong>Field Of Study: </strong>{ed.fieldofstudy}</p>
          //   <p><strong>Description: </strong>{ed.description}</p>
          // </div>
        
          <Fragment>
              <h3>{ed.school}</h3>
              <p>Show date in this foramt : Sep 1993 - June 1999</p><br/>
              <p><strong>Degree: </strong>{ed.degree}</p>
              <p><strong>Field Of Study: </strong>{ed.fieldofstudy}</p>
              <p><strong>Description: </strong> {ed.description}</p>
              <br/>
          </Fragment>

          
          )}


    </Fragment>



    )
}


ProfileEducation.propTypes = {

}

export default ProfileEducation
