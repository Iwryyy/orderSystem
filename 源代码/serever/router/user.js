// 创建路由对象
const express = require('express')
const router = express.Router()

// 一、导入用户处理函数模块
const userHandler = require('../router_handler/user')

// 二、导入验证中间件和规则模块
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')

// 注册新用户
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)

// 登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

// 向外共享路由
module.exports = router