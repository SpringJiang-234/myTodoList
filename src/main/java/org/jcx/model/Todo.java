package org.jcx.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Todo {
    private Integer id;
    private String user;
    private String title;
    private String content;
    private Tag tag;
    private String classify;
    private Integer istop;
    private IsCircle iscircle;
    private Integer iscomplete;
}
