import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path: 'home', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)},
  {path: 'admin', loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
