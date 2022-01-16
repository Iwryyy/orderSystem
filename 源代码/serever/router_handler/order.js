// 导入数据库操作模块
const db = require('../db/index')

// 生成订单
exports.Addorder = (req, res) => {

    const sql = `insert into my_db_02.order set ?`


    const orderInfo = {
        // 时间
        created: new Date(),
        // 标题、内容、状态、所属的分 类Id
        ...req.body,
        // 文章作者的Id
        admin_id: req.user.id,
    }

    // 执行 SQL 语句
    db.query(sql, orderInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('创建订单失败！')

        // 发布文章成功
        res.cc('创建订单成功', 0)
    })
}

// 根据商店ID查询订单
exports.GetorderByShop = (req, res) => {
    const sql = `select * from my_db_02.order where shop_id=?`
    db.query(sql, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 查询的数据条数不等于1
        if (results.length < 1) return res.cc('获取订单信息失败！')

        // 将菜品信息相应给客户端
        res.send({
            status: 0,
            message: '商家查询订单信息成功',
            data: results
        })

    })
}


// 根据用户ID查询订单
exports.GetorderByUser = (req, res) => {
    const sql = `select * from my_db_02.order where admin_id=? order by id desc`
    db.query(sql, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 查询的数据条数不等于1
        if (results.length < 1) return res.cc('获取订单信息失败！')

        // 将菜品信息相应给客户端
        res.send({
            status: 0,
            message: '用户查询订单信息成功',
            data: results
        })

    })
}

// 根据id查询
exports.GetorderById = (req, res) => {
    const sql = `select * from my_db_02.order where id=?`

    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.cc('获取zhege数据失败！')

        // 把数据响应给客户端
        res.send({
            status: 0,
            message: '获取zhege数据成功！',
            data: results[0],
        })
    })
}

exports.DeleteOrder = (req, res) => {
    const sql = `update my_db_02.order set status=? where id=? `

    db.query(sql, [req.body.status, req.body.id], (err, results) => {
        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('处理订单失败')

        res.cc('处理订单成功', 0)
    })
}

// 待评价的订单
exports.GetorderNoPL = (req, res) => {
    const sql = `select * from my_db_02.order where admin_id=? and is_pingLun=0 order by id desc`
    db.query(sql, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 查询的数据条数不等于1
        if (results.length < 1) return res.cc('获取订单信息失败！')

        // 将菜品信息相应给客户端
        res.send({
            status: 0,
            message: '用户查询订单信息成功',
            data: results
        })

    })
}


exports.is_pingL = (req, res) => {
    const sql = `update my_db_02.order set is_pingLun=1 where id = ?`
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('设置已经评论失败')
        res.cc('设置已经评论成功', 0)

    })
}