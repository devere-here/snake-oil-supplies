const router = require('express').Router()
const { OrderDetail } = require('../db/models')
const asyncHandler = require('express-async-handler')
const { isSelf } = require('../permissions')

module.exports = router

/****** USER ******/
//When user creates session, return cart details if exists
router.get('/', isSelf, asyncHandler(async (req, res, next) => {
  const orderDetails = await OrderDetail.findOne({
    where: { orderID: req.body.orderId }
  })
  res.json(orderDetails)
}));

//When user adds additional cart items / guest checks out
router.post('/', asyncHandler(async (req, res, next) => {
  const orderDetails = await OrderDetail.create(req.body)
  res.json(orderDetails)
}));

