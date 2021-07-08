import React, {useState} from 'react'
import {Button, Input} from '@material-ui/core'
import {connect} from 'react-redux'
import {reset_password} from '../../actions/auth'
import {Redirect} from 'react-router-dom'

const ResetPassword = ({reset_password}) => {
    const [requestSent, setRequestSent] = useState(false)

    const [email, setEmail] = useState('')

    const onChange = e => setEmail(e.target.value)

    const onSubmit = e => {
        e.preventDefault()
        reset_password(email)
        setRequestSent(true)
    }

    if (requestSent) return <Redirect to="/"/>

    return (
        <div className="container mt-5 text-center">
            <h1 className="mb-5">Reset password</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <br/>
                    <Input name="email" type="email" className="text-light" id="exampleInputEmail1"
                           aria-describedby="emailHelp" onChange={e => onChange(e)} required value={email}/>
                </div>
                <Button type="submit" color="primary" variant="contained">Submit</Button>
            </form>
        </div>
    )
}

export default connect(null, {reset_password})(ResetPassword)