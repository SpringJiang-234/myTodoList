var allMode = 0;
function panelUnhide(mode) {
    allMode = mode;
    if (mode == 1) {
        dialogSetLogin();
    } else {
        dialogSetRegister();
    }
    $('#dialog-input').attr('style', "visibility: visible")
}
function panelHidden() {
    $('#dialog-input').attr('style', "visibility: hidden")
}

function dialogSetLogin() {
    $('#dialog-confirm-label').text('登录');
    $('#dialog-confirm-button').text('开始唤醒');
}
function dialogSetRegister() {
    $('#dialog-confirm-label').text('注册');
    $('#dialog-confirm-button').text('确认注册');
}

function confirm() {
    var user = $('#user').val();
    var pwd = $('#pwd').val();
    // console.log(user, pwd);
    if (!user || !pwd) {
        // alert('用户名和密码不能为空');
        Swal.fire({
            title: '提示',
            text: '用户名和密码不能为空',
            icon: 'warning'
        });
        return;
    }
    if (allMode == 1) {
        confirmLogin(user,pwd);
    } else {
        confirmRegister(user, pwd);
    }
}

function confirmLogin(user, pwd) {
    $.ajax({
        url: 'user/login',
        type: "POST",
        dataType: "json",
        data: {
            'user': user,
            'pwd': pwd
        },
        success: function (res) {
            console.log('function confirmLogin()');
            console.log('后端响应数据 res = ', res);
            var isadmin = res.isadmin;
            if (!isadmin) {
                // alert("账号或密码错误")
                Swal.fire({
                    title: '提示',
                    text: '账号或密码错误',
                    icon: 'error'
                });
                
            } else if(isadmin==1){
                location.href = "index.html?user=" + user;
            } else if (isadmin == 2) {
                location.href = "manage.html"
            }

        },
        error: function (err) {
            console.log('请求失败 err = ', err)
        }
    })
}

function confirmRegister(user, pwd) {
    $.ajax({
        url: 'user/add',
        type: "POST",
        dataType: "json",
        data: {
            'user': user,
            'pwd': pwd,
            'isadmin': 1,
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            if (res.flag) {
                panelHidden();
                // alert('注册成功');
                Swal.fire({
                    title: '提示',
                    text: '注册成功',
                    icon: 'success'
                });
            } else {
                // alert('注册失败');
                Swal.fire({
                    title: '提示',
                    text: '注册失败',
                    icon: 'error'
                });
            }
        },
        error: function (err) {
            console.log('请求失败 err = ', err)
            // alert('连接服务器失败')
            Swal.fire({
                title: '提示',
                text: '连接服务器失败',
                icon: 'error'
            });
        }
    });
}