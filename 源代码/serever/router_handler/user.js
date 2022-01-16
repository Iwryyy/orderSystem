// 1.入数据库操作模块
const db = require('../db/index')

// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')


// 注册用户的处理函数
exports.regUser = (req, res) => {
    // 接受表单数据
    const userinfo = req.body

    // 判断数据是否合法
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名或密码不能为空！')
    }
    // 2.定义 SQL 语句
    const sql = `select * from user where username = ?`

    // 3.执行 SQL 语句并根据结果判断用户名是否被占用：
    db.query(sql, [userinfo.username], function(err, results) {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err.message)
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        // TODO: 用户名可用，插入新用户

        const sql = 'insert into user set ?'

        db.query(sql, { username: userinfo.username, password: userinfo.password }, function(err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(err.message)
                // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试！')
            }
            // 注册成功
            res.cc('注册成功', 0)
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    const userinfo = req.body

    const sql = `select * from user where username=?`

    db.query(sql, userinfo.username, function(err, results) {

        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！')

        // TODO：判断用户输入的登录密码是否和数据库中的密码一致
        if (userinfo.password !== results[0].password) {
            return res.cc('密码错误，登陆失败')
        }

        // TODO：登录成功，生成 Token 字符串
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, phone 这四个属性的值
        const user = {...results[0], password: '', user_pic: '' }

        // 导入配置文件
        const config = require('../config')

        // 生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', // token 有效期为 10 个小时
        })

        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })

    })
}