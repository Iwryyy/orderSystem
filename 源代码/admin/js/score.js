$(function() {
    var score1;
    var score2;
    var score3;
    var shop_id = getUrlParam('id')
    var orderid = getUrlParam('order')

    shopName()
    $('.back').click(function() {
        window.history.back()
    })


    // 星星功能
    $(".mark ul li a").on("click", function() {
        //判断是全星点还是半星点，修改当前标签的父标签li的class为对应的星星图像
        if (parseInt($(this).html()) % 2 == 1) {
            $(this).parent().attr("class", "halfStar");
        } else {
            $(this).parent().attr("class", "fullStar");
        }
        //对前方的星星进行处理，遍历前方的li使背景图均变为全星
        var prev = $(this).parent();
        for (var i = 0; i <= (parseInt($(this).html()) / 2) - 1; i++) {
            prev.prev().attr("class", "fullStar");
            prev = prev.prev();
        }
        //对后方星星进行处理，遍历后面的li使背景图均变为空星
        var after = $(this).parent();
        for (var i = 0; i <= (5 - parseInt($(this).html()) / 2) - 1; i++) {
            after.next().attr("class", "emptyStar");
            after = after.next();
        }
        var str = $(this).parents('.mark').siblings('span').html()
        var score = $(this).html()
        switch (str) {
            case '总体：':
                score1 = score
                break;
            case '口味：':
                score2 = score
                break;
            case '配送：':
                score3 = score
                break;
        }
    })

    $('.btn').click(function() {
        var dataInfo = {
            total: score1,
            food: score2,
            deliver: score3,
            shop_id: shop_id,
            miaoSu: $('.form-control').val()
        }
        $.ajax({
            method: 'POST',
            url: '/my/addScore',
            data: dataInfo,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                isPL()
                window.location.href = 'inform.html'
            }
        })

    })

    function isPL() {
        $.ajax({
            method: 'POST',
            url: '/my/isPingLun',
            data: { id: orderid },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // window.location.href = 'inform.html'
            }
        })
    }

    // 渲染店铺名字
    function shopName() {
        $.ajax({
            method: 'POST',
            url: '/my/shopinfoByid',
            data: { id: shop_id },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log('--------------');
                // console.log(res.data.nickname);
                $('#shopname').html(res.data.nickname)
                var str1 = 'images/' + res.data.shop_pic + '.png'
                    // console.log(str1);
                $('.img').prop('src', str1)
            }
        })
    }

    // 复制 接受另一个页面传的值
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
})