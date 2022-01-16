// 实例化路由对象
const express = require('express')
const router = express.Router()

const sortHandler = require('../router_handler/sort')

// 查询
router.get('/sortinfo', sortHandler.getSortInfo)

// 添加
router.post('/sortAdd', sortHandler.addSort)

// 删除
router.get('/deleteSort/:id', sortHandler.deleteSort)

// 更具ID查询
router.get('/sortinfoByid/:id', sortHandler.getSortInfoById)

// 根据id更新
router.post('/updateSort', sortHandler.updateSortByid)

router.post('/sortinfobyshopid', sortHandler.getSortInfoByshopid)


// 导出路由
module.exports = router