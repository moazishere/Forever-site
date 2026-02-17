import express from 'express'
import { loginUser, registerUser, adminLogin, addToWishlistItems, getWishlistItems } from '../controllers/userController.js'
import userAuth from '../middleware/auth.js'
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/addWishlistItem', userAuth, addToWishlistItems)
userRouter.post('/getWishlistItems', userAuth, getWishlistItems)
userRouter.post('/admin', adminLogin)

export default userRouter