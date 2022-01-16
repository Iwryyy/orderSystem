// 导入数据库操作模块
const db = require('../db/index')

// 获去商家信息的处理函数
exports.getShopInfo = (req, res) => {
    // 根据商家的id查询信息
    // 注意：为了防止用户的密码泄露，需要排除 password 字段
    const sql = `select id,username,nickname,phone,adress,shop_pic,qiS,PeiS,gongGao  from shop where id=?`

    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, req.user.id, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取商家信息失败！')

        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取商家基本信息成功！',
            data: results[0],
        })
    })
}

// 更新商家基本信息的处理函数
exports.updateShopInfo = (req, res) => {
    const sql = `update shop set ? where id=?`

    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改商家基本信息失败！')

        // 修改用户信息成功
        return res.cc('修改商家基本信息成功！', 0)
    })

}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {

    const sql = 'update shop set shop_pic=? where id=?'

    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新头像失败！')

        // 更新用户头像成功
        return res.cc('更新头像成功！', 0)
    })
}

exports.getShopInfobyid = (req, res) => {
    // 根据商家的id查询信息
    // 注意：为了防止用户的密码泄露，需要排除 password 字段
    const sql = `select id,username,nickname,phone,adress,shop_pic,qiS,PeiS,gongGao from my_db_02.shop where id=?`

    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, req.body.id, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取商家信息失败！')

        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取商家基本信息成功！',
            data: results[0],
        })
    })
}

// 获取所有商家信息
exports.getAllShopInfo = (req, res) => {
    // 根据商家的id查询信息
    // 注意：为了防止用户的密码泄露，需要排除 password 字段
    const sql = `select id,username,nickname,phone,adress,shop_pic,fenLei,qiS,PeiS from shop`

    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length < 1) return res.cc('获取商家信息失败！')

        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取商家基本信息成功！',
            data: results,
        })
    })
}