$(function() {
    // 页面跳转
    // window.addEventListener('load', function() {
    //     var swiper = new Swiper('.swiper-container');
    //     var footerLi = document.querySelectorAll("footer ul li");
    //     var food = document.querySelector('.food');
    //     var mail = document.querySelector('.mail');
    //     food.addEventListener('click', function() {
    //         window.location.href = "food.html";
    //     })
    //     mail.addEventListener('click', function() {
    //         window.location.href = "mail.html";
    //     })
    //     footerLi[1].addEventListener('click', function() {
    //         window.location.href = "inform.html";
    //     })
    //     footerLi[2].addEventListener('click', function() {
    //         window.location.href = "user.html";
    //     })
    // });
    $('.top').click(function() {
        window.location.href = "food.html";
    })
    $('.user').click(function() {
        window.location.href = "user.html";
    })
    $('.inform').click(function() {
        window.location.href = "inform.html";
    })
    getUserInfo()

    // 获取用户的基本信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers 就是请求头配置对象
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                // 调用 renderAvatar 渲染用户的头像
            }
        })
    }

})