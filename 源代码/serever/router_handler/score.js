const db = require('../db/index')

// 用户添加评论
exports.addScore = (req, res) => {
    const sql = `insert into my_db_02.shop_score set ?`


    const scoreInfo = {
        // 标题、内容、状态、所属的分 类Id
        ...req.body,
        time: new Date(),
        // 文章作者的Id
        admin_id: req.user.id,
    }

    // 执行 SQL 语句
    db.query(sql, scoreInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('评论失败！')

        // 发布文章成功
        res.cc('评论成功', 0)
    })
}

// 根据商家ID查看评论
exports.getScore = (req, res) => {
    const sql = `SELECT * FROM my_db_02.shop_score where shop_id =?`

    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: '获取评论信息成功',
            data: results
        })
    })
}