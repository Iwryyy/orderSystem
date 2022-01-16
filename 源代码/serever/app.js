// 导入express模块
const express = require('express')

// 创建服务器实例
const app = express()

const joi = require('joi')

// 一、配置cors跨域
// 1 导入cors中间件
const cors = require('cors')

// 2 将cors注册全局
app.use(cors())

// 二、配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 托管静态资源文件
app.use(express.static('./uploads'))

// 四、响应数据的中间件
app.use(function(req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function(err, status = 1) {
        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 四、配置解析 Token 的中间件
// 1.导入配置文件
const config = require('./config')

// 2.解析 token 的中间件
const expressJWT = require('express-jwt')

// 3.使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 三、注册路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 注册用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 注册商家模块
const shopRouter = require('./router/shop')
app.use('/api', shopRouter)

// 注册商家信息路由模块
const shopinfoRouter = require('./router/shopinfo')
app.use('/my', shopinfoRouter)

// 注册菜品模块
const foodRouter = require('./router/food')
app.use('/my', foodRouter)

// 注册分类模块
const sortRouter = require('./router/sort')
app.use('/my', sortRouter)

// 注册订单模块
const orderRouter = require('./router/order')
app.use('/my', orderRouter)

// 注册订单模块
const scoreRouter = require('./router/score')
app.use('/my', scoreRouter)


// 4.错误中间件
app.use(function(err, req, res, next) {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)

    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

    // 未知错误...
    res.cc(err)
})



// app.listen指定端口并启动服务器
app.listen(80, function() {
    console.log('api server running at http://127.0.0.1')
})