//package org.jcx.model;
//
//public enum IsCircle {
//    DEFAULT("default"),
//    DAY("day"),
//    WEEK("week");
//
//    private final String dbValue;
//
//    IsCircle(String dbValue) {
//        this.dbValue = dbValue;
//    }
//
//    public String getDbValue() {
//        return dbValue;
//    }
//
//    public static IsCircle fromDbValue(String dbValue) {
//        for (IsCircle isCircle : IsCircle.values()) {
//            if (isCircle.getDbValue().equals(dbValue)) {
//                return isCircle;
//            }
//        }
//        throw new IllegalArgumentException("Unknown database value: " + dbValue);
//    }
//}

package org.jcx.model;

public enum IsCircle {
    DEFAULT("default"),
    DAY("day"),
    WEEK("week");

    private final String dbValue;

    IsCircle(String dbValue) {
        this.dbValue = dbValue;
    }

    // 静态方法：null转空字符串
    public static String toDbValue(IsCircle isCircle) {
        return isCircle == null ? "" : isCircle.dbValue;
    }

    // 静态方法：空字符串或null转null
    public static IsCircle fromDbValue(String dbValue) {
        if (dbValue == null || dbValue.isEmpty() || "0".equals(dbValue)) {
            return null;
        }
        for (IsCircle isCircle : IsCircle.values()) {
            if (isCircle.dbValue.equals(dbValue)) {
                return isCircle;
            }
        }
        throw new IllegalArgumentException("Unknown database value: " + dbValue);
    }
}