import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


import {getGitHubRepos} from '../../redux/actions/profile';

const ProfileGIthub = ({githubusername,getGitHubRepos,repos}) => {

    useEffect(()=>{
      getGitHubRepos(githubusername)
    },[])


    return (

          <Fragment>
              <br/><h2><i class="fab fa-github"></i> Github Repos</h2>

              {repos.map(repo=>
            

            // <div className="repo bg-white p-1 my-1">
            //   <div>
            //     <h4><a href="#" target="_blank"
            //         rel="noopener noreferrer">{repo.full_name}</a></h4>
            //     <p>
            //       {repo.description}
            //     </p>
            //   </div>
            //   <div>
            //     <ul>
            //       <li className="badge badge-primary">Size: {repo.size}</li>
            //       <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
            //       <li className="badge badge-light">Forks: {repo.forks}</li>
            //     </ul>
            //   </div>
            //  </div>

            <div class="repo">
                <div class="repo-left">
                    <h3>{repo.full_name}</h3><br/>
                    {repo.description}
                </div>
                <div class="repo-right">
                    <div>Starts: {repo.size}</div>
                    <div>Watchers: {repo.watchers_count}</div>
                    <div>Forks: {repo.forks}</div>
                </div>
            </div>
            
            )}

          </Fragment>

    )
}

ProfileGIthub.propTypes = {

}

const mapStateToProps=state=>({
  
  repos:state.profile.repos

})


export default  connect(mapStateToProps,{getGitHubRepos})(ProfileGIthub)
