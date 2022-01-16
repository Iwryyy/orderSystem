$(function() {
    $('.back').click(function() {
        window.location.href = 'user.html'
    })


    $('#form_change').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/my/updateUserInfo',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败！')
                }
                layer.msg('修改成功！')

                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})