/*1.从路径取用户名*/
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var allUserName = urlParams.get('user');
console.log(allUserName);

// 全局变量
var allIscircle = 'default';
var allClassify = '';
var allIstop = '';
var allIscomplete = '';

var allTodoList = null;

getList();

var allClassifyList = null;
setClassify();


// 2.点击返回，回到index
function linkToIndex() {
    location.href = "index.html?user=" + allUserName;
}

// 3.tab标签点击后样式变化
function tabActive(element,iscircle) {
    console.log(element)
    $('.tab').removeClass('tab-active')
    $(element).addClass('tab-active');

    allIscircle = iscircle;
    getList();
}

// 3.分类点击后分类全局变量allClassify变化
function tabClassify(classify) {
    if (classify == null) {
        classify = "";
    }
    allClassify = classify;

    setClassify();
    console.log(allClassify)
    getList();
}

// 4.仅置顶
function toptop() {
    allIstop = '2'
    getList();
}

// 5.仅未完成
function completecomplete() {
    allIscomplete = '1';
    getList();
}

//请求数据
function getList() {
    //请求数据
    $.ajax({
        url: 'todo/get2',
        type: "POST",
        dataType: "json",
        data: {
            'pageIndex': 1,
            'pageSize': 99,
            'idLike': '',
            'user': allUserName,
            'titleLike': '',
            'contentLike': '',
            'tagLike': '',
            'classifyLike': allClassify,
            'istopLike': allIstop,
            'iscircleLike': allIscircle,
            'iscomplete': allIscomplete,
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            allTodoList = res.todoList;
            var tbodyHtml = '';
            allTodoList.forEach((item, index) => {
                tbodyHtml +=
                    `<div class="todo-item">
                        <div class="todo-item-complete-button" onclick="updateIscomplete(${index})">
                            <img src="./image/todo/棋子_${item.tag}.png" alt="">
                            <span class="span0">${item.iscomplete == 1 ? '0' : '1'}</span><span class="span1">/1</span>
                            <div ${item.iscomplete == 2 ? 'style="background-color:white"' : ''}></div>
                        </div>
                        <div class="icon-delete"  onclick="todoDel('${item.id}')">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            <span>删除</span>
                        </div>
                        <div class="icon-redify"  onclick="todoDialogArise(2,${index})">
                            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            <span>查看</span>
                        </div>
                        <span class="todo-item-title">${item.title}</span>
                        <span class="todo-item-en">Title：</span>
                    </div>`
            });
            $('#todo-list').html(tbodyHtml);
        },
        error: function (err) {
            console.log('请求失败 err = ', err)
        }
    });
    $('#todo-list').html()
}

//改变完成状态
function updateIscomplete(index) {
    $.ajax({
        url: 'todo/update2',
        type: "POST",
        dataType: "json",
        data: {
            'id': allTodoList[index].id,
            'iscomplete': allTodoList[index].iscomplete,
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            getList();
        },
        error: function (err) {
            console.log('请求失败 err = ', err)
            console.log('失败参数=', {
                'id': allTodoList[index].id,
                'iscomplete': allTodoList[index].iscomplete,
            });
            alert('更新失败')
        }
    });
    getList();
}

//全部重置
function reset() {
    allClassify = '';
    allIstop = '';
    allIscomplete = '';

    allTodoList = null;

    getList();

    allClassifyList = null;
    setClassify();
} 

//请求得到用户的分类，渲染到页面
function setClassify() {
    
    $.ajax({
        url: 'todo/getclassify',
        type: "POST",
        dataType: "json",
        data: {
            'user': allUserName,
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            allClassifyList = res.classify;
            var classifyHtml = '<div class="reward-item" onclick="tabClassify()">全部Ciallo～(∠・ω< )⌒★</div>';
            allClassifyList.forEach((item, index) => {
                classifyHtml += `<div class="reward-item" onclick="tabClassify('${item}')">${item}Ciallo～(∠・ω< )⌒★</div>`;
            });
            $('.reward').html(classifyHtml)
        },
        error: function (err) {
            console.log('请求失败 err = ', err)
        }
    });
}

// todo弹窗！！！

