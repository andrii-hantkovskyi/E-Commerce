import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import store from './store'
import {Provider} from 'react-redux'

import Home from './containers/main/Home'
import Layout from './hocs/Layout'
import Login from './containers/auth/Login'
import Signup from './containers/auth/Signup'
import Cart from './containers/cart/Cart'
import ResetPassword from './containers/auth/ResetPassword'
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm'
import Activate from './containers/auth/Activate'
import ProductDetail from './containers/main/ProductDetail'
import Order from './containers/main/Order'


const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/reset-password" component={ResetPassword}/>
                    <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm}/>
                    <Route exact path="/activate/:uid/:token" component={Activate}/>
                    <Route exact path="/cart" component={Cart}/>
                    <Route exact path="/:category/:product_slug" component={ProductDetail}/>
                    <Route exact path='/order' component={Order}/>
                </Switch>
            </Layout>
        </Router>
    </Provider>
)

export default App
