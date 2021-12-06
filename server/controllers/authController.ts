import { Request, Response } from 'express'
import Users from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateActiveToken, generateAccessToken, generateRefreshToken } from '../Config/generateToken'
import { validEmail, validPhone } from '../middleware/valid'
import sendMail from '../Config/sendMail'
import { sendSms, smsOTP, smsVefify } from '../Config/sendSms'
import { IDecodeToken, IUser, IGooglePayload, IParamsUser } from '../Config/interface'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`)
const BASE_URL = process.env.BASE_URL
class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { name, account, password } = req.body;

            const user = await Users.findOne({ account })
            if (user) return res.status(400).json({ msg: "Email or Phone number already exists." })

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = { name, account, password: passwordHash }

            const active_token = generateActiveToken({ newUser })

            const url = `${BASE_URL}/active/${active_token}`

            if (validEmail(account)) {
                sendMail(account, url, `Dear ${name}`, "Verify your email address")

                return res.json({
                    msg: "Register successfully, Please check your email address",
                    user: newUser,
                    active_token: active_token
                })
            } else if (validPhone(account)) {
                sendSms(account, url, "Veryfy your phone.")

                return res.json({
                    msg: "Register successfully, Please check your phone",
                    data: newUser,
                    token: active_token
                })
            }

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async activeAccount(req: Request, res: Response) {
        try {
            const { active_token } = req.body;

            const decode = <IDecodeToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`);

            const { newUser } = decode

            if (!newUser) {
                return res.status(400).json({ msg: "Invalid authentication" })
            }

            var user = await Users.findOne({ account: newUser.account });
            if (user) return res.status(400).json({ msg: 'Account has been already.' })

            user = new Users(newUser);
            await user.save();

            return res.json({ msg: 'Acctive has been account successfully.' })

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { account, password } = req.body;

            const user = await Users.findOne({ account });
            if (!user) return res.status(400).json({ msg: "Account is not exits." })

            loginUser(user, password, res)

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie('refreshtoken', { path: `/api/refresh_token` });
            return res.json({ msg: "logout success!" })
        } catch (err: any) {

        }
    }

    async refrestToken(req: Request, res: Response) {
        try {

            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: "Please login now!" })
            const decode = <IDecodeToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)

            if (!decode.id) return res.status(400).json({ msg: "Please login now!" });

            const user = await Users.findById(decode.id);
            if (!user) return res.status(400).json({ msg: "This account is not exits." })

            const access_token = generateAccessToken({ id: user._id })

            return res.json({ user, access_token })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async loginGoogle(req: Request, res: Response) {

        try {
            const { id_token } = req.body;

            const verify = await client.verifyIdToken({
                idToken: id_token,
            })

            const {
                email, email_verified, name, picture
            } = <IGooglePayload>verify.getPayload()

            if (!email_verified)
                return res.status(500).json({ msg: "Email verification failed." })

            const password = email + 'your google secrect password'
            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({ account: email })

            if (user) {
                loginUser(user, password, res)
            } else {
                const user = {
                    name,
                    account: email,
                    password: passwordHash,
                    avatar: picture,
                    type: 'login'
                }
                registerUser(user, res)
            }

        } catch (err: any) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    }

    async loginSms(req: Request, res: Response) {
        try {
            const { phone } = req.body;
            const data = await smsOTP(phone, 'sms')

            return res.json(data)
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async vefifySms(req: Request, res: Response) {
        try {
            const { phone, code } = req.body;

            const data = await smsVefify(phone, code)
            if (!data?.valid) return res.status(400).json({ msg: "Invalid Authentication." })

            const password = phone + 'your phone secrect password'
            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({ account: phone })

            if (user) {
                loginUser(user, password, res);
            } else {
                const user = {
                    name: phone,
                    account: phone,
                    password: passwordHash,
                    type: 'login'
                }
                registerUser(user, res)
            }


        } catch (err: any) {
            return res.status(500).json({ msg: err.meesage })
        }
    }
}

const loginUser = async (user: IUser, password: string, res: Response) => {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

    const access_token = generateAccessToken({ id: user._id })
    const refresh_token = generateRefreshToken({ id: user._id })

    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 100 // 30 day
    })
    return res.json({
        msg: "login success",
        access_token,
        user
    })
}

const registerUser = async (user: IParamsUser, res: Response) => {
    const newUser = new Users(user)
    await newUser.save()

    const access_token = generateAccessToken({ id: newUser._id })
    const refresh_token = generateRefreshToken({ id: newUser._id })

    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
    })

    res.json({
        msg: 'Login Success!',
        access_token,
        user: { ...newUser._doc, password: '' }
    })

}

export default new AuthController
