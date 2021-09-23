import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart} from '../actions/cartActions'
import Message from '../components/Message'
import Meta from '../components/Meta'

const CartScreen = ({ match, location, history }) => {
    const productID = match.params.id

    //NOTE: location.search stored query params - ?qty="3"
    const qty = location.search ? Number(location.search.split("=")[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    console.log(cartItems);

    useEffect(() => {
        dispatch(addToCart(productID, qty))
    }, [dispatch, productID, qty])

    const removeFromCartHandler = (id) => {
        // console.log(`remove id ${id}`);
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () =>{
        // console.log("checkout products");
        history.push("/login?redirect=shipping")
    }

    return (
        <Row>
        <Meta title=' 🛒 KGP-SHOP | Cart' />
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ?
                        <Message>
                            Your cart is empty
                            <Link to="/" style={{ textDecoration: 'none' }}> Go Back</Link>
                        </Message> : (
                            <ListGroup variant="flush">
                                {
                                    cartItems.map(item => (
                                        <ListGroup.Item key={item.product}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col md={3}>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={2}>
                                                    ${item.price}
                                                </Col>
                                                <Col md={2}>
                                                    <Form.Control
                                                        as='select'
                                                        value={item.qty}
                                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                        {
                                                            [...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                                <Col md={2}>
                                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                                        <i className='fas fa-trash'></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                items</h2>
                            
                            total: ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button onClick={checkoutHandler} type='button' className='btn__width' disabled={cartItems.length === 0}>
                            Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
