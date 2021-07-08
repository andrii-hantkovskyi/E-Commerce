import React from 'react'
import {connect} from 'react-redux'
import {changeCartProductQty, removeFromCart} from '../../actions/cart'
import {Button, TextField} from '@material-ui/core'

const CartProduct = ({product, removeFromCart, changeCartProductQty}) => {

    const onChange = e => {
        changeCartProductQty(e.target.value, product.id)
    }

    return (
        <div className="cartProduct mt-3">
            <h4>{product.product.name} x {product.qty}</h4>
            <img src={product.product.image} alt={product.product.name} className="rounded img-fluid" width="256"
                 height="256"/>
            <p>{product.final_price} <strong>₴</strong></p>
            <TextField id="qtyInput" InputProps={{inputProps: {min: 1}}}
                       style={{width: '35px', marginRight: '10px'}} type="number" min="1"
                       value={product.qty} onChange={e => onChange(e)}/>
            <Button variant="outlined" color="secondary" onClick={() => removeFromCart(product.id)}>Remove</Button>
        </div>
    )
}

export default connect(null, {removeFromCart, changeCartProductQty})(CartProduct)