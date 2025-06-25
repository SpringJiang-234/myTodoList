//javaweb servlet通用工具类
package org.jcx.utils;

import com.mchange.v2.c3p0.ComboPooledDataSource;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

public class DBManager {

    private static Properties properties = null;
    private static DataSource dataSource = null;
    private final static String DB_FILE_NAME = "db.properties";
    private static Connection connection = null;

    static {
        properties = new Properties();
        InputStream is = DBManager.class.getClassLoader().getResourceAsStream(DB_FILE_NAME);
        try {
            properties.load(is);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //c3p0连接池
    public static Connection getConnByC3p0() {
        if (dataSource == null) {
            ComboPooledDataSource ds = new ComboPooledDataSource();
            try {
                //根据resources/db.properties改变
                ds.setDriverClass(properties.getProperty("mysql.drvier"));
                ds.setJdbcUrl(properties.getProperty("mysql.url"));
                ds.setUser(properties.getProperty("mysql.user"));
                ds.setPassword(properties.getProperty("mysql.pwd"));
                ds.setMaxPoolSize(10);
                dataSource = ds;
            } catch (PropertyVetoException e) {
                e.printStackTrace();
            }
        }
        if (connection == null) {
            try {
                connection = dataSource.getConnection();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return connection;
    }

    //增删改通用方法
    public static int executeUpdate(String sql, Object[] param) {
        connection = getConnByC3p0();
        PreparedStatement psmt = null;
        try {
            psmt = connection.prepareStatement(sql);
            if (param != null) {
                for (int i = 0; i < param.length; i++) {
                    psmt.setObject(i + 1, param[i]);
                }
            }
            return psmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }
    //通用关闭
    public static void closeAll(ResultSet rs, PreparedStatement psmt, Connection connection) {
        try {
            if (rs != null) {
                rs.close();
            }
            if (psmt != null) {
                psmt.close();
            }
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    //写完一定要测试是否创建成功
    /*
    public static void main(String[] args) {
        System.out.println(getConnByC3p0());
    }
    */

}
