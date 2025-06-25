package org.jcx.service.impl;

import org.jcx.dao.ITodoDao;
import org.jcx.dao.impl.TodoDaoImpl;
import org.jcx.model.IsCircle;
import org.jcx.model.Tag;
import org.jcx.model.Todo;
import org.jcx.service.ITodoService;

import java.util.List;

public class ToDoServiceImpl implements ITodoService {
    ITodoDao todoDao = new TodoDaoImpl();
    @Override
    public List<Todo> todoGetList(String idLike, String userLike, String titleLike, String contentLike, Tag tagLike, String classifyLike, String istopLike, IsCircle iscircleLike,String iscomplete, int pageIndex, int pageSize) {
        System.out.println("这里是todoGetList的服务现场");
        int offset = (pageIndex-1)*pageSize;
        return todoDao.todoGetList(idLike, userLike, titleLike, contentLike, tagLike, classifyLike, istopLike, iscircleLike,iscomplete, offset, pageSize);
    }

    @Override
    public Integer todoAdd(String user, String title, String content, Tag tag, String classify, Integer istop, IsCircle iscircle,Integer iscomplete) {
        System.out.println("这里是todoAdd的服务现场");
        return todoDao.todoAdd(user, title, content, tag, classify, istop, iscircle,iscomplete);
    }

    @Override
    public Integer todoDel(Integer id) {
        System.out.println("这里是todoDel的服务现场");
        return todoDao.todoDel(id);
    }

    @Override
    public Integer todoUpdate(Integer id, String user, String title, String content, Tag tag, String classify, Integer istop, IsCircle iscircle,Integer iscomplete) {
        System.out.println("这里是todoUpdate的服务现场");
        Todo t = new Todo(id,user, title, content, tag, classify, istop, iscircle,iscomplete);
        System.out.println("6666666666666666"+t);
        return todoDao.todoUpdate(t);
    }

    @Override
    public Integer todoGetMaxPage(String idLike, String userLike, String titleLike, String contentLike, Tag tagLike, String classifyLike, String istopLike, IsCircle iscircleLike, String iscomplete,int pageSize) {
        System.out.println("这里是todoGetMaxPage的服务现场");
        Integer count = todoDao.todoGetCount(idLike, userLike, titleLike, contentLike, tagLike, classifyLike, istopLike, iscircleLike,iscomplete,pageSize);
        Integer maxPage = (count%pageSize==0) ? (count/pageSize) : (count/pageSize+1);
        return maxPage;
    }

    @Override
    public List<Todo> todoGetList2(String idLike, String user, String titleLike, String contentLike, Tag tagLike, String classifyLike, String istopLike, IsCircle iscircleLike,String iscomplete, int pageIndex, int pageSize) {
        System.out.println("这里是todoGetList2的服务现场");
        int offset = (pageIndex-1)*pageSize;
        return todoDao.todoGetList2(idLike, user, titleLike, contentLike, tagLike, classifyLike, istopLike, iscircleLike,iscomplete, offset, pageSize);
    }

    @Override
    public Integer todoUpdate2(Integer id, Integer iscomplete) {
        if(iscomplete==1)   iscomplete=2;
        else iscomplete=1;
        System.out.println("这里是todoUpdate2的服务现场");
        return todoDao.todoUpdate2(id,iscomplete);
    }

    @Override
    public List<String> todoClassify(String user) {
        return todoDao.todoClassify(user);
    }
}
