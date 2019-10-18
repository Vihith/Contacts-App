
const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')
//express routing
module.exports.list = (req, res) => {
    Contact.find({ userId : req.user._id })
        .then((contacts) => {
            res.json(contacts)
        })
}


module.exports.create = (req, res) => {
    const data = req.body

    const contact = new Contact({ name: data.name, mobile: data.mobile, email: data.email })
    contact.userId = req.user._id
    contact.save()
        .then((contact) => {
            res.json(contact)
        })
        .catch((error) => {
            res.json(error)
        })
}


module.exports.show = (req, res) => {
    const id = req.params.id
    Contact.findOne({ userId: req.user._id, _id: id }).populate('userId')
        .then((contact) => {
            if (contact) {
                res.json(contact)
            }
            else {
                res.status('404').json({})
            }
        })
        .catch((error) => {
            res.json(error)
        })
}


module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Contact.findOneAndUpdate({ userId: req.user._id, _id: id }, { $set: body }, { new: true, runValidators: true })
        .then((contact) => {
            if (contact) {
                res.json(contact)
            }
            else {
                res.status('404').json({})
            }

        })
        .catch((error) => {
            res.json(error)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Contact.findOneAndDelete({ userId : req.user._id, _id: id })
        .then((contact) => {
            res.json(contact)
        })
        .catch((error) => {
            res.json(error)
        })
}


