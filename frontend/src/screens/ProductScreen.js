import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails, createProductReview } from '../actions/productActions';
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Meta from '../components/Meta';

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview } = productReviewCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(successProductReview){
            alert('Review Submitted.Thank You.')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        //NOTE: history is used to redirect just as we do in backend by writing res.redirect("bla/bla/bla")
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitReviewHandler = (e)=>{
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {rating, comment}))
    }

    return (
        <>
            <Link className="btn btn-light" to="/">Go Back</Link>
            {loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> :
                (
                    <>
                    <Meta title={product.name}/>
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: {`$${product.price}`}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                    <strong> ${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? " In Stock" : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty:</Col>
                                                    <Col>
                                                        <Form.Control as='select' value={qty} onChange={e => setQty(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item>
                                            <Button className="btn__width" onClick={addToCartHandler} type='button' disabled={product.countInStock === 0}>
                                                Add To Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <h2>Reviews</h2>
                                {product.reviews.length === 0 && <Message variant='danger'>No Review</Message>}
                                <ListGroup variant='flush'>
                                    {product.reviews.map(review => (
                                        <ListGroup.Item key={review._id}>
                                            <p><strong>{review.name}</strong></p>
                                            <Rating value={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h3>Write a Customer Review</h3>
                                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                        {userInfo ?
                                            <Form onSubmit={submitReviewHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                        <option key=''>Select...</option>
                                                        <option key='1'>1 </option>
                                                        <option key='2'>2 </option>
                                                        <option key='3'>3 </option>
                                                        <option key='4'>4 </option>
                                                        <option key='5'>5 </option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        row='3'
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>
                                                <Button className='mt-3' type='submit' variant='primary'>
                                                    Submit
                                                </Button>
                                            </Form> :
                                            (<Message variant='danger'>
                                                Please <Link to='/login'>signin</Link> to write a review
                                            </Message>
                                            )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </>
                )
            }

        </>
    )
}

export default ProductScreen
