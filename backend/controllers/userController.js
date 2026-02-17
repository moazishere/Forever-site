import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.login(email, password)

        const token = createToken(user._id)

        res.status(200).json({ success: true, email, token })
    } catch (error) {
        res.json({ error: error.message })
    }
}


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await User.register(name, email, password)

        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.json({ error: error.message })
    }
}

const addToWishlistItems = async (req, res) => {
    const { productId } = req.body
    const userId = req.userId

    try {
        const user = await User.findById(userId)

        if(!user) {
            return res.json({error: "User not found"})
        }

        if (!user.favourites.includes(productId)) {
            user.favourites.push(productId)
        } else {
            user.favourites = user.favourites.filter((id) => id !== productId)
        }
        await user.save()
        res.json({success: true, favourites: user.favourites})
    } catch (error) {
        res.json({ error: error.message })
    }
}

const getWishlistItems = async (req, res) => {
    const userId = req.userId

    try {
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json({success: false, error: 'User not found'})
        }

        res.json({success: true,favourites: user.favourites})
    } catch(error) {
        res.json({error: error.message})
    }
}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: 'Invalid admin credentials' })
        }

        const token = jwt.sign(
            { email, role: 'admin' },
            process.env.JWT_SECRET
        )

        return res.json({ success: true, token })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
export { loginUser, registerUser, adminLogin, addToWishlistItems, getWishlistItems }
