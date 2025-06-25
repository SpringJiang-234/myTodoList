package org.jcx.model;
//
//public enum Tag {
//    DEFAULT("default"),
//    BLUE("blue"),
//    YELLOW("yellow"),
//    RED("red");
//
//    private final String dbValue;
//
//    Tag(String dbValue) {
//        this.dbValue = dbValue;
//    }
//
//    public String getDbValue() {
//        return dbValue;
//    }
//
//    public static Tag fromDbValue(String dbValue) {
//        for (Tag tag : Tag.values()) {
//            if (tag.getDbValue().equals(dbValue)) {
//                return tag;
//            }
//        }
//        throw new IllegalArgumentException("Unknown database value: " + dbValue);
//    }
//}

public enum Tag {
    DEFAULT("default"),
    RED("red"),
    BLUE("blue"),
    YELLOW("yellow");

    private final String dbValue;

    Tag(String dbValue) {
        this.dbValue = dbValue;
    }

    // 合并后的静态方法
    public static String toDbValue(Tag tag) {
        return tag == null ? "" : tag.dbValue;
    }

    // 反向转换
    public static Tag fromDbValue(String dbValue) {
        if (dbValue == null || dbValue.isEmpty() || "0".equals(dbValue)) {
            return null;
        }
        for (Tag tag : Tag.values()) {
            if (tag.dbValue.equals(dbValue)) {
                return tag;
            }
        }
        throw new IllegalArgumentException("Unknown database value: " + dbValue);
    }
}