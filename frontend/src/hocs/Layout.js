import React, {useEffect} from 'react'
import Navbar from '../components/Navbar'
import {connect} from 'react-redux'
import {checkAuthenticated, load_user} from '../actions/auth'
import {getOrders} from '../actions/cart'


const Layout = (props) => {

    useEffect(() => {
        props.checkAuthenticated()
        props.load_user()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="container">
                {props.children}
            </div>
        </div>
    )
}

export default connect(null, {checkAuthenticated, load_user, getOrders})(Layout)