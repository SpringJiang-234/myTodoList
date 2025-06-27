package org.jcx.servlet;

import com.alibaba.fastjson.JSONObject;
import org.jcx.model.IsCircle;
import org.jcx.model.Tag;
import org.jcx.model.Todo;
import org.jcx.service.ITodoService;
import org.jcx.service.impl.ToDoServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/todo/get")
public class TodoGetListServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 防止中文乱码 */
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        /* 接收前端参数 */
        Integer pageIndex = Integer.parseInt(request.getParameter("pageIndex"));
        Integer pageSize = Integer.parseInt(request.getParameter("pageSize"));
        String idLike = request.getParameter("idLike");
        String userLike = request.getParameter("userLike");
        String titleLike = request.getParameter("titleLike");
        String contentLike = request.getParameter("contentLike");
        Tag tagLike = Tag.fromDbValue(request.getParameter("tagLike"));
        String classifyLike = request.getParameter("classifyLike");
        String istopLike = request.getParameter("istopLike");
        IsCircle iscircleLike = IsCircle.fromDbValue(request.getParameter("iscircleLike"));
        String iscomplete = request.getParameter("iscomplete");

        System.out.println("——————————————————————————*****——————————————————————————");
        System.out.println("与前端交锋最前线：servlet\tTodoGetListServlet\t太多了不打印了");

        ITodoService todoService = new ToDoServiceImpl();
        List<Todo> todoList = todoService.todoGetList(
                idLike,userLike,titleLike,contentLike,tagLike,classifyLike,istopLike,iscircleLike,iscomplete,
                pageIndex,pageSize);
        System.out.println("！！！疑似罪魁祸首！！！"+todoList);

        // 处理数据
        boolean flag=false;
        String msg = "操作失败";
        if(!todoList.isEmpty()){
            flag=true;
            msg="操作成功";
        }

        // 组装数据
        JSONObject data = new JSONObject();
        data.put("flag", flag);
        data.put("msg", msg);
        data.put("todoList", todoList);

        String dataStr = data.toJSONString();

        // 响应数据给前端
        PrintWriter writer = response.getWriter();
        writer.write(dataStr);
        writer.flush();

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
