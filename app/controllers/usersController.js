const User = require('../models/user')
const express = require('express')
const router = express.Router()



module.exports.register = (req, res) => {
    const data = req.body
    const user = new User(data)
    user.save()
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.json(err)
        })
}


module.exports.login = (req, res) => {
    const body = req.body

    User.findByCredentials(body.email, body.password)
        .then(function (user) {
            return user.generateToken()
        })
        .then((token) => {

            res.setHeader('x-auth', token).send({})
        })
        .catch(function (err) {
            res.send(err)
        })
}


module.exports.account = (req, res) => {
    const { user, token } = req
    res.send(user)
}


module.exports.logout = (req, res) => {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { 'tokens': { 'token': token } } }, { new: true, runValidators: true })
        .then(function (user) {
            res.send({ notice: "successfully logged out" })
        })
        .catch(function (err) {
            res.send(err)
        })
}


module.exports.destroy = (req, res) => {
    const { user, token } = req
    User.findOneAndUpdate({ _id: user._id })
        .then(function (user) {
            res.send({ notice: "successfully deleted" })
        })
        .catch(function (err) {
            res.send(err)
        })
}

