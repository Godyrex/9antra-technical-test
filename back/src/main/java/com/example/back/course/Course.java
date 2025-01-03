package com.example.back.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    private String id;
    private String title;
    private int price;
    private String image;
}
