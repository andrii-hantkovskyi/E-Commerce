import React, {useState} from 'react'
import {Button, Input} from '@material-ui/core'
import {connect} from 'react-redux'
import {login} from '../../actions/auth'
import {Link, Redirect} from 'react-router-dom'

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        login(email, password)
    }

    if (isAuthenticated)
        return <Redirect to="/"/>

    return (
        <div className="container mt-5 text-center">
            <h1 className="mb-5">Sign in</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <br/>
                    <Input name="email" type="email" className="text-light" id="exampleInputEmail1"
                           aria-describedby="emailHelp" onChange={e => onChange(e)} required value={email}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <br/>
                    <Input name="password" type="password" className="text-light" id="exampleInputPassword1"
                           onChange={e => onChange(e)} required value={password}/>
                </div>
                <Button type="submit" color="primary" variant="contained">Submit</Button>
            </form>
            <p className="mt-3">Don't have an account? <Link className="text-decoration-none" to="/signup">Sign
                up</Link></p>
            <p className="mt-3">Forgot password? <Link className="text-decoration-none" to="/reset-password">Reset
                password</Link></p>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login)