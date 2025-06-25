package org.jcx.dao;

import org.jcx.model.User;

import java.util.List;

public interface IUserDao {
    // 传入user和pwd，返回isadmin：0查无此人，1用户，2管理员
    Integer userLogin(String user,String pwd);

    List<User> userGetList(Integer isadmin, String userLike, int offset, int pageSize);
    Integer userAdd(User user);
    Integer userDel(String user);
    Integer userUpdate(User user);

    Integer userGetCount(int isadmin,String userLike);
}
