import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

//@desc fetch auth user
//@route POST api/users/login
//@access public
export const authUser = asyncHandler(async (req, res) => {
    //NOTE: asyncHandler prevets us from writing try and catch. It is a middle ware and do everything on its own
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password.')
    }

})


//@desc register new user
//@route POST api/users
//@access public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    //if user created successfully
    if (user) {
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

//@desc fetch user profile
//@route GET api/users/profile
//@access private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            id: user._id,
            name: user.name,
            password: user.password,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

//@desc update user profile
//@route PUT api/users/profile
//@access private
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }

})

//@desc fetch all users
//@route GET api/users
//@access private/admin
export const getAllUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.find({})
    res.json(allUsers)
})

//@desc delete user by id
//@route DELETE api/users/:id
//@access private/admin
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message: 'User Deleted'})
    }else{
        res.status(404)
        throw new Error("User Not Found.")
    }
})

//@desc get user by id
//@route DELETE api/users/:id
//@access private/admin
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")
    
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error("User Not Found.")
    }
})

//@desc update user by id (here Admin updates the user)
//@route PUT api/users/:id
//@access private/admin
export const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin

        const updatedUser = await user.save();

        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})