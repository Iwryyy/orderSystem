// 实例化路由对象
const express = require('express')
const router = express.Router()


// 1导入解析 formdata 格式表单数据的包
const multer = require('multer')

// 2导入处理路径的核心模块
const path = require('path')

// 3创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })



// 导入路由处理模块
const foodHandler = require('../router_handler/food')
const { route } = require('./user')

// 测试上传图片
router.post('/test', upload.single('food_pic'), foodHandler.AAAfood)

// 获取菜品信息
router.get('/foodinfo', foodHandler.getFoodInfo)

// 添加菜品
router.post('/addFood', foodHandler.addFood)

// 菜品已售罄
router.get('/deleteFood/:id', foodHandler.deleteFood)

// 根据ID查询
router.get('/foodinfoByid/:id', foodHandler.getFoodInfoById)

// 更新菜品信息
router.post('/updateFood', foodHandler.updateFoodByid)

// 查询菜品
router.post('/foodinfo', foodHandler.getFoodInfobyshopid)

// 测试
router.post('/text', foodHandler.text)

// 加分
router.post('/scoreAdd', foodHandler.scoreAdd)

// 从分数高到低获取菜品
router.get('/foodinfoPM', foodHandler.getFoodInfoPM)

// 导出路由
module.exports = router