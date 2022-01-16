// 导入express
const express = require('express')

// 导入路由对象
const router = express.Router()

// 二、导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要的验证规则对象
const { update_shopinfo_schema, update_password_schema } = require('../schema/user')
const { update_avatar_schema } = require('../schema/user')

// 获取商家信息模块
const shopinfo_handler = require('../router_handler/shopinfo')

// 获取商家信息
router.get('/shopinfo', shopinfo_handler.getShopInfo)

// 更新商家的基本信息
router.post('/shopinfo', expressJoi(update_shopinfo_schema), shopinfo_handler.updateShopInfo)

// 更新商家图片的路由
router.post('/shopupdate/avatar', expressJoi(update_avatar_schema), shopinfo_handler.updateAvatar)

// 根据ID获取商店星系
router.post('/shopinfoByid', shopinfo_handler.getShopInfobyid)

router.get('/allshopinfo', shopinfo_handler.getAllShopInfo)


// 向外共享路由
module.exports = router