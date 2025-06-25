package org.jcx.servlet;

import com.alibaba.fastjson.JSONObject;
import org.jcx.model.User;
import org.jcx.service.IUserSerive;
import org.jcx.service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/user/get")
public class UserGetListServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 防止中文乱码 */
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        /* 接收前端参数 */
        Integer pageIndex = Integer.parseInt(request.getParameter("pageIndex"));
        Integer pageSize = Integer.parseInt(request.getParameter("pageSize"));
        String userLike = request.getParameter("userLike");
        int isadmin = Integer.parseInt(request.getParameter("isadmin"));

        System.out.println("——————————————————————————*****——————————————————————————");
        System.out.println("与前端交锋最前线：servlet\tUserGetListServlet\tpageIndex = " + pageIndex + "，pageSize = " + pageSize + "，userLike = " + userLike + "，isadmin = " + isadmin);

        IUserSerive userService = new UserServiceImpl();
        List<User> userList = userService.userGetList(isadmin,userLike,pageIndex,pageSize);

        // 处理数据
        boolean flag=false;
        String msg = "操作失败";
        if(!userList.isEmpty()){
            flag=true;
            msg="操作成功";
        }

        // 组装数据
        JSONObject data = new JSONObject();
        data.put("flag", flag);
        data.put("msg", msg);
        data.put("userList", userList);

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
