const User = require('../database/models/User')
const { createToken } = require('../utils/jwt')
//* login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        //* create token
        const token = createToken(user._id)

        if (!user) return res.status(500).json('Pls try again')

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//*sign up user
const signupUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.signup(email, password)

        //* create token
        const token = createToken(user._id)

        if (!user) return res.status(500).json('Pls try again')

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser,
}
