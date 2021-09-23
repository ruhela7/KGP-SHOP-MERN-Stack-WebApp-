import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        //NOTE: role and span are used for accessibility purpose.
        <Spinner animation="border" role="status" style={{ width: '100px', height: '100px', margin: 'auto', display: 'block' }}>
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}

export default Loader
