const router = require('express').Router()
const { User } = require('../db/models')
const asyncHandler = require('express-async-handler')
const { isAdmin, isSelf, isLoggedIn} = require('../permissions')

module.exports = router

//THE FOLLOWING CODE:
//taken from boilermaker repo pull request gatekeepers#16, not entirely sure how it works, but is necessary for authentication
//************************************

router.param('id', asyncHandler(async (req, res, next, id) => {
  const user = await User.findById(id, { attributes: ['id', 'email', 'isAdmin'] })
  if (!user) {
    const err = new Error('NOT FOUND')
    err.status = 401
    next(err)
  } else {
    req.requestedUser = user
    next()
  }
}))

router.get('/', asyncHandler( async (req, res, next) => {
  const users = await User.findAll({
    attributes: ['id', 'email']
  })
  res.json(users)
}))

router.get('/all', isAdmin, asyncHandler( async (req, res, next) => {
  const users = await User.findAll()
  res.json(users)
}))

router.get('/:id', isSelf, (req, res, next) => {
  res.json(req.requestedUser)
})

router.put('/:id', isSelf, (req, res, next) => {
  req.requestedUser.update(req.body)
    .then(user => res.json(user))
    .catch(next)
})
router.delete('/:id', isAdmin, (req, res, next) => {
  req.requestedUser.destroy()
    .then(() => res.sendStatus(204))
    .catch(next)
})
