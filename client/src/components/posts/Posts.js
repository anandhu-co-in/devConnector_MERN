import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layouts/Spinner'
import {getPosts} from '../../redux/actions/post'

const Posts = ({post:{posts,loading},getPosts}) => {


    useEffect(()=>{
        getPosts();
    },[]) //Need to check why brad is passing getPosts here in the array instead of living it empty like me 



    return (
        <div>
            Posta page.. chheck the psots are loaded inreducx

        </div>
    )
}

Posts.propTypes = {

}

const mapStateToProps=state=>({
    post:state.post
})

export default connect(mapStateToProps,{getPosts})(Posts)
