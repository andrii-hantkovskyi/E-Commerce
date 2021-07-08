import React, {useState} from 'react'
import {connect} from 'react-redux'
import {makeOrder} from '../../actions/cart'
import {Button} from '@material-ui/core'
import {Redirect} from 'react-router-dom'

const Order = ({makeOrder, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
        buying_type: 'Self',
        comment: ''
    })

    const {first_name, last_name, phone, address, buying_type, comment} = formData

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        makeOrder(first_name, last_name, phone, address, comment, buying_type)
        return <Redirect to='/'/>
    }

    if (!isAuthenticated) return <Redirect to='/'/>

    return (
        <form method="post" onSubmit={e => handleSubmit(e)}>
            <div className="mb-3">
                <label className="form-label">First name</label>
                <input onChange={e => handleChange(e)} name="first_name" value={first_name} type="text"
                       className="bg-transparent text-light form-control w-25"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Last name</label>
                <input onChange={e => handleChange(e)} name="last_name" value={last_name} type="text"
                       className="bg-transparent text-light form-control w-25"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Phone</label>
                <input onChange={e => handleChange(e)} name="phone" value={phone} type="tel"
                       className="bg-transparent text-light form-control w-25"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Address</label>
                <input onChange={e => handleChange(e)} name="address" value={address} type="text"
                       className="bg-transparent text-light form-control w-25"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Comment</label>
                <input onChange={e => handleChange(e)} name="comment" value={comment} type="text"
                       className="bg-transparent text-light form-control w-50"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Buying type</label>
                <select defaultValue='Self' name="buying_type" onChange={e => handleChange(e)} value={buying_type}
                        className=" bg-transparent text-light w-25 form-select">
                    <option className='bg-dark text-light' value={'Self'}>Self</option>
                    <option className='bg-dark text-light' value={'Delivery'}>Delivery</option>
                </select>
            </div>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {makeOrder})(Order)