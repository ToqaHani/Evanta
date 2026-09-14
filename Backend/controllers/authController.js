const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    'Password must be at least 8 characters and contain letters, numbers, and symbols'
            })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Registration failed',
            error: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: rememberMe ? '30d' : '1d'
            }
        )

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({
            message: 'Login failed',
            error: error.message
        })
    }
}

module.exports = { register, login }