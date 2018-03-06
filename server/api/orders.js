const router = require('express').Router()
const { Order, OrderDetail, User, Product } = require('../db/models')
const asyncHandler = require('express-async-handler')
const {isSelf, isAdmin, isLoggedIn} = require('../permissions')

module.exports = router

/****** USER ******/
//When user creates session, return cart if exists
router.get('/', isLoggedIn, asyncHandler(async (req, res, next) => {
  const order = await Order.findOrCreate({
    where: {
      userId: req.user.id,
      completed: false,
    }
  })
  res.json(order)
}));

//When user adds to cart for first time / guest checks out
router.post('/', asyncHandler(async (req, res, next) => {
  const order = await Order.create(req.body)
  console.log('order is, ', order);
  res.json(order)
}));

//When user checks out, set completed: true
router.put('/', asyncHandler(async (req, res, next) => {
  console.log('req.body', req.body)
  const order = await Order.update(req.body, {
    where: {
      id: req.body.id,
		},
		returning: true
  })

  res.json(order)
}));

//When user wants to clear cart
router.delete('/:id', isSelf, asyncHandler(async (req, res, next) => {
  await Order.destroy({
    where: {
      userId: req.user.id,
      completed: false,
  }})
  res.status(204)
}))

//When user wants to view past orders
router.get('/pastOrders', isLoggedIn, asyncHandler(async (req, res, next) => {
  const order = await Order.findAll({
    where: {
      userId: req.user.id,
      completed: true,
    },
    include: [{
      model: Product
    }],
  })
  res.json(order)
}));

/****** ADMIN ******/
//When admin wants to see all orders
router.get('/admin', isAdmin, asyncHandler(async (req, res, next) => {
  const order = await Order.findAll({
    include: [{
      model: Product,
    }],
  })
  res.json(order)
}));

//admin put
router.put('/admin/:id', isAdmin, asyncHandler(async (req, res, next) => {
  console.log('req.body', req.body)
  const order = await Order.update(req.body, {
    where: {
      id: req.params.id,
		},
		returning: true
  })
  res.json(order)
}));

//admin delete
router.delete('/admin/:id', isAdmin, asyncHandler(async (req, res, next) => {
  await Order.destroy({
    where: {
      userId: req.params.id,
      completed: false,
  }})
  res.status(204)
}))
