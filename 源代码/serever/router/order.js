const express = require('express')
const router = express.Router()

const orderHandler = require('../router_handler/order')

// 添加订单
router.post('/addOrder', orderHandler.Addorder)

// 根据商店ID查询
router.post('/getOrderByShop', orderHandler.GetorderByShop)

// 根据用户ID查询
router.post('/getOrderByUser', orderHandler.GetorderByUser)

// 根据ID值查询
router.get('/GetorderById/:id', orderHandler.GetorderById)

// 删除订单
router.post('/DeleteOrder', orderHandler.DeleteOrder)

// 根据用户ID查询
router.post('/getOrderByPL', orderHandler.GetorderNoPL)


// 是否已评论
router.post('/isPingLun', orderHandler.is_pingL)

// 导出路由
module.exports = router