import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses = [
    { title: 'Spring Boot / Angular', price: 350 },
    { title: 'Node JS / React', price: 350 },
    { title: 'Flutter / Firebase', price: 350 },
    { title: 'Business Intelligence', price: 350 },
    { title: 'Artificial Intelligence', price: 350 },
    { title: 'DevOps', price: 350 }
  ];
}

