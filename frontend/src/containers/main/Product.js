import React from 'react'
import {Button, IconButton} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import {connect} from 'react-redux'
import {addToCart} from '../../actions/cart'
import {Link} from 'react-router-dom'


const Product = ({product, addToCart, isAuthenticated}) => {

    return (
        <div className="w-25 h-25">
            <h6>{product.name}</h6>
            <img  src={product.image} alt={product.name} className='rounded' width='128' height='128'/>
            <p>{product.price} <strong>₴</strong></p>
            <Link to={`/${product.category.slug}/${product.slug}`}><Button variant="contained" color="primary">Detail</Button></Link>
            {isAuthenticated ?
                <IconButton onClick={() => addToCart(product.id)} color="secondary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon/>
                </IconButton> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addToCart})(Product)