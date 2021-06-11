import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile}) => {
    return (
        // <div className="profile-about bg-light p-2">
        //   <h2 className="text-primary">John's Bio</h2>
        //   <p>
        //     {profile.bio}
        //   </p>
        //   <div className="line"></div>
        //   <h2 className="text-primary">Skill Set</h2>
        //   <div className="skills">

        //     {/* Maping each element of skill array, into hmtl (ie, the tick mark + the skill name) */}
        //     {profile.skills.map(skill=><div className="p-1"><i className="fa fa-check"></i> {skill}</div>)}

        //   </div>
        // </div>

        <div class="bioSkillset">
        <h2>{profile.user.name.split(' ')[0]}'s Bio</h2>
        {profile.bio}
        <h2>Skill Set</h2>

        <div class="skillset">
            {profile.skills.map(skill=>
              <div class="skill"><i class="fas fa-check"></i> {skill}</div>
              )} 

        </div>

    </div>


    )
}

ProfileAbout.propTypes = {

}

export default ProfileAbout



