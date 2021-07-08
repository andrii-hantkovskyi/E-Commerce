import React, {useState} from 'react'
import {connect} from 'react-redux'
import {signup} from '../../actions/auth'
import {Link, Redirect} from 'react-router-dom'
import {Button, Input} from '@material-ui/core'

const Signup = ({signup, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false)

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    })

    const {first_name, last_name, email, password, re_password} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password)
            setAccountCreated(true)
        } else alert('Passwords don\'t match')
    }

    if (isAuthenticated) return <Redirect to="/"/>
    if (accountCreated) return <Redirect to="/"/>

    return (
        <div className="container mt-5 text-center">
            <h1 className="mb-5">Create your account</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="InputFirstName" className="form-label">First name</label>
                    <br/>
                    <Input name="first_name" type="text" className="text-light" id="InputFirstName"
                           aria-describedby="emailHelp" onChange={e => onChange(e)} required value={first_name}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputLastName" className="form-label">Last name</label>
                    <br/>
                    <Input name="last_name" type="text" className="text-light" id="InputLastName"
                           aria-describedby="emailHelp" onChange={e => onChange(e)} required value={last_name}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email</label>
                    <br/>
                    <Input name="email" type="email" className="text-light" id="InputEmail"
                           aria-describedby="emailHelp" onChange={e => onChange(e)} required value={email}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword1" className="form-label">Password</label>
                    <br/>
                    <Input name="password" type="password" className="text-light" id="InputPassword1"
                           onChange={e => onChange(e)} required value={password}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword2" className="form-label">Retype password</label>
                    <br/>
                    <Input name="re_password" type="password" className="text-light" id="InputPassword2"
                           onChange={e => onChange(e)} required value={re_password}/>
                </div>
                <Button type="submit" color="primary" variant="contained">Submit</Button>
            </form>
            <p className="mt-3">Already have an account? <Link className="text-decoration-none" to="/login">Log
                in</Link></p>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {signup})(Signup)