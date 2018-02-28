const router = require('express').Router()
const { User } = require('../db/models')
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
const isLoggedIn = function (req, res, next) {
  _isLoggedIn(req) ? next() : deny(next)
}

const isAdmin = function (req, res, next) {
  _isLoggedIn(req) && _isAdmin(req) ? next() : deny(next)
}

const isSelf = function (req, res, next) {
  _isLoggedIn(req) && _isSelf(req) ? next() : deny(next)
}
// }


router.param('id', asyncHandler(async (req, res, next, id) => {
  try {
    const user = await User.findById(id, { attributes: ['id', 'email', 'isAdmin'] })
    if (!user) {
      const err = new Error('NOT FOUND')
      err.status = 401
      next(err)
    } else {
      req.requestedUser = user
      next()
    }
  }
  catch (err) {
    console.error(err)
  }
}))

// router.param('id', (req, res, next, id) => {
//   User.findById(id, { attributes: ['id', 'email', 'isAdmin'] })
//     .then(user => {
//       if (!user) {
//         const err = new Error('Not found!')
//         err.status = 401
//         next(err)
//       } else {
//         req.requestedUser = user
//         next()
//       }
//     })
//     .catch(next)
// })

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

router.put('/:id', isSelf, (req, res, next) => {
  req.requestedUser.update(req.body)
    .then(user => res.json(user))
    .catch(next)
})
router.delete('/:id', isAdmin, (req, res, next) => {
  req.requestedUser.destroy()
    .then(user => res.sendStatus(204))
    .catch(next)
})
