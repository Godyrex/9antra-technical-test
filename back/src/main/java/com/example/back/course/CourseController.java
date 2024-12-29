package com.example.back.course;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/courses")
@AllArgsConstructor
public class CourseController {
    private final ICourseService courseService;
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getCourses();
    }

    @GetMapping("/{id}")
    public Course getCourseByID(@PathVariable String id) {
        return courseService.getCourse(id);
    }
    @GetMapping("/{id}/image")
    public byte[] getImage(@PathVariable String id) {
        return courseService.getImage(id);
    }
    @PostMapping
    public Course createProduct(@RequestPart("course") Course course, @RequestPart("image") MultipartFile image) {
        return courseService.createCourse(course.getTitle(),course.getPrice(), image);
    }

    @PutMapping("/{id}")
    public Course updateProduct(@PathVariable String id, @RequestPart("course") Course course, @RequestPart(value = "image",required = false) MultipartFile image) {
        return courseService.updateCourse(id, course.getTitle(), course.getPrice(), image);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        courseService.deleteCourse(id);
    }

}
