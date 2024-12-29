import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CreateCourseComponent } from './create-course/create-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CreateCourseComponent,
    UpdateCourseComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    HttpClientModule,
    FormsModule

  ]
})
export class AdminPanelModule { }
