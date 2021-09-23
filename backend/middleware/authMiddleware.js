import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

//this protect middleware, check if token is present or not.(ans token is present only if user is logedin or new user registered)
//if token is present, it puts data from token(after decoded) to req.user.
//so whichever route use this token, can acess data from req.user 😄
const protect = asyncHandler(async(req, res, next) =>{
    let token

    //to access token from jwt, write req.headers.authorization. 'Authorization: Bearer <token>'
    //that Bearer means nothing but- “give access to the bearer of this token.”
    //so make sure u use 'Bearer Token'(eg jwt, etc). i mean Bearer must be there at start
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //Bearer' '<token name> : get seperated by ' ' using split 
            token = req.headers.authorization.split(' ')[1]

            //NOTE: decode will fetch payload from token.
            //will look like: { id: '61349de9176b9abf7cdbf8bb', iat: 1630843184, exp: 1633435184 }
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // console.log("Decoded token found: ", decoded);
            //req.user now has current logedin user 😄
            req.user = await User.findById(decoded.id).select('-password') //donot want password

            next()
        }catch(error){
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token){
        res.status(401)
        throw new Error("Un-autorized, No token found")
    }

})

const admin = (req, res, next)=>{
    if(req.user && req.user.isAdmin){
        next()
    } else{
        res.status(401)
        throw new Error('Not Authorized as an Admin.')
    }
}

export { protect, admin }

