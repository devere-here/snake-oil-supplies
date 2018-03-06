const router = require('express').Router()
const { Product } = require('../db/models')
const asyncHandler = require('express-async-handler')
const { isAdmin } = require('../permissions')

module.exports = router

router.get('/', asyncHandler(async (req, res, next) => {
  const products = await Product.findAll()
  res.json(products)
}))

router.get('/:id', asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id
    }
  })
  res.json(product)
}))

router.post('/', isAdmin, asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body)
  res.status(201).json(product)
}))

router.put('/:id', isAdmin, asyncHandler(async (req, res, next) => {
  const product = await Product.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
  res.json(product[1][0])
}))

router.delete('/:id', isAdmin, asyncHandler(async (req, res, next) => {
  const product = await Product.destroy({
    where: {
      id: req.params.id
    }
  })
  res.status(204)
}))


