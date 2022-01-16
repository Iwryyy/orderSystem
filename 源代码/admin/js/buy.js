$(function() {
    var price = []
    var food_price;
    var shop_id = getUrlParam('shop_id')
    initBuy()

    // 返回按钮
    $('.back').click(function() {
        location.href = 'shop_food.html' + '?id=' + shop_id
    })

    // tab栏选择订单模式
    $('.tab>div').click(function() {
        $(this).addClass('current')
        $(this).siblings('div').removeClass('current')
    })

    // 下单按钮
    $('#orderbtn').click(function() {
        var order_type = $('.current').children('.index').data().val
        var food_id = getUrlParam('id')
        var admin_address = $('#address').val()
        var admin_phone = $('#phone').val()
        var tip = $('#tip').val()
        var food_num = getUrlParam('num')
        var shop_id = getUrlParam('shop_id')
        var data = {
                order_type: order_type,
                food_id: food_id,
                food_num: food_num,
                admin_phone: admin_phone,
                admin_address: admin_address,
                tip: tip,
                shop_id: shop_id,
                food_price: food_price,
            }
            // console.log(order_type);
            // console.log('--------------');
            // console.log(food_id);
            // console.log('--------------');
            // console.log(admin_address);
            // console.log('--------------');
            // console.log(admin_phone);
            // console.log('--------------');
            // console.log(tip);
            // console.log('--------------');
            // console.log(food_num);
        $.ajax({
            method: 'POST',
            url: '/my/addOrder',
            data: data,
            success: function(res) {
                alert('支付成功')
                location.href = 'inform.html'
                addScore()
            }
        })
    })

    // 增加热销分数
    function addScore() {
        var Id = getUrlParam('id')
        var num = getUrlParam('num')
        var idArray = Id.split(',')
        var numArray = num.split(',')
        for (var i = 0; i < numArray.length; i++) {
            console.log(idArray[i]);
            console.log(numArray[i]);
            for (var j = 0; j < numArray[i]; j++) {
                $.ajax({
                    method: 'POST',
                    url: '/my/scoreAdd',
                    data: { id: idArray[i] },
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        console.log(res.message);
                    }
                })
            }
        }
    }

    // 渲染店铺名字
    function shopName() {
        var shop_id = getUrlParam('shop_id')
        $.ajax({
            method: 'POST',
            url: '/my/shopinfoByid',
            data: { id: shop_id },
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log('--------------');
                console.log(res.data.nickname);
                $('.shopname').html(res.data.nickname)
                $('#money').html(res.data.PeiS)
                allMoney()

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

    // 初始化已下单的

    function initBuy() {
        var Id = getUrlParam('id')
        var num = getUrlParam('num')
        console.log(Id.split(','));
        console.log(num.split(','));
        var idArray = Id.split(',')
        var numArray = num.split(',')
        for (var i = 0; i < idArray.length; i++) {
            $.ajax({
                method: 'GET',
                url: '/my/foodinfoByid/' + idArray[i],
                success: function(res) {
                    console.log(res);
                    console.log(res.data.food_name);
                    console.log(res.data.food_price);
                    price.push(res.data.food_price)
                    var htmlStr = template('tpl-table', res.data)
                    $('.foodbuy').append(htmlStr)
                    numChange()
                    shopName()
                }
            })


        }
        console.log(price);

    }

    // 更换数量的方法
    function numChange() {
        var num = getUrlParam('num')
        var numArray = num.split(',')
        $.each($('.num'), function(i, ele) {
            console.log(i);
            console.log(ele);
            var str = 'x' + numArray[i]
            $(ele).html(str)
        })
    }

    // 总价格
    function allMoney() {
        var Id = getUrlParam('id')
        var num = getUrlParam('num')
        var idArray = Id.split(',')
        var numArray = num.split(',')
        var num = 0;
        num = num + Number($('#money').html()) + 1
        for (var i = 0; i < price.length; i++) {
            var total = 0
            total = price[i] * numArray[i]
            num += total
        }
        // num += Number($('#price').text().slice(1))
        food_price = num
        $('#total').html('实付款￥' + num)
    }
})