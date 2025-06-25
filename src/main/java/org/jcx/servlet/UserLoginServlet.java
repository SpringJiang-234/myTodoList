package org.jcx.servlet;

import com.alibaba.fastjson.JSONObject;
import org.jcx.service.IUserSerive;
import org.jcx.service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/user/login")
public class UserLoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 防止中文乱码 */
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        /* 接收前端参数 */
        String user = request.getParameter("user");
        String pwd = request.getParameter("pwd");

        System.out.println("——————————————————————————*****——————————————————————————");
        System.out.println("与前端交锋最前线：servlet\tUserLoginServlet\tuser = " + user + "，pwd = " + pwd);

        IUserSerive userService = new UserServiceImpl();
        Integer isadmin = userService.userLogin(user,pwd);

        // 处理数据
        boolean flag=false;
        String msg = "操作失败";
        if(isadmin!=null){
            flag=true;
            msg="操作成功";
        }

        // 组装数据
        JSONObject data = new JSONObject();
        data.put("flag", flag);
        data.put("msg", msg);
        data.put("isadmin", isadmin);

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
