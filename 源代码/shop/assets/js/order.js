$(function() {
    var temp = { data: [] }

    initArtCateList()
    var layer = layui.layer
    var form = layui.form


    // 获取订单列表
    function initArtCateList() {
        temp.data = []
            // console.log('2222');
        $.ajax({
            method: 'POST',
            url: '/my/getOrderByShop',
            success: function(res) {
                $.each(res.data, function(i, ele) {
                    if (ele.status != 3) {
                        temp.data.push(ele)

                    }
                })
                var htmlStr = template('tpl-table', temp)
                $('tbody').html(htmlStr)
                intiname()
            }
        })
    }

    var indexMore = null

    // 通过代理形式为btn-more按钮绑定点击事件
    $('body').on('click', '.btn-more', function() {
        indexMore = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '订单详情',
            content: $('#dialog-more').html()
        })

        var id = $(this).attr('data-id')
            // 发起请求获取对应分类的数据

        $.ajax({
            method: 'GET',
            url: '/my/GetorderById/' + id,
            success: function(res) {
                // console.log(res);
                // console.log(id);
                form.val('form-more', res.data)
                    // 获取菜的名字
                var temp = $('#foodIDID').val()
                var idArray = temp.split(',')
                console.log(idArray);
                var str2 = ' ';
                for (var i = 0; i < idArray.length; i++) {
                    $.ajax({
                        method: 'GET',
                        url: '/my/foodinfoByid/' + idArray[i],
                        success: function(res) {
                            var str1 = res.data.food_name
                            str2 += str1 + ' ';
                            console.log(str2);
                            $('#foodIDID').val(str2)

                        }
                    })
                }

            }
        })


    })

    $('body').on('click', '.btn-delete', function() {
        var index = layer.open({
            type: 1,
            area: ['400px', '40x'],
            title: '订单详情',
            content: $('#change').html()
        })

        var id = $(this).attr('data-id')

        $('.Cbox button').click(function() {
            $.ajax({
                method: 'POST',
                url: '/my/DeleteOrder/',
                data: { status: $(this).attr('data-id'), id: id },
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('处理订单成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })

    })

    // $('body').on('click', '.btn-delete', function() {
    //     var id = $(this).attr('data-id')
    //         // 提示用户是否要删除
    //     layer.confirm('确认处理订单?', { icon: 3, title: '提示' }, function(index) {
    //         $.ajax({
    //             method: 'GET',
    //             url: '/my/DeleteOrder/' + id,
    //             success: function(res) {
    //                 if (res.status !== 0) {
    //                     return layer.msg(res.message)
    //                 }
    //                 layer.msg('处理订单成功！')
    //                 layer.close(index)
    //                 initArtCateList()
    //             }
    //         })
    //     })
    // })

    function intiname() {
        $.each($('.hahah'), function(i, ele) {
            // console.log($(ele).find('#dOrder').html())
            if ($(ele).find('#dStatus').html() == 2) {
                if ($(ele).find('#dOrder').html() == '外卖') {
                    $(ele).find('#dStatus').html('配送中')
                } else {
                    $(ele).find('#dStatus').html('待领取')
                }
            }
        })
    }
})