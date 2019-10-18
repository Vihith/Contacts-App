const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,

        validate: {
            validator: function (v) {
                return /^[1-9]{1}[0-9]{9}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },

    email: {
        type: String,

        validate: {
            validator: function (v) {
                return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(v);
            },
            message: props => `${props.value} is not a valid e-mail!`
        },
        required: [true, 'User  e-mail required']
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact 