import {Component, OnInit} from '@angular/core';
import {Course} from "../../models/course";
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses : Course[] = [];
  constructor(
    private courseService: CourseService,
  ) {
  }

  ngOnInit(): void {
        this.loadCourses();
    }
    loadCourses(): void {
        this.courseService.getAllCourses().subscribe((courses) => {
            this.courses = courses;
            this.courses.forEach(course => {
                if (course.image) {
                    this.courseService.getImageBlob(course.id!).subscribe(blob => {
                        course.imageBlob = URL.createObjectURL(blob!);
                    });
                }
            });
        });
    }
}

