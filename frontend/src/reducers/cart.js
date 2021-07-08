import {
    ADD_TO_CART_FAIL,
    ADD_TO_CART_SUCCESS, CHANGE_CART_PRODUCT_QTY_FAIL, CHANGE_CART_PRODUCT_QTY_SUCCESS,
    GET_CART_FAIL,
    GET_CART_SUCCESS, GET_ORDERS_FAIL, GET_ORDERS_SUCCESS,
    LOGOUT, MAKE_ORDER_FAIL, MAKE_ORDER_SUCCESS,
    REMOVE_FROM_CART_FAIL, REMOVE_FROM_CART_SUCCESS
} from '../actions/types'

const initialState = {
    cart: null
}

const reducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case GET_CART_SUCCESS:
            return {
                ...state,
                cart: payload
            }
        case GET_CART_FAIL:
        case LOGOUT:
            return {
                ...state,
                cart: null
            }
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    owner: {
                        ...state.cart.owner,
                        orders: payload
                    }
                }
            }
        case ADD_TO_CART_SUCCESS:
        case ADD_TO_CART_FAIL:
        case REMOVE_FROM_CART_SUCCESS:
        case REMOVE_FROM_CART_FAIL:
        case CHANGE_CART_PRODUCT_QTY_SUCCESS:
        case CHANGE_CART_PRODUCT_QTY_FAIL:
        case GET_ORDERS_FAIL:
        case MAKE_ORDER_SUCCESS:
        case MAKE_ORDER_FAIL:
        default:
            return state
    }
}

export default reducer