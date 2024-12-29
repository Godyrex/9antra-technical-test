import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe((courses) => {
      this.courses = courses;
      this.courses.forEach(course => {
        if (course.image) {
          this.courseService.getImageBlob(course.id!).subscribe(blob => {
            course.imageBlob = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob!));
          });
        }
      });
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['admin/create']);
  }

  navigateToUpdate(id: string | undefined): void {
    this.router.navigate(['admin/update', id]);
  }

  deleteCourse(id: string | undefined): void {
    if (id) {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.loadCourses();
      });
    }
  }
}
