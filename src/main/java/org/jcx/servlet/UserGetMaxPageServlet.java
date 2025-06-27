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

@WebServlet("/user/maxpage")
public class UserGetMaxPageServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 防止中文乱码 */
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        int isadmin = Integer.parseInt(request.getParameter("isadmin"));
        String userLike = request.getParameter("userLike");
        int pageSize = Integer.parseInt(request.getParameter("pageSize"));

        System.out.println("——————————————————————————*****——————————————————————————");
        System.out.println("与前端交锋最前线：servlet\tUserGetListServlet\tpageSize = "+pageSize + "，isadmin = "+isadmin + "，userLike = " + userLike);

        IUserSerive userService = new UserServiceImpl();
        Integer maxPage = userService.userGetMaxPage(isadmin,userLike,pageSize);

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
