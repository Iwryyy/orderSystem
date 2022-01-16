// 导入express
const express = require('express')

// 实例化路由
const router = express.Router()

// 导入路由处理函数
const shopHandler = require('../router_handler/shop')

// 导入验证模块
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')


// 注册管理员
router.post('/regshop', expressJoi(reg_login_schema), shopHandler.regUser)

// 登录管理员
router.post('/loginshop', expressJoi(reg_login_schema), shopHandler.login)


// 导出路由
module.exports = router