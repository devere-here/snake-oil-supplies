const router = require('express').Router()
const {User} = require('../db/models')
const asyncHandler = require('express-async-handler')
module.exports = router


//THE FOLLOWING CODE:
//taken from boilermaker repo pull request gatekeepers#16, not entirely sure how it works, but is necessary for authentication
//************************************

const deny = next => {
  const err = new Error('NOT ALLOWED')
  err.status = 401
  next(err)
}
const _isLoggedIn = req => !!req.user
const _isAdmin = req => req.user.isAdmin
const _isSelf = req => req.user.id === req.requestedUser.id

// module.exports = {
  const isLoggedIn = function(req, res, next) {
    _isLoggedIn(req) ? next() : deny(next)
  }

  const isAdmin = function(req, res, next) {
    _isLoggedIn(req) && _isAdmin(req) ? next() : deny(next)
  }

  const isSelf = function(req, res, next) {
    _isLoggedIn(req) && _isSelf(req) ? next() : deny(next)
  }
// }


router.param('id', asyncHandler(async (req, res, next, id) => {
 try {
   const user = await User.findById(id, {attributes: ['id', 'email', 'isAdmin']})
   if (!user) {
     const err = new Error('NOT FOUND')
     err.status = 401
     next(err)
   } else {
     req.requestedUser = user
   }
 }
 catch (err){
   console.error(err)
 }
}))

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', isSelf, (req, res, next) => {
  res.json(req.requestedUser)
})
