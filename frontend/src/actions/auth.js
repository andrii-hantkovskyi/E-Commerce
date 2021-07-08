import axios from 'axios'
import {
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    RESET_PASSWORD_CONFIRM_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS
} from './types'
import {getCart} from './cart'


export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        const body = JSON.stringify({token: localStorage.getItem('access')})

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (response.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }
        } catch (error) {
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email})

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config)
        dispatch({
            type: RESET_PASSWORD_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL
        })
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({uid, token, new_password, re_new_password})

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config)
        dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        })
    }
}

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({first_name, last_name, email, password, re_password})

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        alert(error.response.data.email ? error.response.data.email[0].charAt(0).toUpperCase() + error.response.data.email[0].slice(1) : error.response.data.password[0])
        dispatch({
            type: SIGNUP_FAIL
        })
    }
}

export const activate = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({uid, token})

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)

        dispatch({
            type: ACTIVATION_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
}

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: response.data
            })

            dispatch(getCart())
        } catch (error) {
            dispatch({
                type: USER_LOADED_FAIL
            })
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        })
    }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password})

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })

        dispatch(load_user())

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}
