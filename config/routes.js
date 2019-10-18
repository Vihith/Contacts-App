const express = require('express')
const router = express.Router()

const usersController = require('../app/controllers/usersController')
const autheticateuser = require('../app/middlewares/authentication')
const contactsController = require('../app/controllers/contactsController')
router.get('/contacts', autheticateuser, contactsController.list)
router.get('/contacts/:id', autheticateuser, contactsController.show)
router.post('/contacts', autheticateuser, contactsController.create)
router.put('/contacts/:id', autheticateuser, contactsController.update)
router.delete('/contacts/:id', autheticateuser, contactsController.destroy)


//router.use('/users', usersController)


router.get('/users/account', autheticateuser, usersController.account)
router.post('/users/login' , usersController.login)
router.post('/users/register', usersController.register)
router.put('/users/logout', autheticateuser, usersController.logout)
router.delete('/users/:id', autheticateuser, usersController.destroy)


module.exports = router