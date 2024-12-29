import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseURL = "http://localhost:8080/courses";

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseURL);
  }

  getCourseByID(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseURL}/${id}`);
  }

  getImage(id: string): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/${id}/image`, { responseType: 'arraybuffer' });
  }
  getImageBlob(id: string)
  {
    return this.getImage(id).pipe(
      map((arrayBuffer: ArrayBuffer) => {
        if (arrayBuffer != null) {
          const blob = new Blob([arrayBuffer], {type: 'image/jpeg'});
          return blob;
        } else {
          return null;
        }
      })
    );
  }
  createCourse( course: Course, image: File): Observable<Course> {
    const formData: FormData = new FormData();
    formData.append('course', new Blob([JSON.stringify(course)], { type: 'application/json' }));
    formData.append('image', image);
    return this.http.post<Course>(this.baseURL, formData);
  }

  updateCourse(id: string,  course: Course, image: File | null): Observable<Course> {
    const formData: FormData = new FormData();
    formData.append('course', new Blob([JSON.stringify(course)], { type: 'application/json' }));
    if (image) {
      formData.append('image', image);
    }
    return this.http.put<Course>(`${this.baseURL}/${id}`, formData);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }
}
