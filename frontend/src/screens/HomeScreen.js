import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {

    const [products, setProducts] = useState([])

    //run before component renders
    useEffect(() => {
        const fetchProducts = async () =>{
            const { data } = await axios.get('/api/products')
            setProducts(data)
        }
        fetchProducts()
    }, []) //when the value changes and you want it to fire off

    return (
        <React.Fragment>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    )
}

export default HomeScreen
