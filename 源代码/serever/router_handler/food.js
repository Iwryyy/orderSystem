// 导入数据库
const res = require('express/lib/response')
const db = require('../db/index')
const path = require('path')


// 查询菜品
exports.getFoodInfo = (req, res) => {
    // 根据商家的id查询商品

    const sql = `select * from shop_food where shop_id=? and is_delete=0`

    db.query(sql, req.user.id, (err, results) => {
        // 执行sql失败
        if (err) return res.cc(err)

        // 查询的数据条数不等于1
        // if (results.length < 1) return res.cc('获取菜品信息失败！')

        // console.log(req.user.id);

        // 将菜品信息相应给客户端
        res.send({
            status: 0,
            message: '获取菜品信息成功',
            data: results
        })
    })
}

// 查询菜品
exports.getFoodInfobyshopid = (req, res) => {
    // 根据商家的id查询商品

    const sql = `select * from shop_food where shop_id=? and is_delete=0 and status=0`

    db.query(sql, req.body.id, (err, results) => {
        // 执行sql失败
        if (err) return res.cc(err)

        // 查询的数据条数不等于1
        // if (results.length < 1) return res.cc('获取菜品信息失败！')

        console.log(req.user.id);

        // 将菜品信息相应给客户端
        res.send({
            status: 0,
            message: '获取菜品信息成功',
            data: results
        })
    })
}

// 添加菜品
exports.addFood = (req, res) => {
    // 查询菜品名字是否被占用
    const sql = `select * from shop_food where food_name=?`

    db.query(sql, [req.body.food_name], (err, results) => {
        if (err) return res.cc(err)
            // if (results.length == 1) return res.cc('获取菜品信息失败！')
        if (results.length === 1 && results[0].food_name === req.body.food_name) return res.cc('菜品名字被占用')

        // TODO:插入菜品
        const sql = `insert into shop_food set ?`
        db.query(sql, {...req.body, shop_id: req.user.id, }, (err, results) => {
            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('新增菜品失败!')

            res.cc('新增菜品成功', 0)
        })

    })
}

// 删除菜品（is_delete设置为0）
exports.deleteFood = (req, res) => {
    const sql = `update shop_food set is_delete=1 where id=? `

    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('删除菜品失败')

        res.cc('删除菜品成功', 0)
    })
}

exports.getFoodInfoById = (req, res) => {
    const sql = `select * from my_db_02.shop_food where id=?`

    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.cc('获取cai数据失败！')

        // 把数据响应给客户端
        res.send({
            status: 0,
            message: '获取cai数据成功！',
            data: results[0],
        })
    })
}

exports.updateFoodByid = (req, res) => {
    const sql = `select * from shop_food where food_name=?`
    db.query(sql, [req.user.id, req.body.name], (err, results) => {
        if (err) return res.cc(err)
        if (results.length >= 1) return res.cc('菜品已存在')

        const sql = `update my_db_02. shop_food set ? where id=?`

        db.query(sql, [req.body, req.body.id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败aaaa！')

            // 更新文章分类成功
            res.cc('更新文章分类成功！', 0)
        })
    })
}

exports.AAAfood = (req, res) => {
    if (!req.file || req.file.fieldname !== 'food_pic') return res.cc('文章封面是必选参数！')

    // 查询菜品名字是否被占用
    const sql = `select * from shop_food where food_name=?`

    db.query(sql, [req.body.food_name], (err, results) => {
        if (err) return res.cc(err)
            // if (results.length == 1) return res.cc('获取菜品信息失败！')
        if (results.length === 1 && results[0].food_name === req.body.food_name) return res.cc('菜品名字被占用')

        // TODO:插入菜品
        const sql = `insert into shop_food set ?`
        db.query(sql, {...req.body, food_pic: path.join('/uploads', req.file.filename), shop_id: req.user.id, }, (err, results) => {
            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('新增菜品失败!')

            res.cc('新增菜品成功', 0)
        })

    })
}

exports.text = (req, res) => {
    const sql = `select food_pic from shop_food where id=?`

    db.query(sql, req.body.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.cc('获取cai数据失败！')

        // 把数据响应给客户端
        res.send({
            status: 0,
            message: '获取cai数据成功！',
            data: results[0],
        })
    })
}

// score加一
exports.scoreAdd = (req, res) => {
    const sql = `update my_db_02.shop_food set score=score+1 where id = ?`
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('加分失败')
        res.cc('加分成功qaq', 0)

    })
}

exports.getFoodInfoPM = (req, res) => {
    const sql = `SELECT * FROM my_db_02.shop_food where status=0 and is_delete=0 order by score desc  `

    db.query(sql, req.body.id, (err, results) => {
        // 执行sql失败
        if (err) return res.cc(err)

        // 查询的数据条数不等于1
        // if (results.length < 1) return res.cc('获取菜品信息失败！')

        console.log(req.user.id);

        // 将菜品信息相应给客户端
        res.send({
            status: 0,
            message: '获取菜品信息成功',
            data: results
        })
    })
}