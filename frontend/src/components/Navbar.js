import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../actions/auth'
import {connect} from 'react-redux'


const Navbar = ({logout, isAuthenticated, cart}) => {

    const checkProducts = () => {
        if (cart != null && cart.products.length !== 0) {
            return cart.products.length
        } else {
            return 0
        }
    }

    const guestLinks = () => (
        <Fragment>
            <Link className="nav-link " to="/login">Login</Link>
            <Link className="nav-link" to="/signup">Sign Up</Link>
        </Fragment>
    )

    const authLinks = () => (
        <Fragment>
            <Link className="nav-link " to="/" onClick={logout}>Logout</Link>
            <Link className="nav-link" to="/cart">Cart ({checkProducts()})</Link>
        </Fragment>
    )
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center">
            <div>
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav">
                    {isAuthenticated ? authLinks() : guestLinks()}
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.isAuthenticated,
        cart: state.cart.cart
    }
)

export default connect(mapStateToProps, {logout})(Navbar)