window.addEventListener('load', function() {
    var qiS;
    // alert(1);
    // 距离顶部的值、页面滚动了的值
    // 当二值相等的时候 改为固定定位

    // 获取元素
    var th = document.querySelector('.th');
    var tleft = document.querySelector('.tLeft')
    var tRight = document.querySelector('.tRight')
    var header = document.querySelector('header')
    var jianjie = document.querySelector('.jianjie');
    var flag = false;

    document.addEventListener('scroll', function() {
        var top = jianjie.offsetTop + jianjie.offsetHeight - header.offsetHeight;
        // var top = th.offsetTop
        // console.log(th.offsetTop);
        if (window.pageYOffset >= top) {
            th.classList.add('thfix');
            tleft.style.position = 'fixed';
            tleft.style.top = '1.84rem'
            tRight.style.marginTop = '.306667rem'
            flag = true;

        } else {
            // console.log(1);
            th.classList.remove('thfix');
            tleft.style.position = '';
            tleft.style.top = ''
            tRight.style.marginTop = ''
            flag = false;
        }

    })

    //点击显示购物车
    $('footer .tl,.login-bg').on('click', function() {
        $('.buy,.login-bg').toggle();
    })

    //tab栏切换
    $('.th').children().on('click', function() {
        $(this).addClass('xZ').siblings().removeClass('xZ')
            // $(this).addClass("current").siblings().removeClass('current');
        var index = $(this).index();
        // console.log(index);
        $(".td>div").eq(index).show().siblings().hide();
    })




    // 电梯导航
    $('.tLeft>ul').on('click', 'li', function() {
        // console.log($(this).index());
        var index = $(this).index()
        var current = $('.tRight>div').eq(index).offset().top - $('header').height() - $('.th').height()
            // console.log(current);
        if (!flag) {
            current = $('.tRight>div').eq(index).offset().top - $('header').height() - $('.th').height() - $('.list').height()
        } else {
            current = $('.tRight>div').eq(index).offset().top - $('header').height() - $('.th').height()
        }
        // console.log(1);
        $('body,html').stop().animate({
            scrollTop: current
        });
        $(this).addClass("current").siblings().removeClass("current");

    })


    // 情况购物车
    $('.clear').click(function() {

        $.each($('.jia').siblings('i'), function(i, ele) {
            $(this).html('0')
        })

        $('.buyList').html(' ')
        $('.money').html("￥00.00");
    })

    // 购物车

    // 当数值>0时，获取食品的id，利用ajax调用后台数据渲染购物车
    var all;
    var ADDtemp;
    $('body').on('click', '.jia', function() {
        // 渲染页面前先清空，然后页面上所有大于0的就渲染
        all = 0
        ADDtemp = 0
        $('.buyList').empty()

        // 获取当前点击键的兄弟的值，且赋值给它
        var n = $(this).siblings('i').html()
        n++
        $(this).siblings('i').html(n)

        // 遍历每个i属性 数量
        $.each($('.jia').siblings('i'), function(i, ele) {
            // 将大于0再遍历一次
            if ($(ele).html() > 0) {
                $.each($(ele), function(j, elem) {
                    var that = $(elem)
                    appendList(that)
                    ADDtemp += all
                })
            }
        })
        $('.money').html("￥" + ADDtemp.toFixed(2));
        console.log(ADDtemp);

    })

    // 渲染buyList页面
    function appendList(that) {
        // 获取每个值
        var foodid = that.parent().siblings('#foodid').val()
        var foodnum = that.html()
        var foodname = that.parent().siblings('#myName').html()
        var foodprice = that.parent().siblings('.price').children('span').html()
        all = foodnum * foodprice.slice(1)

        // 渲染
        var div = document.createElement('div');
        div.className = 'buy-list';
        div.innerHTML = `<input id='buyid' type="hidden" name="id" value="${foodid}"><span class="myName">${foodname}</span>
                    <span class="myPrice">${foodprice}</span>
                    <span class="myNumber">${foodnum}</span>`

        $('.buyList').append(div);
        // getSum();

    }

    var DELETEtemp
        // 数值 < 0 购物车的这条信息就删除
    $('body').on('click', '.jian', function() {

        // 渲染页面前先清空，然后页面上所有大于0的就渲染
        all = 0
        DELETEtemp = 0
        $('.buyList').empty()

        // 获取当前点击键的兄弟的值，且赋值给它
        var n = $(this).siblings('i').html()
        if (n > 0) {
            n--
        }
        $(this).siblings('i').html(n)

        // 遍历每个i属性 数量
        $.each($('.jian').siblings('i'), function(i, ele) {
            // 将大于0再遍历一次
            if ($(ele).html() > 0) {
                $.each($(ele), function(j, elem) {
                    var that = $(elem)
                    appendList(that)
                    DELETEtemp += all
                })
            }
        })
        $('.money').html("￥" + DELETEtemp.toFixed(2));
    })

    // 返回按钮
    $('.back').click(function() {
            location.href = 'food.html'
        })
        // 下单按钮
    $('footer .tr').click(function() {
        var shop_id = getUrlParam('id')
        if (Number($('.money').html().slice(1)) < qiS) {
            return alert('还不够起送价噢')
        }

        var ID = [];
        var NUM = [];
        var s1 = null;
        var s2 = null;
        $.each($('.buy-list'), function(i, ele) {
            console.log($(ele).find('.myNumber').html());
            // 获取每个食品id和数量，并把它添加到数组，最后数组转换为字符串
            var tempId = $(ele).find('#buyid').val()
            var tempNUM = $(ele).find('.myNumber').html()
            ID.push(tempId)
            NUM.push(tempNUM)
            s1 = ID.toString();
            s2 = NUM.toString();

        })

        location.href = 'buy.html' + '?id=' + s1 + '&num=' + s2 + '&shop_id=' + shop_id
    })


    initShopInfo()
    initSortInfo()
        // 渲染页面
    function initShopInfo() {
        var Id = getUrlParam('id')
        console.log(Id);
        $.ajax({
            method: 'POST',
            url: '/my/shopinfoByid',
            data: { id: Id },
            success: function(res) {
                console.log(res);
                console.log(res.data.nickname);
                var htmlStr = template('tpl-table', res.data)
                $('.jianjie').html(htmlStr)
                qiS = res.data.qiS
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

    // 分类渲染
    function initSortInfo() {
        var Id = getUrlParam('id')
        $.ajax({
            method: 'POST',
            url: '/my/sortinfobyshopid',
            data: { id: Id },
            success: function(res) {
                console.log(res);
                // console.log(res.data.nickname);
                initClass(res)
                var htmlStr = template('tl-table', res)
                $('#tl').html(htmlStr)
                nameQH()
                initfood()
            }
        })
    }

    // 有多少个数据生成多少个class
    function initClass(obj) {
        $.each(obj.data, function(i, ele) {
            var div = document.createElement('div')
            div.className = 'class'
            div.innerHTML = `<p class="list">测试</p>
            <div id="shop_food">
            </div>`
            $('.tRight').append(div)
        })
    }

    // 名字切换
    function nameQH() {

        $.each($('.class'), function(i, ele) {
            var mnanme = $('.tLeft>ul').children('li').eq(i).html()
            console.log(mnanme);
            $('.class').eq(i).children('.list').html(mnanme)
        })


    }


    // 渲染菜品
    function initfood() {
        var Id = getUrlParam('id')
        $.ajax({
            method: 'POST',
            url: '/my/foodinfo',
            data: { id: Id },
            success: function(res) {
                // console.log('-------------');
                // console.log(res);
                foodSort(res)
            }
        })
    }

    // 菜品分类排方法
    function foodSort(res) {
        // 遍历得到数据的菜品的分类出来
        $.each(res.data, function(i, ele) {
                var foodName = ele.food_name
                var foodSort = ele.food_sort
                var data = $(this)
                console.log(data);
                // 遍历已有的分类
                $.each($('.list'), function(i, ele) {
                    // 如果两个的值相等说明同一个分类
                    if (foodSort == $(ele).text()) {
                        // console.log(foodName);
                        // console.log($(ele).text());
                        var htmlStr = template('food-table', data[0])
                        $(this).siblings('#shop_food').append(htmlStr)
                    }
                })
                console.log('===============');
            })
            // 分类属于哪个就放到哪个盒子
    }


    intiScore()

    // 初始化评论
    function intiScore() {
        ID = getUrlParam('id')
        console.log(ID);
        $.ajax({
            method: 'POST',
            url: '/my/getScore',
            data: { id: ID },
            success: function(res) {
                console.log(res);
                var htmlStr = template('score-table', res)
                $('#lY').html(htmlStr)
                initStar()

                // 更改用户名
                $.each($('.Puser'), function(i, ele) {
                    $.ajax({
                        method: 'POST',
                        url: '/my/UserInfobyid/',
                        data: { id: $(ele).html() },
                        success: function(res) {
                            console.log($(ele).html());
                            console.log('----------------');
                            console.log(res);
                            if (res.data.nickname != null) {
                                $(ele).html(res.data.nickname)
                            } else {
                                $(ele).html(res.data.username)
                            }
                        }
                    })
                })
            }
        })
    }

    // 初始化星星
    function initStar() {
        // 遍历input值 代码触发点击事件
        $.each($('li a'), function(i, ele) {
            var score = $(ele).parents('.mark').siblings('input').val()
            console.log(score);
            if ($(ele).html() == score) {
                console.log($(ele));
                //判断是全星点还是半星点，修改当前标签的父标签li的class为对应的星星图像
                if (parseInt($(this).html()) % 2 == 1) {
                    $(this).parent().attr("class", "halfStar");
                } else {
                    $(this).parent().attr("class", "fullStar");
                }
                //对前方的星星进行处理，遍历前方的li使背景图均变为全星
                var prev = $(ele).parent();
                for (var i = 0; i <= (parseInt($(ele).html()) / 2) - 1; i++) {
                    prev.prev().attr("class", "fullStar");
                    prev = prev.prev();
                }
            }
        })
    }

    function pinlunName() {

    }

    // $(".mark ul li a").one("click", function() {
    //     // console.log(111111);
    //     //判断是全星点还是半星点，修改当前标签的父标签li的class为对应的星星图像
    //     if (parseInt($(this).html()) % 2 == 1) {
    //         $(this).parent().attr("class", "halfStar");
    //     } else {
    //         $(this).parent().attr("class", "fullStar");
    //     }
    //     //对前方的星星进行处理，遍历前方的li使背景图均变为全星
    //     var prev = $(this).parent();
    //     for (var i = 0; i <= (parseInt($(this).html()) / 2) - 1; i++) {
    //         prev.prev().attr("class", "fullStar");
    //         prev = prev.prev();
    //     }
    //     //对后方星星进行处理，遍历后面的li使背景图均变为空星
    //     var after = $(this).parent();
    //     for (var i = 0; i <= (5 - parseInt($(this).html()) / 2) - 1; i++) {
    //         after.next().attr("class", "emptyStar");
    //         after = after.next();
    //     }
    // })
})