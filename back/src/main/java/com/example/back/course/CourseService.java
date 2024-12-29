package com.example.back.course;

import com.example.back.exceptions.CourseNotFoundException;
import com.example.back.exceptions.EmptyCourseException;
import com.example.back.exceptions.ImageNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CourseService implements ICourseService {
    private final CourseRepository courseRepository;

    @Override
    public Course createCourse(String title,int price, MultipartFile image) {

        if (title != null && !title.isEmpty() && image != null) {
            String imagePath = saveImage(image);
            Course course = Course.builder()
                    .title(title)
                    .image(imagePath)
                    .price(price)
                    .build();
            return courseRepository.save(course);
        }else{
            throw new EmptyCourseException("Title and image are required");
        }
    }

    @Override
    public Course getCourse(String id) {
        return courseRepository.findById(id).orElse(null);
    }

    @Override
    public List<Course> getCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course updateCourse(String id, String title,int price, MultipartFile image) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
        if (title != null && !title.isEmpty()) {
            course.setTitle(title);
        }else{
            throw new EmptyCourseException("Title is required");
        }
        if (image != null) {
            String imagePath = saveImage(image);
            course.setImage(imagePath);
        }
        course.setPrice(price);
        return courseRepository.save(course);
    }
    @Override
    public void deleteCourse(String id) {
        courseRepository.deleteById(id);
    }

    @Override
    public byte[] getImage(String id) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new CourseNotFoundException("Course not found"));
        if (course.getImage() != null) {
            try {
                byte[] image = Files.readAllBytes(new File(course.getImage()).toPath());
                return image;
            } catch (IOException e) {
                throw new RuntimeException("Failed to read image", e);
            }
        }else {
            throw new ImageNotFoundException("Image not found");
        }
    }
    private String saveImage(MultipartFile image) {
        try {
            // Define the folder path where the images will be saved
            String folderPath = "C:/courses/";
            // Create the folder if it doesn't exist
            File folder = new File(folderPath);
            if (!folder.exists()) {
                folder.mkdirs();
            }
            // Save the image file
            String filePath = folderPath + UUID.randomUUID() + image.getOriginalFilename();
            File file = new File(filePath);
            image.transferTo(file);
            return filePath;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image", e);
        }
    }
}
