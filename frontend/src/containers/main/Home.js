import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Product from './Product'

const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env['REACT_APP_API_URL']}/api/products/`
        }).then(res => setProducts(res.data))
    }, [])
    return (
        <div className="container">
            <h1>Home</h1>
            <div className="row mt-5">
                {products.map(product => (
                    <Product product={product} key={product.id}/>
                ))}
            </div>
        </div>
    )
}

export default Home