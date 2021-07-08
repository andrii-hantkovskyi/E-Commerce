import axios from 'axios'
import {
    ADD_TO_CART_FAIL,
    ADD_TO_CART_SUCCESS,
    CHANGE_CART_PRODUCT_QTY_FAIL,
    CHANGE_CART_PRODUCT_QTY_SUCCESS,
    GET_CART_FAIL,
    GET_CART_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDERS_SUCCESS,
    MAKE_ORDER_FAIL,
    REMOVE_FROM_CART_FAIL,
    REMOVE_FROM_CART_SUCCESS,
} from './types'

axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export const getCart = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/carts/current_customer_cart/`, config)
            dispatch({
                type: GET_CART_SUCCESS,
                payload: response.data
            })
            dispatch(getOrders())
        } catch (err) {
            dispatch({
                type: GET_CART_FAIL
            })
        }
    } else {
        dispatch({
            type: GET_CART_FAIL
        })
    }
}

export const addToCart = id => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        try {
            const response = await axios({
                method: 'PUT',
                url: `${process.env.REACT_APP_API_URL}/api/carts/current_customer_cart/add_to_cart/${id}/`,
                headers: config.headers
            })
            dispatch({
                type: ADD_TO_CART_SUCCESS
            })
            alert(response.data.detail)
            dispatch(getCart())
        } catch (err) {
            alert(err.response.data.detail)
            dispatch({
                type: ADD_TO_CART_FAIL
            })
        }
    } else {
        dispatch({
            type: ADD_TO_CART_FAIL
        })
    }
}

export const removeFromCart = id => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        try {
            await axios({
                method: 'PUT',
                url: `${process.env.REACT_APP_API_URL}/api/carts/current_customer_cart/remove_from_cart/${id}/`,
                headers: config.headers
            })
            dispatch({
                type: REMOVE_FROM_CART_SUCCESS,
            })
            dispatch(getCart())
        } catch (err) {
            dispatch({
                type: REMOVE_FROM_CART_FAIL
            })
        }
    } else {
        dispatch({
            type: REMOVE_FROM_CART_FAIL
        })
    }
}

export const changeCartProductQty = (qty, id) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        try {
            await axios({
                method: 'PATCH',
                url: `${process.env.REACT_APP_API_URL}/api/carts/current_customer_cart/change_qty/${qty}/${id}/`,
                headers: config.headers
            })
            dispatch({
                type: CHANGE_CART_PRODUCT_QTY_SUCCESS,
            })
            dispatch(getCart())
        } catch (err) {
            dispatch({
                type: CHANGE_CART_PRODUCT_QTY_FAIL
            })
        }
    } else {
        dispatch({
            type: CHANGE_CART_PRODUCT_QTY_FAIL
        })
    }
}

export const getOrders = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        try {
            const response = await axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/api/orders/current_customer_orders/`,
                headers: config.headers
            })
            dispatch({
                type: GET_ORDERS_SUCCESS,
                payload: response.data
            })
        } catch (err) {
            dispatch({
                type: GET_ORDERS_FAIL
            })
        }
    } else {
        dispatch({
            type: GET_ORDERS_FAIL
        })
    }
}

export const makeOrder = (first_name, last_name, phone, address, comment, buying_type) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        const body = JSON.stringify({first_name, last_name, phone, address, comment, buying_type})

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/orders/current_customer_orders/new_order/`, body, config)
            dispatch(getCart())
            dispatch(getOrders())
        } catch (err) {
            dispatch({
                type: MAKE_ORDER_FAIL
            })
        }
    } else {
        dispatch({
            type: MAKE_ORDER_FAIL
        })
    }
}