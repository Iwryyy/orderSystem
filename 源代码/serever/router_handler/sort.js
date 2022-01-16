const db = require('../db/index')

// 查询菜品分类信息
exports.getSortInfo = (req, res) => {
    const sql = `select * from my_db_02.food_sort where shop_id=? and is_delete=0`

    db.query(sql, req.user.id, (err, results) => {
        // 执行sql失败
        if (err) return res.cc(err)

        // 查询的数据条数不等于1
        if (results.length < 1) return res.cc('获取菜品信息失败！')

        console.log(req.user.id);

        // 将菜品信息相应给客户端
        res.send({
            status: 0,
            message: '获取菜品分类信息成功',
            data: results
        })
    })
}

// 添加菜品分类
exports.addSort = (req, res) => {

    const sql = `select * from my_db_02.food_sort where shop_id=? and name=?`

    db.query(sql, [req.user.id, req.body.name], (err, results) => {
        if (err) return res.cc(err)
        if (results.length >= 1) return res.cc('菜品分类已存在')

        // todo:添加菜品分类
        const sql = `insert into my_db_02.food_sort set ?`
        db.query(sql, {...req.body, shop_id: req.user.id, }, (err, results) => {
            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('新增菜品分类失败!')

            res.cc('新增菜瓶分类成功', 0)
        })
    })

}

// 删除菜品分类
exports.deleteSort = (req, res) => {
    const sql = `update my_db_02.food_sort set is_delete=1 where id=? `

    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('删除菜品失败')

        res.cc('删除菜品成功', 0)
    })
}

// 根据ID获取商品分类
exports.getSortInfoById = (req, res) => {
    const sql = `select * from my_db_02.food_sort where id=?`

    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.cc('获取分类数据失败！')

        // 把数据响应给客户端
        res.send({
            status: 0,
            message: '获取分类数据成功！',
            data: results[0],
        })
    })
}

exports.updateSortByid = (req, res) => {
    const sql = `select * from my_db_02.food_sort where shop_id=? and name=?`
    db.query(sql, [req.user.id, req.body.name], (err, results) => {
        if (err) return res.cc(err)
        if (results.length >= 1) return res.cc('菜品分类已存在')

        const sql = `update my_db_02.food_sort set name=? where id=?`

        db.query(sql, [req.body.name, req.body.id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败aaaa！')

            // 更新文章分类成功
            res.cc('更新文章分类成功！', 0)
        })
    })
}

// 根据id查询菜品分类信息
exports.getSortInfoByshopid = (req, res) => {
    const sql = `select * from my_db_02.food_sort where shop_id=? and is_delete=0`

    db.query(sql, req.body.id, (err, results) => {
        // 执行sql失败
        if (err) return res.cc(err)

        // 查询的数据条数不等于1
        if (results.length < 1) return res.cc('获取菜品信息失败！')

        console.log(req.user.id);

        // 将菜品信息相应给客户端
        res.send({
            status: 0,
            message: '获取菜品分类信息成功',
            data: results
        })
    })
}