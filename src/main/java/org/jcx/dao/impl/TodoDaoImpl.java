package org.jcx.dao.impl;

import org.jcx.dao.ITodoDao;

import org.jcx.model.Tag;
import org.jcx.model.IsCircle;
import org.jcx.model.Todo;
import org.jcx.utils.DBManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TodoDaoImpl implements ITodoDao {
    Connection conn = DBManager.getConnByC3p0();
    PreparedStatement pstm = null;
    ResultSet rs = null;

    @Override
    public List<Todo> todoGetList(String idLike, String userLike, String titleLike, String contentLike, Tag tagLike, String classifyLike, String istopLike, IsCircle iscircleLike,String iscomplete, int offset, int pageSize) {
        List<Todo> todoList = new ArrayList<>();
        Todo todo = null;

        String sql = "SELECT * FROM `todo` WHERE "
                +"`id` LIKE concat('%',?,'%') AND "
                +"`user` LIKE concat('%',?,'%') AND "
                +"`title` LIKE concat('%',?,'%') AND "
                +"`content` LIKE concat('%',?,'%') AND "
                +"`tag` LIKE concat('%',?,'%') AND "
                +"`classify` LIKE concat('%',?,'%') AND "
                +"`istop` LIKE concat('%',?,'%') AND "
                +"`iscircle` LIKE concat('%',?,'%') AND"
                +"`iscomplete` LIKE concat('%',?,'%')"
                +" LIMIT ?,?";
        try {
            pstm = conn.prepareStatement(sql);
            pstm.setString(1,idLike);
            pstm.setString(2,userLike);
            pstm.setString(3,titleLike);
            pstm.setString(4,contentLike);
            pstm.setString(5,Tag.toDbValue(tagLike));
            pstm.setString(6,classifyLike);
            pstm.setString(7,istopLike);
            pstm.setString(8,IsCircle.toDbValue(iscircleLike));
            pstm.setString(9,iscomplete);
            pstm.setInt(10,offset);
            pstm.setInt(11,pageSize);
            System.out.println("爱来自TodoDao，您GetList的sql语句长这样：\n"+sql);
            rs = pstm.executeQuery();
            while (rs.next()){
                todo = new Todo();
                todo.setId(rs.getInt("id"));
                todo.setUser(rs.getString("user"));
                todo.setTitle(rs.getString("title"));
                todo.setContent(rs.getString("content"));
                todo.setTag(Tag.fromDbValue(rs.getString("tag")));
                todo.setClassify(rs.getString("classify"));
                todo.setIstop(rs.getInt("istop"));
                todo.setIscircle(IsCircle.fromDbValue(rs.getString("iscircle")));
                todo.setIscomplete(rs.getInt("iscomplete"));
                todoList.add(todo);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return todoList;
    }

    @Override
    public Integer todoAdd(String user, String title, String content, Tag tag, String classify, Integer istop, IsCircle iscircle,Integer iscomplete) {
        String tagString = Tag.toDbValue(tag);
        String iscircleString = IsCircle.toDbValue(iscircle);
        String sql = "INSERT INTO `todo` (`user`,`title`,`content`,`tag`,`classify`,`istop`,`iscircle`,`iscomplete`) VALUES(?,?,?,?,?,?,?,?)";
        Object[] param = new Object[]{user,title,content,tagString,classify,istop,iscircleString,iscomplete};
        return DBManager.executeUpdate(sql,param);
    }

    @Override
    public Integer todoDel(Integer id) {
        String sql = "DELETE FROM `todo` WHERE `id`=?";
        Object[] param = new Object[]{id};
        return DBManager.executeUpdate(sql,param);
    }

    @Override
    public Integer todoUpdate(Todo todo) {
        String sql = "UPDATE `todo` SET `user`=? ,`title`=? ,`content`=? ,`tag`=? ,`classify`=? ,`istop`=? ,`iscircle`=?,`iscomplete`=?  WHERE `id`=?";
        Object[] param = new Object[]{todo.getUser(),todo.getTitle(),todo.getContent(),Tag.toDbValue(todo.getTag()),todo.getClassify(), todo.getIstop(),IsCircle.toDbValue(todo.getIscircle()),todo.getIscomplete(),todo.getId()};
        return DBManager.executeUpdate(sql,param);
    }

    @Override
    public Integer todoGetCount(String idLike, String userLike, String titleLike, String contentLike, Tag tagLike, String classifyLike, String istopLike, IsCircle iscircleLike,String iscomplete, int pageSize) {
        Integer maxPage = null;
        String sql = "SELECT COUNT(*) FROM `todo` WHERE "
                +"`id` LIKE concat('%',?,'%') AND "
                +"`user` LIKE concat('%',?,'%') AND "
                +"`title` LIKE concat('%',?,'%') AND "
                +"`content` LIKE concat('%',?,'%') AND "
                +"`tag` LIKE concat('%',?,'%') AND "
                +"`classify` LIKE concat('%',?,'%') AND "
                +"`istop` LIKE concat('%',?,'%') AND "
                +"`iscircle` LIKE concat('%',?,'%') AND"
                +"`iscomplete` LIKE concat('%',?,'%')";
        try {
            pstm = conn.prepareStatement(sql);
            pstm.setString(1,idLike);
            pstm.setString(2,userLike);
            pstm.setString(3,titleLike);
            pstm.setString(4,contentLike);
            pstm.setString(5,Tag.toDbValue(tagLike));
            pstm.setString(6,classifyLike);
            pstm.setString(7,istopLike);
            pstm.setString(8,IsCircle.toDbValue(iscircleLike));
            pstm.setString(9,iscomplete);

            System.out.println("爱来自TodoDao，您GetCount的sql语句长这样：\n"+sql);
            rs = pstm.executeQuery();
            if(rs.next()){
                maxPage=rs.getInt("COUNT(*)");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return maxPage;

    }

    @Override
    public List<Todo> todoGetList2(String idLike, String user, String titleLike, String contentLike, Tag tagLike, String classifyLike, String istopLike, IsCircle iscircleLike,String iscomplete, int offset, int pageSize) {
        List<Todo> todoList = new ArrayList<>();
        Todo todo = null;
        String sql;
        boolean flag=(classifyLike==null||classifyLike.equals(""));
        if(flag){
             sql = "SELECT * FROM `todo` WHERE "
                    +"`id` LIKE concat('%',?,'%') AND "
                    +"`user` LIKE ? AND "
                    +"`title` LIKE concat('%',?,'%') AND "
                    +"`content` LIKE concat('%',?,'%') AND "
                    +"`tag` LIKE concat('%',?,'%') AND "
                    +"`istop` LIKE concat('%',?,'%') AND "
                    +"`iscircle` LIKE concat('%',?,'%') AND"
                    +"`iscomplete` LIKE concat('%',?,'%')"
                    +" LIMIT ?,?";
        }else{
            sql = "SELECT * FROM `todo` WHERE "
                    +"`id` LIKE concat('%',?,'%') AND "
                    +"`user` LIKE ? AND "
                    +"`title` LIKE concat('%',?,'%') AND "
                    +"`content` LIKE concat('%',?,'%') AND "
                    +"`tag` LIKE concat('%',?,'%') AND "
                    +"`classify` LIKE ? AND "
                    +"`istop` LIKE concat('%',?,'%') AND "
                    +"`iscircle` LIKE concat('%',?,'%') AND"
                    +"`iscomplete` LIKE concat('%',?,'%')"
                    +" LIMIT ?,?";
        }

        try {
            if(flag){
                pstm = conn.prepareStatement(sql);
                pstm.setString(1,idLike);
                pstm.setString(2,user);
                pstm.setString(3,titleLike);
                pstm.setString(4,contentLike);
                pstm.setString(5,Tag.toDbValue(tagLike));
                pstm.setString(6,istopLike);
                pstm.setString(7,IsCircle.toDbValue(iscircleLike));
                pstm.setString(8,iscomplete);
                pstm.setInt(9,offset);
                pstm.setInt(10,pageSize);
            }else{
                pstm = conn.prepareStatement(sql);
                pstm.setString(1,idLike);
                pstm.setString(2,user);
                pstm.setString(3,titleLike);
                pstm.setString(4,contentLike);
                pstm.setString(5,Tag.toDbValue(tagLike));
                pstm.setString(6,classifyLike);
                pstm.setString(7,istopLike);
                pstm.setString(8,IsCircle.toDbValue(iscircleLike));
                pstm.setString(9,iscomplete);
                pstm.setInt(10,offset);
                pstm.setInt(11,pageSize);
            }
            System.out.println("爱来自TodoDao，您GetList2的sql语句长这样：\n"+sql);
            rs = pstm.executeQuery();
            while (rs.next()){
                todo = new Todo();
                todo.setId(rs.getInt("id"));
                todo.setUser(rs.getString("user"));
                todo.setTitle(rs.getString("title"));
                todo.setContent(rs.getString("content"));
                todo.setTag(Tag.fromDbValue(rs.getString("tag")));
                todo.setClassify(rs.getString("classify"));
                todo.setIstop(rs.getInt("istop"));
                todo.setIscircle(IsCircle.fromDbValue(rs.getString("iscircle")));
                todo.setIscomplete(rs.getInt("iscomplete"));
                todoList.add(todo);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return todoList;
    }

    @Override
    public Integer todoUpdate2(Integer id, Integer iscomplete) {
        String sql = "UPDATE `todo` SET `iscomplete`=?  WHERE `id`=?";
        Object[] param = new Object[]{iscomplete,id};
        return DBManager.executeUpdate(sql,param);
    }

    @Override
    public List<String> todoClassify(String user) {
        List<String> classifyList = new ArrayList<>();

        String sql = "SELECT DISTINCT classify FROM `todo` WHERE "
                +"`user` LIKE ?";
        try {
            pstm = conn.prepareStatement(sql);
            pstm.setString(1,user);
            System.out.println("爱来自TodoDao，您Classify的sql语句长这样：\n"+sql);
            rs = pstm.executeQuery();
            while (rs.next()){
                classifyList.add(rs.getString("classify"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return classifyList;
    }

}
