import React from 'react'
import PropTypes from 'prop-types'

const ProfileItem = ({profileitem}) => {
    return (
        <div className="profile bg-light">
          <img
            className="round-img"
            src={profileitem.user.avatar}
            alt="No gravatar found"
          />
          <div>
            <h2>{profileitem.user.name}</h2>
            <p>{profileitem.status}</p>
            <p>{profileitem.location}</p>
            <a href="profile.html" className="btn btn-primary">View Profile</a>
          </div>

          <ul>

            {profileitem.skills.slice(0,4).map((skill,index)=>{return(
                
                // Here the key is used to prevent the console warning

                <li key={index} className="text-primary">
                    <i className="fas fa-check"></i> {skill}
                </li>
                )

                })}


          </ul>
        </div>
    )
}

ProfileItem.propTypes = {

}

export default ProfileItem
