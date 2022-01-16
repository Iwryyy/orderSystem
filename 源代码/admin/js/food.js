$(function() {
    var twotemp = { data: [] }
    var onetemp = { data: [] }
        // 页面跳转
    $('.td1,.td2,.td3').on('click', 'li', function() {
        id = $(this).siblings('#id').val()
        console.log($(this));
        location.href = 'shop_food.html' + '?id=' + id
    })

    $('nav li').on('click', function() {

        location.href = 'shopFenlei.html' + '?id=' + $(this).index()

    })

    $('.uul').on('click', '.lli', function() {
        // console.log();
        location.href = 'shop_food.html' + '?id=' + $(this).find('#FSid').val()

    })

    //copy
    // 优惠轮播图
    var swiper = new Swiper('.uul', {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 30,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    // 通知轮播图
    var swiper = new Swiper('#two', {
        direction: 'vertical',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // 返回按钮
    var fanhui = document.querySelector('.back');
    fanhui.addEventListener('click', function() {
        window.location.href = "index.html";
    })
    $('.user').click(function() {
        location.href = 'user.html'
    })

    // 获取元素
    var th = document.querySelector('.list .th');
    var thTop = th.offsetTop;
    var td1 = document.querySelector('.list .td .td1');

    //tab栏切换
    //点击当前li，它的子元素div获得current类名，其余li的div元素移除类名
    $(".list .th li").click(function() {
        $(this).children("div").addClass("current");
        $(this).siblings().children("div").removeClass("current");
        // 获取当前li的索引号
        var index = $(this).index();
        // 让当前索引号的内容显示出来，其余隐藏
        $(".td>div").eq(index).show().siblings().hide();
        // console.log(twotemp);

        var str = '.td' + Number(index + 1)
            // console.log(str);
        if (index == 1) {
            var htmlStr = template('tpl-table', twotemp)
            $(str).html(htmlStr)
        } else if (index == 2) {
            var htmlStr = template('tpl-table', onetemp)
            $(str).html(htmlStr)
        }


    })

    // 假数据
    // var date = [{
    //     id: 1,
    //     imgSrc: 'images/foot.jpg',
    //     myName: '城市行动汉堡店',
    //     myPlace: '二饭二',
    //     myScore: '4.4',
    //     myClass: '汉堡炸鸡',
    //     peiSF: 7,
    //     qiSF: 3,
    //     myPrice: '199.1',
    //     fakePrice: '621'
    // }, {
    //     id: 2,
    //     imgSrc: 'images/foot.jpg',
    //     myName: '杨国福',
    //     myPlace: '一饭五',
    //     myScore: '4.4',
    //     myClass: '粥粉面饭',
    //     peiSF: 7,
    //     qiSF: 3,
    //     myPrice: '399.1',
    //     fakePrice: '621'
    // }, {
    //     id: 3,
    //     imgSrc: 'images/foot.jpg',
    //     myName: '茶来',
    //     myPlace: '一饭四',
    //     myScore: '4.4',
    //     myClass: '奶茶果汁',
    //     peiSF: 7,
    //     qiSF: 3,
    //     myPrice: '299.1',
    //     fakePrice: '621'
    // }]
    initshop()


    function initshop() {
        $.ajax({
            method: 'GET',
            url: '/my/allshopinfo',
            success: function(res) {
                console.log(res);
                $.each(res.data, function(i, ele) {
                    if (ele.adress.indexOf('二饭') == 0) {
                        twotemp.data.push(ele)
                    } else {
                        onetemp.data.push(ele)
                    }
                })
                var htmlStr = template('tpl-table', res)
                $('.td1').html(htmlStr)
            }
        })
    }

    // // 渲染页面
    // function setDate() {
    //     td1.innerHTML = '';
    //     date.forEach(function(value) {
    //         var li = document.createElement('li');
    //         li.className = 'clearfix';
    //         li.innerHTML = `
    //         <div class="left">
    //         <img src=${value.imgSrc} alt="">
    //     </div>
    //     <div class="right">
    //         <p>${value.myName}</p>
    //         <div class="place">${value.myPlace} <br><span>${value.myScore} | 起送￥${value.qiSF} | 配送￥${value.peiSF}</span></div>
    //         <div class="price"><span>￥${value.myPrice}</span><i>￥${value.fakePrice}</i></div>

    //     </div>`
    //         td1.appendChild(li);
    //     })
    // }
    // setDate();
    initReXiao()



    function initReXiao() {

        var arrTemp = []

        $.ajax({
            method: 'GET',
            url: '/my/foodinfoPM',
            success: function(res) {
                // console.log('第一次第二次');
                for (var i = 0; i < 10; i++) {
                    arrTemp.push(res.data[i])
                }
                var htmlStr = template('food-table', arrTemp)
                $('#fbox').html(htmlStr)

            }
        })
    }
})