// 存储当前分页查询todo表数据
var allTodoList = null;
// 存储修改按钮/删除按钮需要的index全局变量
var allTodoIndex = null;
// 存储弹窗模式
var allTodoDialogMode = 1; // 1：添加（默认），2：修改
// 存储弹窗下拉列表选项的选择值
var alltodoDialogTag = 'default'; //枚举，具体看数据库
var alltodoDialogIstop = 1; //1：不置顶（否），2：置顶（是）
var alltodoDialogIscircle = 'default';  //枚举，具体看数据库
var alltodoDialogIscomplete = 1; //1：否，2：是

// 准备唤起添加和修改弹窗：需要维护全局变量allTodoIndex和alltodoDialogMode
// 添加按钮和修改按钮调用此函数
// 增加按钮传入(1,null)，调用todoAdd()
// 修改按钮传入(2,index)，调用todoUpdate(updateIndex)
function todoDialogArise(todoDialogMode, updateIndex) {
    console.log('前端函数执行中：function todoDialogArise(todoDialogMode)');
    if (todoDialogMode == 1) {
        alltodoDialogMode = 1;
        todoAdd();
    }
    else if (todoDialogMode == 2) {
        alltodoDialogMode = 2;
        allTodoIndex = updateIndex;
        todoUpdate(allTodoIndex);
    }
}

// 重置弹窗：根据全局变量的值选择效果
function todoDialogReset() {
    console.log('前端函数执行中：function todoDialogReset()')
    if (alltodoDialogMode == 1) {
        // 添加
        todoAddDialogReset();
    } else if (alltodoDialogMode == 2) {
        // 修改
        todoUpdateDialogReset();
    }
}
function todoAddDialogReset() {
    console.log('前端函数执行中：function todoAddDialogReset()')
    // 添加：全部置空    
    $('#todo-dialog-user').val('')
    $('#todo-dialog-title').val('')
    $('#todo-dialog-content').val('');
    $('#todo-dialog-classify').val('');

    var t = '不重要不紧急' + '<span class="caret"></span>';
    $('#todo-dialog-tag-text').html(t);
    alltodoDialogTag = 'default';

    t = '否' + '<span class="caret"></span>';
    $('#todo-dialog-istop-text').html(t);
    alltodoDialogIstop = 1;

    t = '支线任务' + '<span class="caret"></span>';
    $('#todo-dialog-iscircle-text').html(t);
    alltodoDialogIscircle = 'default';

    t = '否' + '<span class="caret"></span>';
    $('#todo-dialog-iscomplete-text').html(t);
    alltodoDialogIscomplete = 1;

    allPageIndex = 1;
}
function todoUpdateDialogReset() {
    console.log('当前行数据：', allTodoList[allTodoIndex]);
    console.log('前端函数执行中：function todoUpdateDialogReset()')
    // 修改：获取当前行数据填满
    // 根据全局变量allTodoIndex和全局变量allTodoList获得选定行的数据
    // 改变input需要用val()
    $('#todo-dialog-id').val(allTodoList[allTodoIndex].id)
    $('#todo-dialog-user').val(allTodoList[allTodoIndex].user)
    $('#todo-dialog-title').val(allTodoList[allTodoIndex].title)
    $('#todo-dialog-content').val(allTodoList[allTodoIndex].content);
    $('#todo-dialog-classify').val(allTodoList[allTodoIndex].classify);

    var t;

    //tag
    alltodoDialogTag = allTodoList[allTodoIndex].tag.toLowerCase();
    //数据库数据翻译成中文
    t = translationEnumTag(alltodoDialogTag) + '<span class="caret"></span>';
    console.log(t)
    $('#todo-dialog-tag-text').html(t);

    //istop
    alltodoDialogIstop = allTodoList[allTodoIndex].istop
    //数据库数据翻译成中文
    t = translationNumIstop(alltodoDialogIstop) + '<span class="caret"></span>';
    console.log(t)
    $('#todo-dialog-istop-text').html(t);

    //iscircle
    alltodoDialogIscircle = allTodoList[allTodoIndex].iscircle.toLowerCase();
    //数据库数据翻译成中文
    t = translationEnumIscircle(alltodoDialogIscircle) + '<span class="caret"></span>';
    $('#todo-dialog-iscircle-text').html(t);

    //iscomplete
    alltodoDialogIscomplete = allTodoList[allTodoIndex].iscomplete
    //数据库数据翻译成中文
    t = translationNumIscomplete(alltodoDialogIscomplete) + '<span class="caret"></span>';
    $('#todo-dialog-iscomplete-text').html(t);

    allPageIndex = 1;
}

