import React, {useState} from 'react'
import {Button, Input} from '@material-ui/core'
import {connect} from 'react-redux'
import {reset_password_confirm} from '../../actions/auth'
import {Redirect} from 'react-router-dom'

const ResetPasswordConfirm = ({reset_password_confirm, match}) => {
    const [requestSent, setRequestSent] = useState(false)

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    })

    const {new_password, re_new_password} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        reset_password_confirm(match.params.uid, match.params.token, new_password, re_new_password)
        setRequestSent(true)
    }

    if (requestSent) return <Redirect to='/'/>

    return (
        <div className="container mt-5 text-center">
            <h1 className="mb-5">Reset password confirm</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputNewPassword" className="form-label">New password</label>
                    <br/>
                    <Input name="new_password" type="password" className="text-light" id="exampleInputNewPassword"
                           aria-describedby="emailHelp" onChange={e => onChange(e)} required value={new_password}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputReNewPassword" className="form-label">Retype new password</label>
                    <br/>
                    <Input name="re_new_password" type="password" className="text-light" id="exampleInputReNewPassword"
                           aria-describedby="emailHelp" onChange={e => onChange(e)} required value={re_new_password}/>
                </div>
                <Button type="submit" color="primary" variant="contained">Submit</Button>
            </form>
        </div>
    )
}

export default connect(null, {reset_password_confirm})(ResetPasswordConfirm)