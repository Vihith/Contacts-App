const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator=require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
                // return /^.+@[^\.].*\.[a-z]{2,}$/.test(value)
            },
            message: function () {
                return 'invalid email format'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 126
    },

    tokens: [{
        token: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
})


userSchema.pre('save', function (next) {
    const user = this
    if (user.isNew) {
        bcrypt.genSalt(10)
            .then(function (salt) {
                bcrypt.hash(user.password, salt)
                    .then(function (encryptedPassword) {
                        user.password = encryptedPassword
                        next()
                    })
            })
    }
    else {
        next()
    }


})

//Own Static Method


// "email":"use5@gmail.com",
// "password":"abcd123"

userSchema.statics.findByCredentials = function (email, password) {
    const User = this
    return User.findOne({ email })
        .then(function (user) {
            if (!user) {
                return Promise.reject('invalid email / password ')
            }
            return bcrypt.compare(password, user.password)
                .then(function (result) {
                    if (result) {
                        // if(user.tokens.length<=2){
                        return Promise.resolve(user)
                        //}
                        // else {
                        //     return Promise.reject('Only 3 Active login allowed')
                        // }
                    }
                    else {
                        return Promise.reject('invalid email / password ')
                    }
                })
        })
        .catch(function (err) {
            return Promise.reject(err)
        })
}



//own instance method 
userSchema.methods.generateToken = function () {
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData, 'jwt@123')

    user.tokens.push({
        token
    })
    // user.ipAddresses.push({
    //       ipAddress
    // })
    return user.save()
        .then(function (user) {
            return Promise.resolve(token)
        })
        .catch(function (err) {
            return Promise.reject(err)
        })
}




userSchema.statics.findByToken = function (token) {
    const user = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'jwt@123')
    }
    catch (err) {
        return Promise.reject(err)
    }

    return User.findOne({
        _id: tokenData._id,
        'tokens.token': token
    })

}



const User = mongoose.model('User', userSchema)


module.exports = User