// 翻译枚举/数字类型为有意义的字符串
function translationEnumTag(tagtoString) {
    console.log('前端函数执行中：function translationEnumTag(tagtoString)')
    switch (tagtoString) {
        case 'default':
            t = '不重要不紧急';
            break;
        case 'red':
            t = '重要且紧急';
            break;
        case 'yellow':
            t = '重要不紧急';
            break;
        case 'blue':
            t = '不重要但紧急';
            break;
        default:
            t = '不重要不紧急';
    }
    return t;
}
function translationNumIstop(istoptoString) {
    console.log('前端函数执行中：function translationNumIstop(istoptoString)')
    return (istoptoString == 1) ? '否' : '是';
}
function translationEnumIscircle(iscircletoString) {
    console.log('前端函数执行中：function translationEnumIscircle(iscircletoString)')
    switch (iscircletoString) {
        case 'default':
            t = '支线任务';
            break;
        case 'day':
            t = '日常任务';
            break;
        case 'week':
            t = '周常任务';
            break;
        default:
            t = '支线任务';
    }
    return t;
}
function translationNumIscomplete(iscompletetoString) {
    console.log('前端函数执行中：function translationNumIscomplete(iscompletetoString)')
    return (iscompletetoString == 1) ? '否' : '是';
}

// 确认弹窗：根据全局变量的值选择效果
function todoDialogConfirm() {
    console.log('前端函数执行中：function todoDialogConfirm()')
    if (alltodoDialogMode == 1) {
        todoAddDialogConfirm();
    } else if (alltodoDialogMode == 2) {
        todoUpdateDialogConfirm();
    }
}
function todoAddDialogConfirm() {
    console.log('前端函数执行中：function todoAddDialogConfirm()')
    $.ajax({
        url: 'todo/add',
        type: "POST",
        dataType: "json",
        data: {
            'user': allUserName,
            'title': $('#todo-dialog-title').val(),
            'content': $('#todo-dialog-content').val(),
            'tag': alltodoDialogTag,
            'classify': $('#todo-dialog-classify').val(),
            'istop': alltodoDialogIstop,
            'iscircle': alltodoDialogIscircle,
            'iscomplete': alltodoDialogIscomplete,
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            if (res.flag) {
                todoDialogCancel();
                alert('添加成功');
                setClassify();
                getList();
            } else {
                alert('添加失败');
            }
        },
        error: function (err) {
            console.log('请求失败 err = ', err)
            console.log('失败参数=', {
                user: $('#todo-dialog-user').val(),
                title: $('#todo-dialog-title').val(),
                content: $('#todo-dialog-content').val(),
                tag: alltodoDialogTag,
                classify: $('#todo-dialog-classify').val(),
                istop: alltodoDialogIstop,
                iscircle: alltodoDialogIscircle,
                iscomplete: alltodoDialogIscomplete
            });
            alert('添加失败')
        }
    });
}
function todoUpdateDialogConfirm() {
    console.log('前端函数执行中：function todoUpdateDialogConfirm()')
    console.log('alltodoDialogTag = ', alltodoDialogTag)
    console.log('alltodoDialogIscomplete = ', alltodoDialogIscomplete)
    $.ajax({
        url: 'todo/update',
        type: "POST",
        dataType: "json",
        data: {
            'id': $('#todo-dialog-id').val(),
            'user': allUserName,
            'title': $('#todo-dialog-title').val(),
            'content': $('#todo-dialog-content').val(),
            'tag': alltodoDialogTag,
            'classify': $('#todo-dialog-classify').val(),
            'istop': alltodoDialogIstop,
            'iscircle': alltodoDialogIscircle,
            'iscomplete': alltodoDialogIscomplete,
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            todoDialogCancel();
            alert('更新成功')
            setClassify();
            getList();
        },
        error: function (err) {
            console.log('请求失败 err = ', err)
            console.log('失败参数=', {
                id: $('#todo-dialog-id').val(),
                user: $('#todo-dialog-user').val(),
                title: $('#todo-dialog-title').val(),
                content: $('#todo-dialog-content').val(),
                tag: alltodoDialogTag,
                classify: $('#todo-dialog-classify').val(),
                istop: alltodoDialogIstop,
                iscircle: alltodoDialogIscircle,
                iscomplete: alltodoDialogIscomplete
            });
            alert('更新失败')
        }
    });
}

