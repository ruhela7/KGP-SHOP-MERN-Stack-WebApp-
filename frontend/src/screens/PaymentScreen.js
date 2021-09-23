import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { Form, Button, Col } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { cartSavePaymentMethod } from '../actions/cartActions'


const PaymentScreen = ({ history }) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push("/shipping")
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) => {
        e.preventDefault()

        //DISPATCH SAVE PAYMENT METHOD
        dispatch(cartSavePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Payment Method</Form.Label>
                <Col className="p-2">
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='Payment Method'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                    
                    {/* <Form.Check
                        type='radio'
                        label='Stripe'
                        id='Stripe'
                        name='Payment Method'
                        value='Stripe'
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check> */}
                </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>
                continue
            </Button>
        </Form>
    </FormContainer >
}

export default PaymentScreen
