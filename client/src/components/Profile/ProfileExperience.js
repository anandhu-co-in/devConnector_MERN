import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({experience}) => {
    return (
          <Fragment>

          
        
          {experience.map((exp,index)=>
            
            // <div>
            //   <h3 className="text-dark">{exp.company}</h3>
            //   <p>"ADD DATE FORM exp variable here"</p>
            //   <p><strong>Position: </strong>{exp.location}</p>
            //   <p>
            //     <strong>Description: </strong>{exp.description}
            //   </p>
            // </div>     
            
            <Fragment key={index}>
              <h3>{exp.company}</h3>
              <p><Moment format='LL'>{exp.from}</Moment> to {
                exp.to?<Moment format='LL'>{exp.to}</Moment>:'Now'
                }</p><br/>
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
