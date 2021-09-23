import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { getAllUsers, authUser, registerUser, getUserProfile, 
        updateUserProfile, deleteUser, getUserById, updateUserById } from "../controllers/userController.js"

const router = express.Router()

router.route("/").post(registerUser).get(protect, admin, getAllUsers)
router.post("/login", authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUserById)

export default router