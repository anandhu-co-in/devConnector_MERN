import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({profileitem}) => {
    return (
        // <div className="profile bg-light">
        //   <img
        //     className="round-img"
        //     src={profileitem.user.avatar}
        //     alt="No gravatar found"
        //   />
        //   <div>
        //     <h2>{profileitem.user.name}</h2>
        //     <p>{profileitem.status}</p>
        //     <p>{profileitem.location}</p>
        //     <Link to={`/profile/${profileitem.user._id}`} className="btn btn-primary">View Profile</Link>
        //   </div>

        //   <ul>

        //     {profileitem.skills.slice(0,4).map((skill,index)=>{return(
                
        //         // Here the key is used to prevent the console warning

        //         <li key={index} className="text-primary">
        //             <i className="fas fa-check"></i> {skill}
        //         </li>
        //         )

        //         })}


        //   </ul>
        // </div>



    <div class="developerDiv">
        <div class="profilepic">
          <img src={profileitem.user.avatar} alt=""/>
        </div>
        <div class="detail">
            <h2>{profileitem.user.name}</h2>
            <h4>{profileitem.status}</h4>
            <h4>{profileitem.location}</h4>
            <br />
            <Link to={`/profile/${profileitem.user._id}`}><button class="greenButton"><i class="fas fa-user-graduate"></i> View Profile</button></Link>
        </div>
        <div class="skills">

        {profileitem.skills.slice(0,4).map((skill,index)=>{return(
                
                // Here the key is used to prevent the console warning

                // <li key={index} className="text-primary">
                //     <i className="fas fa-check"></i> {skill}
                // </li>
                // )

                <div key={index} class="skill"><i class="fas fa-check"></i> {skill}</div>
                )

                })}

              {/* <div class="skill"><i class="fas fa-check"></i> Skill</div>
              <div class="skill"><i class="fas fa-check"></i> Skill</div>
              <div class="skill"><i class="fas fa-check"></i> Skill</div>
              <div class="skill"><i class="fas fa-check"></i> Skill</div> */}
        </div>
    </div>




    )
}

ProfileItem.propTypes = {

}

export default ProfileItem
