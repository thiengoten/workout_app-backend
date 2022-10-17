const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const value = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        })

        if (value) {
            console.log(
                `connect to DB in port http://localhost:${process.env.PORT}`
            )
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    connectDB,
}
