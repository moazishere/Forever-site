import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
const authUser = async (req, res, next) => {
    const { token } = req.headers

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }


    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = token_decoded._id
        next()
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token.' })
    }
}
export default authUser