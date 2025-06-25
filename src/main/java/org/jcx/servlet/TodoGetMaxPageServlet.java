package org.jcx.servlet;

import com.alibaba.fastjson.JSONObject;
import org.jcx.model.IsCircle;
import org.jcx.model.Tag;
import org.jcx.service.ITodoService;
import org.jcx.service.impl.ToDoServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/todo/maxpage")
public class TodoGetMaxPageServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 防止中文乱码 */
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        // 分页参数
        int pageSize = Integer.parseInt(request.getParameter("pageSize"));
        // 筛选参数
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
        System.out.println("与前端交锋最前线：servlet\tTodoGetMaxPageServlet\tpageSize = "+pageSize + "太长不打");

        ITodoService todoService = new ToDoServiceImpl();
        Integer maxPage = todoService.todoGetMaxPage(idLike,userLike,titleLike,contentLike,tagLike,classifyLike,istopLike,iscircleLike,iscomplete,
                pageSize);

        // 处理数据
        boolean flag=false;
        String msg = "操作失败";
        if(maxPage!=null){
            flag=true;
            msg="操作成功";
        }

        // 组装数据
        JSONObject data = new JSONObject();
        data.put("flag", flag);
        data.put("msg", msg);
        data.put("maxPage", maxPage);

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
