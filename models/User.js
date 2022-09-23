const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    favorites: [String]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_doc,ret) => {
            delete ret.password
            // remove the password key from our returned document
            return ret
        }
        
    }
})

module.exports = mongoose.model('User' , userSchema)