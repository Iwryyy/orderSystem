$(function() {
    var temp = getUrlParam('id')
    var dataTemp = { data: [] }
    initshop()

    $('.td1').on('click', 'li', function() {
        id = $(this).siblings('#id').val()
        console.log($(this));
        location.href = 'shop_food.html' + '?id=' + id
    })

    $('.back').click(function() {
        location.href = 'food.html'
    })

    function initshop() {
        $.ajax({
            method: 'GET',
            url: '/my/allshopinfo',
            success: function(res) {
                console.log(res);
                $.each(res.data, function(i, ele) {
                    console.log(ele);
                    if (Number(ele.fenLei) == temp) {
                        dataTemp.data.push(ele)
                    }

                })
                console.log(dataTemp);
                var htmlStr = template('tpl-table', dataTemp)
                $('.td1').html(htmlStr)
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