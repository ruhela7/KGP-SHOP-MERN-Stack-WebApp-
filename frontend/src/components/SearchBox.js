import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e)=>{
        e.preventDefault()

        if(keyword.trim()){
            history.push(`/serach/${keyword}`)
        }else{
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} className="header__search">
            <Form.Control
                type='text'
                name='q'
                onChange={e => setKeyword(e.target.value)}
                placeholder='search products...'
                className='mr-sm-2 ml-sm-3'
            ></Form.Control>
            <Button type='submit' variant='success' className='p-2 w-25'>
                {/* Search  */}
                <i className="fas fa-search"></i>
            </Button>
        </Form>
    )
}

export default SearchBox
