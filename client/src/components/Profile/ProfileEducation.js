import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({education}) => {


    return (
    <Fragment>

      
    {education.map((ed,index)=>          
          
          // <div>
          //   <h3>{ed.shool}</h3>
          //   <p>Show date in this foramt : Sep 1993 - June 1999</p>
          //   <p><strong>Degree: </strong>{ed.degree}</p>
          //   <p><strong>Field Of Study: </strong>{ed.fieldofstudy}</p>
          //   <p><strong>Description: </strong>{ed.description}</p>
          // </div>
        
          <Fragment  key={index}>
              <h3>{ed.school}</h3>
              <p><Moment format='LL'>{ed.from}</Moment> to {
                ed.to?<Moment format='LL'>{ed.to}</Moment>:'Now'
                }</p>
              
              <br/>
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
