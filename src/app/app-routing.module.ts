import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BugsComponent } from './components/bugs/bugs.component';

const routes: Routes = [
  { path: 'bugs', component: BugsComponent},
  { path: '', redirectTo: 'bugs', pathMatch: 'full'},
  { path: '**', redirectTo: 'bugs', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
