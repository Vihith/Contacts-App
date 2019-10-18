const User = require('../models/user')

const authenticateUser = function (req, res, next) {

    const token = req.header('x-auth')
    console.log(token)
    if (token) {
        User.findByToken(token)
            .then(function (user) {
                req.user = user
                req.token = token
                next()
            })
            .catch(function (err) {
                console.log(err)
                res.status('401').send(err)
            })
    }
    else {
        res.status('401').send('failure')
    }
}

module.exports = authenticateUser