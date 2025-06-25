package org.jcx.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String user;
    private String pwd;
    private Integer isadmin;
}
