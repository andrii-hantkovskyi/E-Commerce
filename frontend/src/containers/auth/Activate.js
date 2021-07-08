import React, {useState} from 'react'
import {Button} from '@material-ui/core'
import {activate} from '../../actions/auth'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const Activate = ({match, activate}) => {

    const [activated, setActivated] = useState(false)

    const activate_account = () => {
        activate(match.params.uid, match.params.token)
        setActivated(true)
    }

    if (activated)
        return <Redirect to="/"/>

    return (
        <div className="container text-center">
            <div className="d-flex flex-column justify-content-center align-items-center" style={{marginTop: '200px'}}>
                <h1>Activate your account</h1>
                <Button type="button" variant="outlined" color="primary" onClick={activate_account}
                        style={{marginTop: '50px'}}>Activate</Button>
            </div>
        </div>
    )
}

export default connect(null, {activate})(Activate)