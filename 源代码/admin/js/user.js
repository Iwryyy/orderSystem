 // 点击之后 高度增加 div显示出来 图标变了 其他兄弟就关闭
 $(function() {


     getUserInfo()

     var layer = layui.layer

     // 点击按钮，实现退出功能
     $('#loginOut').on('click', function() {
         // 提示用户是否确认退出
         layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
             //do something
             // 1. 清空本地存储中的 token
             localStorage.removeItem('token')
                 // 2. 重新跳转到登录页面
             location.href = '/login.html'

             // 关闭 confirm 询问框
             layer.close(index)
         })
     })



     $('.back').click(function() {
         window.location.href = 'index.html'
     })

     $('#sheZhi').click(function() {
         window.location.href = 'sheZhi.html'
     })

     $('#pJ').click(function() {
         window.location.href = 'daiPL.html'
     })
 })

 // 获取用户的基本信息
 function getUserInfo() {
     $.ajax({
         method: 'GET',
         url: '/my/userinfo',
         // headers 就是请求头配置对象
         //  headers: {
         //      Authorization: localStorage.getItem('token') || ''
         //  },
         success: function(res) {
             if (res.status !== 0) {
                 return layui.layer.msg('获取用户信息失败！')
             }
             // 调用 renderAvatar 渲染用户的头像
             renderAvatar(res.data)
         },
         // 不论成功还是失败，最终都会调用 complete 回调函数
         //  complete: function(res) {
         //      // console.log('执行了 complete 回调：')
         //      // console.log(res)
         //      // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
         //      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
         //          // 1. 强制清空 token
         //          localStorage.removeItem('token')
         //              // 2. 强制跳转到登录页面
         //          location.href = '/login.html'
         //      }
         //  }
     })
 }

 // 渲染用户的头像
 function renderAvatar(user) {
     // 1. 获取用户的名称
     var name = user.nickname || user.username
         // 2. 设置欢迎的文本
     $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
         // 3.2 渲染文本头像
     var first = name[0].toUpperCase()
     $('.user-img')
         .html(first)
         .show()
 }





 //  window.addEventListener('load', function() {
 //      var footerLi = document.querySelectorAll("footer ul li");
 //      footerLi[0].addEventListener('click', function() {
 //          window.location.href = "index.html";
 //      })
 //      footerLi[1].addEventListener('click', function() {
 //          window.location.href = "inform.html";
 //      })
 //  });