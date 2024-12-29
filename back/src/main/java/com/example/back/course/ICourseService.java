package com.example.back.course;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICourseService {
    Course createCourse(String title,int price,MultipartFile image);
    Course getCourse(String id);
    List<Course> getCourses();
    Course updateCourse(String id, String title,int price, MultipartFile image);
    void deleteCourse(String id);
    byte[] getImage(String id);
}
