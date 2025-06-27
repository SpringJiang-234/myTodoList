/* 用户管理全局变量 */
// 存储筛选下拉列表选项选择值
var allUserIsadmin = 0; //0: 全部（默认），1：用户，2：管理员

// 存储当前分页查询用户表数据
var allUserList = null;
// 存储修改按钮/删除按钮需要的index全局变量
var allUserIndex = null;
// 存储弹窗模式
var allUserDialogMode = 1; // 1：添加（默认），2：修改
// 存储弹窗下拉列表选项的选择值
var allUserDialogIsadmin = 1; // 1：用户（默认），2：管理员

/* 用户管理 */
// 查询：需要维护全局变量allUserList
function userGetList() {
    console.log('前端函数执行中function userGetList()');

    // 先得到最大页数并渲染到分页栏里
    $.ajax({
        url: 'user/maxpage',
        type: "POST",
        dataType: "json",
        data: {
            'isadmin': allUserIsadmin,
            'userLike': $('#user-user-like').val(),
            'pageSize': allPageSize
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            maxPage = res.maxPage;
            console.log(maxPage)
            var paginationHtml = `
            <nav aria-label="Page navigation">
                <ul class="pagination">
                    <li>
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`;
            for (var i = 1; i <= maxPage; i++) {
                paginationHtml += `<li><a href="#" onclick="changeAllPageIndexUser(${i})">${i}</a></li>`;
            }
            paginationHtml += `<li>
                        <a href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>`;
            $('#navigation').html(paginationHtml);

        },
        error: function (err) {
            console.log('请求失败 err = ', err)
        }
    });

    $.ajax({
        url: 'user/get',
        type: "POST",
        dataType: "json",
        data: {
            'isadmin': allUserIsadmin,
            'userLike': $('#user-user-like').val(),
            'pageIndex': allPageIndex,
            'pageSize': allPageSize
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            // 小心局部变量与全局变量同名导致全局变量没有被更改
            allUserList = res.userList;
            var tbodyHtml = '';
            allUserList.forEach((item, index) => {
                tbodyHtml += `<tr>
                    <td>${item.user}</td>
                    <td>${item.pwd}</td>
                    <td>${item.isadmin == 1 ? '用户' : '管理员'}</td>
                    <td>
                        <button type="button" class="btn btn-warning" onclick="userDialogArise(2,${index})">修改</button>
                        <button type="button" class="btn btn-danger" onclick="userDel('${item.user}')">删除</button>
                    </td>
                </tr>`;
            });
            $('#userTbody').html(tbodyHtml);
        },
        error: function (err) {
            console.log('请求失败 err = ', err)
        }
    });
}
// 点击分页改变页码，重新获取列表
function changeAllPageIndexUser(i) {
    console.log('前端函数执行中：function changeAllPageIndexUser(i)')
    allPageIndex = i;
    userGetList();
}

// 下拉列表筛选
function changeUserIsadmin(element) {
    console.log('前端函数执行中：function changeUserIsadmin(element)');
    var userIsadminText = $(element).text();
    console.log(userIsadminText);
    if (userIsadminText === '全部') {
        allUserIsadmin = 0;
    }
    else if (userIsadminText === '用户') {
        allUserIsadmin = 1;
    }
    else if (userIsadminText === '管理员') {
        allUserIsadmin = 2;
    }
    userGetList();
}

// 重置搜索栏
function userResult() {
    console.log('前端函数执行中：function userResult()')
    // 全局参数回归初始值
    allUserList = null;
    allUserIndex = null;
    allUserDialogMode = 1;
    allUserDialogIsadmin = 1;
    allUserIsadmin = 0;

    // 输入框内容归零
    $('#user-user-like').val('')

    userGetList();
}

// 准备唤起添加和修改弹窗：需要维护全局变量allUserIndex和allUserDialogMode
// 添加按钮和修改按钮调用此函数
// 增加按钮传入(1,null)，调用userAdd()
// 修改按钮传入(2,index)，调用userUpdate(updateIndex)
function userDialogArise(userDialogMode, updateIndex) {
    console.log('前端函数执行中：function userDialogArise(userDialogMode)');
    if (userDialogMode == 1) {
        allUserDialogMode = 1;
        userAdd();
    }
    else if (userDialogMode == 2) {
        allUserDialogMode = 2;
        allUserIndex = updateIndex;
        userUpdate(allUserIndex);
    }
}

