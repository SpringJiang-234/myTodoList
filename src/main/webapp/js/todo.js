/*1.从路径取用户名*/
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
const allUserName = urlParams.get('user');
console.log(allUserName);

// 全局变量
var allIscircle = 'day';
var allTodoList = null;

getList();

var allClassify = null;
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
            'classifyLike': '',
            'istopLike': '',
            'iscircleLike': allIscircle,
            'iscomplete': ''
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            allTodoList = res.todoList;
            var tbodyHtml = '';
            allTodoList.forEach((item, index) => {
                tbodyHtml +=
                    `<div class="todo-item">
                        <div class="todo-item-complete-button" onclick="updateIscomplete(${index})">
                            <img src="./image/todo/国际象棋车_1750826775.png" alt="">
                            <span class="span0">${item.iscomplete == 1 ? '0' : '1'}</span><span class="span1">/1</span>
                            <div ${item.iscomplete == 2 ? 'style="background-color:#3271c3"' : ''}></div>
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
}

//提示框
function dialogTip() {
    alert('啊哈哈还没做')
} 

function setClassify() {
    //请求得到用户的分类，渲染到页面
    $.ajax({
        url: 'todo/getclassify',
        type: "POST",
        dataType: "json",
        data: {
            'user': allUserName,
        },
        success: function (res) {
            console.log('请求成功 res = ', res)
            allClassify = res.classify;
            var classifyHtml = '';
            allClassify.forEach((item, index) => {
                classifyHtml += `<div class="reward-item">${item}Ciallo～(∠・ω< )⌒★</div>`;
            });
            $('.reward').html(classifyHtml)
        },
        error: function (err) {
            console.log('请求失败 err = ', err)
        }
    });
}