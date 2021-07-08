import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Button} from '@material-ui/core'
import {connect} from 'react-redux'
import {addToCart} from '../../actions/cart'

const ProductDetail = ({match, addToCart, isAuthenticated}) => {
    const [product, setProduct] = useState({})
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/products/${match.params.product_slug}/`
        }).then(res => setProduct(res.data)).then(() => setLoaded(true))
    }, [match.params.product_slug])

    if (!isLoaded) return <p>Loading...</p>

    return (
        <div className="ProductDetail">
            <div className="ProductInfo">
                <h4>{product.category.name}</h4>
                <h1>{product.name}</h1>
                <img src={product.image} alt={product.name} className='rounded' width='512' height='512'/>
                <p>{product.description}</p>
                <p>{product.price} <strong>₴</strong></p>
            </div>
            {isAuthenticated ?
                <Button variant="contained" color="secondary" onClick={() => addToCart(product.id)}>Add to
                    cart</Button> : null}
        </div>

    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addToCart})(ProductDetail)