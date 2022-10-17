const mongoose = require('mongoose')
const validator = require('validator')
const { hashPassword, matchPassword } = require('../../utils/bcrypt')

const { Schema } = mongoose

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

//*static signup method
userSchema.statics.signup = async function (email, password) {
    //*validate email, password
    if (!email || !password) throw Error('All fields must be filled')
    if (!validator.isEmail(email)) throw Error('Email is not valid')
    if (!validator.isStrongPassword(password))
        throw Error('Password not strong enough')

    const exists = await this.findOne({ email })

    if (exists) throw Error('Email already exists')

    const hashedPassword = await hashPassword(password)

    const user = await this.create({ email, password: hashedPassword })
    return user
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) throw Error('All fields must be filled')

    const user = await this.findOne({ email })
    if (!user) throw Error('Incorrect email ')

    const isMatch = await matchPassword(password, user.password)
    if (!isMatch) throw Error('Invalid password ')

    return user
}

module.exports = mongoose.model('User', userSchema)
