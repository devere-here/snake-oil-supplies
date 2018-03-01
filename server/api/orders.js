const router = require('express').Router()
const { Order } = require('../db/models')
const asyncHandler = require('express-async-handler')
const {isSelf, isAdmin} = require('../permissions')

module.exports = router

/****** USER ******/
//When user creates session, return cart if exists
router.get('/', isSelf, asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({
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
  res.json(order)
}));

//When user checks out
router.put('/', asyncHandler(async (req, res, next) => {
  const order = await Order.update(req.body)
  res.json(order)
}));

//When user wants to clear cart
router.delete('/:id', isSelf, asyncHandler(async (req, res, next) => {
  const destroy = await Order.destroy({
    where: {
      userId: req.user.id,
      completed: false,
  }})
  res.status(204)
}))

//When user wants to view past orders
router.get('/pastOrders', isSelf, asyncHandler(async (req, res, next) => {
  const order = await Order.findAll({
    where: {
      userId: req.user.id,
      completed: true,
    }
  })
  res.json(order)
}));


/****** ADMIN ******/
//When admin wants to see all orders
router.get('/', isAdmin, asyncHandler(async (req, res, next) => {
  const order = await Order.findAll()
  res.json(order)
}));
