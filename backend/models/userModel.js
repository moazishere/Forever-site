import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    }
}, {minimize:false})

userSchema.statics.register = async function (name, email, password) {
    // checking user already exists pr not
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("User already exists")
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hash })

    return user
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Email is invalid')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Password is not correct')
    }



    return user
}



const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel