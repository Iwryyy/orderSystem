$(function() {
    var price = []
    var foodid = getUrlParam('id')
    var foodnum = getUrlParam('num')
    var orderId = getUrlParam('orderId')

    var foodidArray = foodid.split(',')
    var foodnumArray = foodnum.split(',')
    initBuy()
    initOrder()

    $('.back').click(function() {
        window.location.href = 'inform.html?'
    })

    // 渲染订单信息
    function initOrder() {
        $.ajax({
            method: 'GET',
            url: '/my//GetorderById/' + orderId,
            success: function(res) {
                console.log(res);
                var htmlStr = template('mes-table', res.data)
                $('.mes').html(htmlStr)
                shopName(res.data.shop_id)
                initStatus(res.data.status, res.data.order_type)
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

    // 渲染购买的东西
    function initBuy() {
        for (var i = 0; i < foodidArray.length; i++) {
            $.ajax({
                method: 'GET',
                url: '/my/foodinfoByid/' + foodidArray[i],
                success: function(res) {
                    console.log(res);
                    console.log(res.data.food_name);
                    console.log(res.data.food_price);
                    var htmlStr = template('tpl-table', res.data)
                    $('.foodbuy').append(htmlStr)
                    price.push(res.data.food_price)
                    numChange()
                    allMoney()
                }
            })


        }

    }

    // 渲染店铺名字
    function shopName(shop_id) {
        $.ajax({
            method: 'POST',
            url: '/my/shopinfoByid',
            data: { id: shop_id },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log('--------------');
                console.log(res.data.nickname);
                $('.shopname').html(res.data.nickname)
            }
        })
    }

    // 更换数量的方法
    function numChange() {
        $.each($('.num'), function(i, ele) {
            console.log(i);
            console.log(ele);
            var str = 'x' + foodnumArray[i]
            $(ele).html(str)
        })
    }

    // 总价格
    function allMoney() {
        var num = 0;
        $.each($('.money'), function(i, ele) {
            var temp = Number($(ele).text())
            num += temp
        })
        for (var i = 0; i < price.length; i++) {
            var total = 0
            total = price[i] * foodnumArray[i]
            num += total
        }
        // num += Number($('#price').text().slice(1))
        $('#total').html('实付款￥' + num)
    }

    function initStatus(id, order) {
        id = Number(id)
        order = Number(order)
        var str0 = '订单已提交'
        var str1 = '商家已接单'
        var str2_1 = '配送中'
        var str2_2 = '待领取'
        var str3 = '订单已完成'
        var orderStr0 = '堂食'
        var orderStr1 = '自提'
        var orderStr2 = '外卖'

        switch (id) {
            case 0:
                $('#orderStatus').html(str0)
                console.log('换点啦');
                break;
            case 1:
                $('#orderStatus').html(str1)

                break;
            case 2:
                if (order === 2) {
                    $('#orderStatus').html(str2_1)

                } else {
                    $('#orderStatus').html(str2_2)

                }
                break;
            case 3:
                $('#orderStatus').html(str3)

                break;
        }

        switch (order) {
            case 0:
                $('#order_type').html(orderStr0)
                break;
            case 1:
                $('#order_type').html(orderStr1)
                break;
            case 2:
                $('#order_type').html(orderStr2)
                break;
        }
    }
})