//进入主页，随机看板娘
changeCute();

/* 0.从路径取用户名*/
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
const allUserName = urlParams.get('user');
console.log(allUserName);

// 1.实时获取时间
getCurrentTime();
function getCurrentTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const hours = ("0" + now.getHours()).slice(-2);
    const minutes = ("0" + now.getMinutes()).slice(-2);

    const formattedTime = year + month + day + hours + minutes;
    console.log(formattedTime);

    $('#year').text(year);
    $('#month').text(month);
    $('#day').text(day);
    $('#hour').text(hours);
    $('#minute').text(minutes);
}

//每30s执行一次获取当前时间函数（可以更快）
setInterval(getCurrentTime, 30000);

// 2.取得用户名显示在left - line - 4以及left - line - 3
getUserName()
function getUserName() {
    $('.left-line-4').text(`${allUserName}，您还有许多事情需要处理。现在还不能休息哦。`);
    $('.user-name').text(`${allUserName}`);
}

// 3.隐藏面板，只剩下看板娘和背景，多一个取消隐藏按钮
function panelHidden() {
    $('.outermost-panel').toggleClass("my-hidden")
    $('#unhide').attr('style', "visibility: visible")
}
function panelUnhide() {
    $('.outermost-panel').toggleClass("my-hidden")
    $('#unhide').attr('style', "visibility: hidden")
}

/* 4.点击跳转任务列表 */
function linkToTodoList() {
    location.href = "todo.html?user=" + allUserName;
}

// function linkToTodoPlan() {
//     location.href = "todoplan.html?user=" + allUserName;
// }

// function say() {
//     $('.left-line-4').css('visibility', 'visible');
// }

//随机看板娘
function changeCute() {
    // 生成1-5的随机整数（包含1和5）
    const randomNum = Math.floor(Math.random() * 5) + 1;
    console.log(randomNum);
    var s = "./image/cute/" + randomNum + ".png";
    console.log(s)
    $('#favorite-staff').attr('src', s);
}


// 修改密码弹窗
function pwdUpdateDialog() {
    $('.updatepwd').attr('style', "visibility: visible");
}
function pwdUpdateCancel() {
    $('.updatepwd').attr('style', "visibility: hidden");
}
function newpwdConfirm() {
    var newpwd = $('#todo-dialog-newpwd').val();
    if (newpwd=="") {
        alert('新密码不能为空');
        return;
    }
    $.ajax({
        url: 'user/update',
        type: "POST",
        dataType: "json",
        data: {
            'user': allUserName,
            'pwd': newpwd,
            'isadmin': 1,
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            pwdUpdateCancel();
            alert('更新成功')
            userGetList();
        },
        error: function (err) {
            console.log('请求失败 err = ', err)
            alert('更新失败')
        }
    });
}

//美丽的弹框提示：还没做
function alertCreating() {
    Swal.fire({
        title: '提示',
        text: '锐意制作中！',
        icon: 'info'
    });
}