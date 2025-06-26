/* 全局变量 */

// 分页配置
var allPageIndex = 1;
var allPageSize = 7;

$('#sideMenu .layui-nav-item a').on('click', function () {
    // 每次切换页面分页都回归第一页
    allPageIndex = 1;

    var type = $(this).data('type');
    var html = '';
    if (type === 'user') {
        html = `
            <blockquote class="layui-elem-quote layui-text">
                用户管理
            </blockquote>
            <div class="layui-card layui-panel">
                <div class="layui-card-body">
                <form class="navbar-form navbar-left" role="search">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="用户名" id="user-user-like">
                    </div>
                    <button type="button" class="btn btn-default" onclick="userGetList();changeAllPageIndexUser(1)">搜索</button>
                    <button type="button" class="btn btn-default" onclick="userResult()">重置</button>
                    <button type="button" class="btn btn-info" style="margin-right:850px" onclick="userDialogArise(1,null)">添加</button>
                </form>
                <div class="btn-group" style="margin-top:8px;margin-left:15px">
                    <button type="button" class="btn btn-defaault">权限</button>
                    <button type="button" class="btn btn-defaault dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="caret"></span>
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a href="#" id="user-isadmin-all" onclick="changeUserIsadmin(this)">全部</a>
                        </li>
                        <li><a href="#" id="user-isadmin-user" onclick="changeUserIsadmin(this)">用户</a>
                        </li>
                        <li><a href="#" id="user-isadmin-manage" onclick="changeUserIsadmin(this)">管理员</a>
                        </li>
                    </ul>
                </div>
                <table class="table table-striped">
                    <thead>
                        <th>用户名</th>
                        <th>密码</th>
                        <th>权限</th>
                        <th>操作</th>
                    </thead>
                    <tbody id="userTbody">
                    </tbody>
                </table>
                </div>
            </div>
        `;
        $('#mainContent').html(html);
        userGetList();
    } else if (type === 'todo') {
        html = `
            <blockquote class="layui-elem-quote layui-text">
                TodoList管理
            </blockquote>
            <div class="layui-card layui-panel">
                <div class="layui-card-body">
                <div>
                    <form class="navbar-form navbar-left" role="search">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="ID" id="todo-id-like">
                            <input type="text" class="form-control" placeholder="用户名" id="todo-user-like">
                            <input type="text" class="form-control" placeholder="标题" id="todo-title-like">
                            <input type="text" class="form-control" placeholder="内容" id="todo-content-like">
                            <input type="text" class="form-control" placeholder="分类" id="todo-classify-like">
                        </div>
                        <button type="button" class="btn btn-default" onclick="todoGetList();changeAllPageIndexTodo(1)">搜索</button>
                        <button type="button" class="btn btn-default" onclick="todoResult()">重置</button>
                        <button type="button" class="btn btn-info" style="margin-right:30px" onclick="todoDialogArise(1,null)">添加</button>
                    </form>
                </div>
                <div>
                    <div class="btn-group" style="margin-top:8px;margin-left:15px">
                        <button type="button" class="btn btn-defaault">标签</button>
                        <button type="button" class="btn btn-defaault dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="caret"></span>
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a href="#" onclick="changeTodoTag(this)">全部</a></li>
                            <li><a href="#" onclick="changeTodoTag(this)">重要且紧急</a></li>
                            <li><a href="#" onclick="changeTodoTag(this)">重要不紧急</a></li>
                            <li><a href="#" onclick="changeTodoTag(this)">不重要但紧急</a></li>
                            <li><a href="#" onclick="changeTodoTag(this)">不重要不紧急</a></li>
                        </ul>
                    </div>
                    <div class="btn-group" style="margin-top:8px">
                        <button type="button" class="btn btn-defaault">是否特殊</button>
                        <button type="button" class="btn btn-defaault dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="caret"></span>
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a href="#" onclick="changeTodoIstop(this)">全部</a></li>
                            <li><a href="#" onclick="changeTodoIstop(this)">是</a></li>
                            <li><a href="#" onclick="changeTodoIstop(this)">否</a></li>
                        </ul>
                    </div>
                    <div class="btn-group" style="margin-top:8px">
                        <button type="button" class="btn btn-defaault">Todo循环</button>
                        <button type="button" class="btn btn-defaault dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="caret"></span>
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a href="#" onclick="changeTodoIscircle(this)">全部</a></li>
                            <li><a href="#" onclick="changeTodoIscircle(this)">日常任务</a></li>
                            <li><a href="#" onclick="changeTodoIscircle(this)">周常任务</a></li>
                            <li><a href="#" onclick="changeTodoIscircle(this)">支线任务</a></li>
                        </ul>
                    </div>
                    <div class="btn-group" style="margin-top:8px">
                        <button type="button" class="btn btn-defaault">是否完成</button>
                        <button type="button" class="btn btn-defaault dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="caret"></span>
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a href="#" onclick="changeTodoIscomplete(this)">全部</a></li>
                            <li><a href="#" onclick="changeTodoIscomplete(this)">是</a></li>
                            <li><a href="#" onclick="changeTodoIscomplete(this)">否</a></li>
                        </ul>
                    </div>
                </div>


                <table class="table table-striped">
                    <thead>
                        <th>ID</th>
                        <th>用户名</th>
                        <th>标题</th>
                        <th>内容</th>
                        <th>标签</th>
                        <th>分类</th>
                        <th>是否特殊</th>
                        <th>Todo循环</th>
                        <th>是否完成</th>
                        <th>操作</th>
                    </thead>
                    <tbody  id="todoTbody">
                    </tbody>
                </table>
                </div>
            </div>
        `;
        $('#mainContent').html(html);
        todoGetList();
    }
})