package org.jcx.dao.impl;

import org.jcx.dao.IUserDao;
import org.jcx.model.User;
import org.jcx.utils.DBManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserDaoImpl implements IUserDao {
    Connection conn = DBManager.getConnByC3p0();
    PreparedStatement pstm = null;
    ResultSet rs = null;

    @Override
    public Integer userLogin(String user, String pwd) {
        Integer isadmin = null;
        //前端拦截空字符串和null
        String sql = "SELECT `isadmin` FROM `user` WHERE `user`=? AND `pwd`=?";
        try {
            pstm = conn.prepareStatement(sql);
            pstm.setString(1,user);
            pstm.setString(2,pwd);
            System.out.println("爱来自UserDao，您Login的sql语句长这样：\n"+sql);
            rs = pstm.executeQuery();
            if(rs.next()){
                isadmin = rs.getInt("isadmin");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return isadmin;
    }

    @Override
    public List<User> userGetList(Integer isadmin, String userLike, int offset, int pageSize) {
        List<User> userList = new ArrayList<>();
        User user = null;

        String isadmins=null;
        if(isadmin==0){
            isadmins="";
        }else{
            isadmins=isadmin.toString();
        }

        String sql = null;
        boolean flag = (userLike!=null && userLike!="");
        if(flag){
            sql = "SELECT * FROM `user` WHERE `user` LIKE concat('%',?,'%') AND `isadmin` LIKE concat('%',?,'%') LIMIT ?,?";
        }else{
            sql = "SELECT * FROM `user` WHERE `isadmin` LIKE concat('%',?,'%') LIMIT ?,?";
        }

        try {
            pstm = conn.prepareStatement(sql);
            if(flag){
                pstm.setString(1,userLike);
                pstm.setString(2,isadmins);
                pstm.setInt(3,offset);
                pstm.setInt(4,pageSize);
            }else{
                pstm.setString(1,isadmins);
                pstm.setInt(2,offset);
                pstm.setInt(3,pageSize);
            }
            System.out.println("爱来自UserDao，您GetList的sql语句长这样：\n"+sql);
            rs = pstm.executeQuery();
            while (rs.next()){
                user = new User();
                user.setUser(rs.getString("user"));
                user.setPwd(rs.getString("pwd"));
                user.setIsadmin(rs.getInt("isadmin"));
                userList.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return userList;
    }

    @Override
    public Integer userAdd(User user) {
        String sql = "INSERT INTO `user` VALUES(?,?,?)";
        Object[] param = new Object[]{user.getUser(), user.getPwd(), user.getIsadmin()};
        return DBManager.executeUpdate(sql,param);
    }

    @Override
    public Integer userDel(String user) {
        String sql = "DELETE FROM `user` WHERE `user`=?";
        Object[] param = new Object[]{user};
        return DBManager.executeUpdate(sql,param);
    }

    @Override
    public Integer userUpdate(User user) {
        String sql = "UPDATE `user` SET `pwd`=?, `isadmin`=? WHERE `user`=?;";
        Object[] param = new Object[]{user.getPwd(), user.getIsadmin(),user.getUser()};
        return DBManager.executeUpdate(sql,param);
    }

    @Override
    public Integer userGetCount(int isadmin,String userLike) {
        Integer maxPage = null;
        String sql = null;
        if(isadmin == 0){
            sql = "SELECT COUNT(*) FROM `user` WHERE `user` LIKE concat('%',?,'%')";
        }else{
            sql = "SELECT COUNT(*) FROM `user` WHERE `isadmin` LIKE ? AND `user` LIKE concat('%',?,'%')";
        }
        try {
            System.out.println("爱来自UserDao，您GetCount的sql语句长这样：\n"+sql);
            pstm = conn.prepareStatement(sql);
            if(isadmin != 0){
                pstm.setInt(1,isadmin);
                pstm.setString(2,userLike);
            }else{
                pstm.setString(1,userLike);
            }
            rs = pstm.executeQuery();
            if(rs.next()){
                maxPage=rs.getInt("COUNT(*)");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return maxPage;
    }
}
