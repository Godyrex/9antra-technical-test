import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
  course: Course = {};
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private courseService: CourseService, private router: Router) {}

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.course.title && this.selectedFile) {
      this.courseService.createCourse(this.course, this.selectedFile).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
