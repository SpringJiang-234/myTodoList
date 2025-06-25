package org.jcx.service;

import org.jcx.model.User;

import java.util.List;

public interface IUserSerive {
    //后台管理服务
    List<User> userGetList(Integer isadmin, String userLike,int pageIndex, int pageSize);
    Integer userAdd(String user,String pwd,Integer isadmin);
    Integer userDel(String user);
    Integer userUpdate(String user,String pwd,Integer isadmin);

    Integer userGetMaxPage(int isadmin,String userLike, int pageSize);

    //客户端服务
    Integer userLogin(String user,String pwd);

}
