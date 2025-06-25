package org.jcx.service.impl;

import org.jcx.dao.IUserDao;
import org.jcx.dao.impl.UserDaoImpl;
import org.jcx.model.User;
import org.jcx.service.IUserSerive;

import java.util.List;

public class UserServiceImpl implements IUserSerive {
    IUserDao userDao = new UserDaoImpl();

    @Override
    public Integer userLogin(String user, String pwd) {
        System.out.println("这里是userLogin的服务现场");
        return userDao.userLogin(user,pwd);
    }

    @Override
    public List<User> userGetList(Integer isadmin, String userLike, int pageIndex, int pageSize) {
        System.out.println("这里是userGetList的服务现场");
        int offset = (pageIndex-1)*pageSize;
        return userDao.userGetList(isadmin, userLike,offset,pageSize);
    }

    @Override
    public Integer userAdd(String user, String pwd, Integer isadmin) {
        System.out.println("这里是userAdd的服务现场");
        User u = new User(user,pwd,isadmin);
        return userDao.userAdd(u);
    }

    @Override
    public Integer userDel(String user) {
        System.out.println("这里是userDel的服务现场");
        return userDao.userDel(user);
    }

    @Override
    public Integer userUpdate(String user, String pwd, Integer isadmin) {
        System.out.println("这里是userUpdate的服务现场");
        User u = new User(user,pwd,isadmin);
        return userDao.userUpdate(u);
    }

    @Override
    public Integer userGetMaxPage(int isadmin,String userLike, int pageSize) {
        System.out.println("这里是userGetMaxPage的服务现场");
        Integer count = userDao.userGetCount(isadmin,userLike);
        Integer maxPage = (count%pageSize==0) ? (count/pageSize) : (count/pageSize+1);
        return maxPage;
    }
}
