import jwt from 'jsonwebtoken'

//when this function is called, it generates token
const generateToken = (id) =>{
    //NOTE: this is the actual function that generates token.
    //it takes payload(id here) & one secret key
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d' //d = days
    })
}

export default generateToken