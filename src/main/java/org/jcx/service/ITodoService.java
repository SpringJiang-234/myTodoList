package org.jcx.service;

import org.jcx.model.IsCircle;
import org.jcx.model.Tag;
import org.jcx.model.Todo;

import java.util.List;

public interface ITodoService {
    //后台管理服务
    List<Todo> todoGetList(String idLike, String userLike, String titleLike, String contentLike, Tag tagLike, String classifyLike, String istopLike, IsCircle iscircleLike,String iscomplete, int pageIndex, int pageSize);
    Integer todoAdd(String user, String title, String content, Tag tag, String classify, Integer istop, IsCircle iscircle,Integer iscomplete);
    Integer todoDel(Integer id);
    Integer todoUpdate(Integer id, String user, String title, String content, Tag tag, String classify, Integer istop, IsCircle iscircle,Integer iscomplete);

    Integer todoGetMaxPage(String idLike, String userLike, String titleLike, String contentLike, Tag tagLike, String classifyLike, String istopLike, IsCircle iscircleLike,String iscomplete, int pageSize);

    //客户端服务
    List<Todo> todoGetList2(String idLike, String user, String titleLike, String contentLike, Tag tagLike, String classifyLike, String istopLike, IsCircle iscircleLike,String iscomplete, int pageIndex, int pageSize);
    Integer todoUpdate2(Integer id,Integer iscomplete);
    List<String> todoClassify(String user);
}
