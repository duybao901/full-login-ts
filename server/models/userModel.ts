import mongoose from 'mongoose'
import { IUser } from '../Config/interface'
const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name'],
        trim: true,
        maxLength: [30, 'Your name is up to 20 ']
    },
    account: {
        type: String,
        required: [true, 'Please add your account'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add your password"],
        trim: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    role: {
        type: String,
        default: 'user' // admin
    },
    type: {
        type: String,
        default: 'register' // login
    }
}, {
    timestamps: true
})

export default mongoose.model<IUser>('User', userScheme)