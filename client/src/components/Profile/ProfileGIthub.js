import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


import {getGitHubRepos} from '../../redux/actions/profile';

const ProfileGIthub = ({githubusername,getGitHubRepos,repos}) => {

    useEffect(()=>{
      getGitHubRepos(githubusername)
    },[])


    return (
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>


          {repos.map(repo=>
            

            <div className="repo bg-white p-1 my-1">
              <div>
                <h4><a href="#" target="_blank"
                    rel="noopener noreferrer">{repo.full_name}</a></h4>
                <p>
                  {repo.description}
                </p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">Size: {repo.size}</li>
                  <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                  <li className="badge badge-light">Forks: {repo.forks}</li>
                </ul>
              </div>
             </div>
            
          
            )}



{/* 
          <div className="repo bg-white p-1 my-1">
            <div>
              <h4><a href="#" target="_blank"
                  rel="noopener noreferrer">Repo Two</a></h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: 44</li>
                <li className="badge badge-dark">Watchers: 21</li>
                <li className="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div> */}



        </div>
    )
}

ProfileGIthub.propTypes = {

}

const mapStateToProps=state=>({
  
  repos:state.profile.repos

})


export default  connect(mapStateToProps,{getGitHubRepos})(ProfileGIthub)
