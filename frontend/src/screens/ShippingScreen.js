import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'
import { cartSaveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'


const ShippingScreen = ({ history }) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()

        //DISPATCH SAVE ADDRESS
        dispatch(cartSaveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }
    return <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="PostalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter postal code"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="Country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter country"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button className="mt-3" type='submit' variant='primary'>
                continue
            </Button>
        </Form>
    </FormContainer >
}

export default ShippingScreen