// 重置弹窗：根据全局变量的值选择效果
function userDialogReset() {
    console.log('前端函数执行中：function userDialogReset()')
    if (allUserDialogMode == 1) {
        // 添加
        userAddDialogReset();
    } else if (allUserDialogMode == 2) {
        // 修改
        userUpdateDialogReset();
    }
}
function userAddDialogReset() {
    console.log('前端函数执行中：function userAddDialogReset()')
    // 添加：全部置空
    $('#user-dialog-user').val('')
    $('#user-dialog-pwd').val('')
    var t = '用户' + '<span class="caret"></span>';
    $('#user-dialog-isadmin-text').html(t);
    allUserDialogIsadmin = 1;
    allPageIndex = 1;
}
function userUpdateDialogReset() {
    console.log('前端函数执行中：function userUpdateDialogReset()')
    // 修改：获取当前行数据填满
    // 根据全局变量allUserIndex和全局变量allUserList获得选定行的数据
    // 改变input需要用val()
    $('#user-dialog-user').val(allUserList[allUserIndex].user);
    $('#user-dialog-pwd').val(allUserList[allUserIndex].pwd);
    allUserDialogIsadmin = allUserList[allUserIndex].isadmin;
    var t = (allUserDialogIsadmin==1 ? '用户' : '管理员') + '<span class="caret"></span>';
    $('#user-dialog-isadmin-text').html(t);
    allPageIndex = 1;
}

// 确认弹窗：根据全局变量的值选择效果
function userDialogConfirm() {
    console.log('前端函数执行中：function userDialogConfirm()')
    if (allUserDialogMode == 1) {
        userAddDialogConfirm();
    } else if (allUserDialogMode == 2) {
        userUpdateDialogConfirm();
    }
}
function userAddDialogConfirm() {
    console.log('前端函数执行中：function userAddDialogConfirm()')
    $.ajax({
        url: 'user/add',
        type: "POST",
        dataType: "json",
        data: {
            'user': $('#user-dialog-user').val(),
            'pwd': $('#user-dialog-pwd').val(),
            'isadmin': allUserDialogIsadmin,
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            if (res.flag) {
                userDialogCancel();
                // alert('添加成功');
                Swal.fire({
                    title: '提示',
                    text: '添加成功',
                    icon: 'success'
                });
                userGetList();
            } else {
                // alert('添加失败');
                Swal.fire({
                    title: '提示',
                    text: '添加失败',
                    icon: 'error'
                });
            }
        },
        error: function (err) {
            console.log('请求失败 err = ', err)
            // alert('添加失败')
            Swal.fire({
                title: '提示',
                text: '添加失败',
                icon: 'error'
            });
        }
    });
}
function userUpdateDialogConfirm() {
    console.log('前端函数执行中：function userUpdateDialogConfirm()')
    $.ajax({
        url: 'user/update',
        type: "POST",
        dataType: "json",
        data: {
            'user': $('#user-dialog-user').val(),
            'pwd': $('#user-dialog-pwd').val(),
            'isadmin': allUserDialogIsadmin,
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            userDialogCancel();
            // alert('更新成功')
            Swal.fire({
                title: '提示',
                text: '更新成功',
                icon: 'success'
            });
            userGetList();
        },
        error: function (err) {
            console.log('请求失败 err = ', err)
            // alert('更新失败')
            Swal.fire({
                title: '提示',
                text: '更新失败',
                icon: 'error'
            });
        }
    });
}

// 取消弹窗
function userDialogCancel() {
    console.log('前端函数执行中：function userDialogCancel()');
    $('.userDialog').css('visibility', 'hidden');
}

// 唤起添加弹窗
function userAdd() {
    console.log('前端函数执行中：function userAdd()');
    userDialogMode = 1;
    userAddDialogReset();
    //设置user可以更改
    $('#user-dialog-user').removeAttr('readonly');
    $('.userDialog').css('visibility', 'visible');
}
// 唤起更新弹窗
function userUpdate() {
    console.log('前端函数执行中：function userUpdate()');
    userDialogMode = 2;
    userUpdateDialogReset();
    //设置user不可更改
    $('#user-dialog-user').attr('readonly', 'true');
    $('.userDialog').css('visibility', 'visible');
}
// 修改弹窗下拉列表值
function changeUserDialogIsadmin(element) {
    console.log('前端函数执行中：function changeUserDialogIsadmin(element)');
    var userDialogIsadminText = $(element).text();
    console.log(userDialogIsadminText);
    if (userDialogIsadminText === '用户') {
        allUserDialogIsadmin = 1;
    }
    else if (userDialogIsadminText === '管理员') {
        allUserDialogIsadmin = 2;
    }
    var t = userDialogIsadminText + '<span class="caret"></span>';
    $('#user-dialog-isadmin-text').html(t);
}

// 删除
function userDel(user) {
    console.log('前端函数执行中：function userDel(index)');
    $.ajax({
        url: 'user/delete',
        type: "POST",
        dataType: "json",
        data: {
            'user': user,
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            userDialogCancel();
            // alert('删除成功')
            Swal.fire({
                title: '提示',
                text: '删除成功',
                icon: 'success'
            });
            userGetList();
        },
        error: function (err) {
            console.log('请求失败 err = ', err)
            // alert('删除失败')
            Swal.fire({
                title: '提示',
                text: '删除失败',
                icon: 'error'
            });
        }
    });
}