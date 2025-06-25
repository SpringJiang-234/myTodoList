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
import java.util.List;

@WebServlet("/todo/getclassify")
public class TodoClassifyServlet extends HttpServlet {
    //查询一个用户的所有分类
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 防止中文乱码 */
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        /* 接收前端参数 */
        String user = request.getParameter("user");

        System.out.println("——————————————————————————*****——————————————————————————");
        System.out.println("与前端交锋最前线：servlet\tTodoGetList2Servlet\t太多了不打印了");

        ITodoService todoService = new ToDoServiceImpl();
        List<String> classify = todoService.todoClassify(user);

        // 处理数据
        boolean flag=false;
        String msg = "操作失败";
        if(!classify.isEmpty()){
            flag=true;
            msg="操作成功";
        }

        // 组装数据
        JSONObject data = new JSONObject();
        data.put("flag", flag);
        data.put("msg", msg);
        data.put("classify", classify);

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
