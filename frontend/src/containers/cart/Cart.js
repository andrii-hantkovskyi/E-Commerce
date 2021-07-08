import React from 'react'
import {connect} from 'react-redux'
import CartProduct from './CartProduct'
import {Button} from '@material-ui/core'
import {Link, Redirect} from 'react-router-dom'


const Cart = ({cart, isAuthenticated}) => {

    const checkProducts = () => {
        if (cart != null && cart.products.length !== 0) {
            return (
                <>
                    {cart.products.map(product => (
                        <CartProduct product={product} key={product.id}/>
                    ))}
                    <h5 className="mt-3">Total {cart.final_price} <strong>₴</strong></h5>
                    <Link className="text-decoration-none" to="/order"><Button variant="contained" color="secondary">Make
                        order</Button></Link>
                </>
            )
        } else {
            return <h1>Cart is empty</h1>
        }
    }
    return (
        <div className="justify-content-between">
            <div className="productList">
                {checkProducts()}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    cart: state.cart.cart
})

export default connect(mapStateToProps, null)(Cart)