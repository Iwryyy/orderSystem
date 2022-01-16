$(function() {
    initArtCateList()
        // var layer = layui.layer
        // var form = layui.form

    // 获取订单列表
    function initArtCateList() {
        $.ajax({
            method: 'POST',
            url: '/my/getOrderByPL',
            success: function(res) {
                console.log(res);
                var htmlStr = template('tpl-table', res)
                $('#ul').html(htmlStr)
                    //遍历每一个li订单 然后逐个初始化名字
                $.each($('#ul').children('li'), function(i, ele) {
                    // console.log($(this), i);
                    var num = $(this).find('#NUM').html().split(',')
                    var total = 0
                    for (var i = 0; i < num.length; i++) {
                        total = total + Number(num[i])
                    }
                    $(this).find('#NUM').html(total)
                    console.log('数量' + num);
                    var temp = $(this).find('#foodid').html()
                        // console.log(temp);
                    var that = $(this)
                    initStatus(that)
                    initname(that)
                })

            }
        })
    }

    function initStatus(that) {
        var status = Number(that.find('#orderStatus').html())
            // console.log(status);
        var orderStatus = Number(that.find('#orderType').val())
            // console.log('订单类型：' + orderStatus);
        var str0 = '订单已提交'
        var str1 = '商家已接单'
        var str2_1 = '配送中'
        var str2_2 = '待领取'
        var str3 = '订单已完成'

        switch (status) {
            case 0:
                that.find('#orderStatus').html(str0)
                    // console.log('换点啦');
                break;
            case 1:
                that.find('#orderStatus').html(str1)

                break;
            case 2:
                if (orderStatus === 2) {
                    that.find('#orderStatus').html(str2_1)

                } else {
                    that.find('#orderStatus').html(str2_2)

                }
                break;
            case 3:
                that.find('#orderStatus').html(str3)

                break;
        }
    }

    function initname(that) {

        // 获取商店名字
        var id = that.find('#shop_id').html()

        // console.log(shop_id);
        $.ajax({
            method: 'POST',
            url: '/my/shopinfoByid',
            data: { id: id },
            success: function(res) {
                that.find('#shop_id').html(res.data.nickname)
                var str22 = 'images/' + res.data.shop_pic + '.png'

                that.find('.img').children('img').prop('src', str22)
            }
        })

        // 获取菜品名字
        var Id = that.find('#foodid').html()
        console.log(Id);
        var idArray = Id.split(',')

        var str2 = ' ';
        for (var i = 0; i < idArray.length; i++) {
            $.ajax({
                method: 'GET',
                url: '/my/foodinfoByid/' + idArray[i],
                success: function(res) {
                    var str1 = res.data.food_name
                    str2 += str1 + ' ';
                    console.log(str2);
                    that.find('#foodid').html(str2)


                }
            })
        }


        // $.ajax({
        //     method: 'GET',
        //     url: '/my/foodinfoByid/' + Id,
        //     success: function(res) {
        //         that.find('#foodid').html(res.data.food_name)
        //     }
        // })
    }

    $('.back').click(function() {
        window.location.href = 'user.html'
    })


    $('ul').on('click', '.more', function() {
        // console.log($(this));
        // console.log($(this).attr("data-num"));
        var id = $(this).attr("data-id")
        var num = $(this).attr("data-num")
        var order = $(this).attr("data-order")
        window.location.href = 'MAXinform.html?' + 'id=' + id + '&num=' + num + '&orderId=' + order;
    })

    $('ul').on('click', '.dianPing', function() {
        var iid = $(this).attr("data-shop")
        var oorder = $(this).attr("data-order")
            // console.log(id);
        window.location.href = 'score.html?' + 'id=' + iid + '&order=' + oorder
    })


    // $('#more').click(function() {
    //     console.log($(this).attr("data-id"));
    // })
})