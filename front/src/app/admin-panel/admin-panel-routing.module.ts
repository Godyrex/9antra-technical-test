import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesListComponent} from "./courses-list/courses-list.component";
import {CreateCourseComponent} from "./create-course/create-course.component";
import {UpdateCourseComponent} from "./update-course/update-course.component";

const routes: Routes = [
  {path: '', component: CoursesListComponent},
  {path: 'create', component: CreateCourseComponent},
  {path: 'update/:id', component: UpdateCourseComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
