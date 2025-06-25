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

@WebServlet("/todo/update2")
public class TodoUpdate2Servlet extends HttpServlet {
    //只更新iscomplete的值
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 防止中文乱码 */
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        /* 接收前端参数 */
        Integer id = Integer.parseInt(request.getParameter("id"));
        Integer iscomplete = Integer.parseInt(request.getParameter("iscomplete"));

        System.out.println("——————————————————————————*****——————————————————————————");
        System.out.println("与前端交锋最前线：servlet\tTodoUpdate2Servlet\t太长了不打印");

        ITodoService todoService = new ToDoServiceImpl();
        Integer data = todoService.todoUpdate2(id,iscomplete);

        // 处理数据
        boolean flag=false;
        String msg = "操作失败";
        if(data>0){
            flag=true;
            msg="操作成功";
        }

        // 组装数据
        JSONObject res = new JSONObject();
        res.put("flag", flag);
        res.put("msg", msg);
        res.put("data", data);

        String resStr = res.toJSONString();

        // 响应数据给前端
        PrintWriter writer = response.getWriter();
        writer.write(resStr);
        writer.flush();

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
