const express = require('express')
const router = express.Router()

const scoreHandler = require('../router_handler/score')

// 用户添加评论
router.post('/addScore', scoreHandler.addScore)

// 根据商家id查看评论
router.post('/getScore', scoreHandler.getScore)


// 导出路由
module.exports = router