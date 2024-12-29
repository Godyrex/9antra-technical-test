import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  course: Course = {};
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseService.getCourseByID(courseId).subscribe(course => {
        this.course = course;
        if (course.image) {
          this.courseService.getImageBlob(course.id!).subscribe(blob => {
            this.imagePreview = URL.createObjectURL(blob!);
          });
        }
      });
    }
  }

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
    if (this.course.title) {
      this.courseService.updateCourse(this.course.id!, this.course, this.selectedFile!).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
