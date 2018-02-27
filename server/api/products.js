const router = require('express').Router()
const { Product } = require('../db/models')
const asyncHandler = require('express-async-handler')

module.exports = router

router.get('/', asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  }
  catch (err) {
    console.error(err)
  }
}))

router.get('/:id', asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(product)
  }
  catch (err) {
    console.error(err)
  }
}))

router.post('/', asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  }
  catch (err) {
    console.error(err)
  }
}))

router.put('/:id', asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.json(product[1][0])
  }
  catch (err) {
    console.error(err)
  }
}))

router.delete('/:id', asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    //res.json(products)
    res.sendStatus(200)
  }
  catch (err) {
    console.error(err)
  }
}))
