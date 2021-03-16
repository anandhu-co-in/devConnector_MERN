import React, { Fragment } from 'react'
import spinner from './spinner2.gif'

export default function Spinner() {
    return (

        <Fragment>

            <img 
                src={spinner} 
                alt="Loading..."
                style={{width:'200px',margin:'auto',display:'block'}}    
            />

        </Fragment>

    )
}