// 取消弹窗
function todoDialogCancel() {
    console.log('前端函数执行中：function todoDialogCancel()');
    $('.todoDialog').css('visibility', 'hidden');
}

// 唤起添加弹窗
function todoAdd() {
    console.log('前端函数执行中：function todoAdd()');
    todoDialogMode = 1;
    todoAddDialogReset();
    //设置ID不可更改：增加删除都不可以更改，直接在html写readonly
    // $('#todo-dialog-id').attr('readonly', 'true');
    $('.todoDialog').css('visibility', 'visible');
}
// 唤起更新弹窗
function todoUpdate() {
    console.log('前端函数执行中：function todoUpdate()');
    todoDialogMode = 2;
    todoUpdateDialogReset();
    //设置ID不可更改：增加删除都不可以更改，直接在html写readonly
    // $('#todo-dialog-id').attr('readonly', 'true');
    $('.todoDialog').css('visibility', 'visible');
}

// 修改弹窗下拉列表值
function changeDialogTodoTag(element) {
    console.log('前端函数执行中：function changeDialogTodoTag(element)')
    var todoDialogTagText = $(element).text();
    console.log(todoDialogTagText);
    if (todoDialogTagText === '重要且紧急') {
        alltodoDialogTag = 'red';
    }
    else if (todoDialogTagText === '重要不紧急') {
        alltodoDialogTag = 'yellow';
    }
    else if (todoDialogTagText === '不重要但紧急') {
        alltodoDialogTag = 'blue';
    }
    else if (todoDialogTagText === '不重要不紧急') {
        alltodoDialogTag = 'default';
    }
    var t = todoDialogTagText + '<span class="caret"></span>';
    $('#todo-dialog-tag-text').html(t);
}
function changeDialogTodoIstop(element) {
    console.log('前端函数执行中：function changeDialogTodoIstop(element)')
    var todoDialogIstopText = $(element).text();
    console.log(todoDialogIstopText);
    if (todoDialogIstopText === '是') {
        alltodoDialogIstop = 2;
    }
    else if (todoDialogIstopText === '否') {
        alltodoDialogIstop = 1;
    }
    var t = todoDialogIstopText + '<span class="caret"></span>';
    $('#todo-dialog-istop-text').html(t);
}
function changeDialogTodoIscircle(element) {
    console.log('前端函数执行中：function changeDialogTodoIscircle(element)')
    var todoDialogIscircleText = $(element).text();
    console.log(todoDialogIscircleText);
    if (todoDialogIscircleText === '支线任务') {
        alltodoDialogIscircle = 'default';
    }
    else if (todoDialogIscircleText === '周常任务') {
        alltodoDialogIscircle = 'week';
    }
    else if (todoDialogIscircleText === '日常任务') {
        alltodoDialogIscircle = 'day';
    }
    var t = todoDialogIscircleText + '<span class="caret"></span>';
    $('#todo-dialog-iscircle-text').html(t);
}
function changeDialogTodoIscomplete(element) {
    console.log('前端函数执行中：function changeDialogTodoIscomplete(element)')
    var todoDialogIscompleteText = $(element).text();
    console.log(todoDialogIscompleteText);
    if (todoDialogIscompleteText === '否') {
        alltodoDialogIscomplete = 1;
    }
    else if (todoDialogIscompleteText === '是') {
        alltodoDialogIscomplete = 2;
    }
    var t = todoDialogIscompleteText + '<span class="caret"></span>';
    $('#todo-dialog-iscomplete-text').html(t);
}

// 删除
function todoDel(id) {
    console.log('前端函数执行中：function todoDel()');
    $.ajax({
        url: 'todo/delete',
        type: "POST",
        dataType: "json",
        data: {
            'id': id,
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            todoDialogCancel();
            alert('删除成功')
            setClassify();
            getList();
        },
        error: function (err) {
            console.log('请求失败 err = ', err)
            console.log('失败参数=', { id: id });
            alert('删除失败')
        }
    });

}