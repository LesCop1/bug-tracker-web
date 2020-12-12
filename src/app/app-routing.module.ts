import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BugsComponent } from './components/bugs/bugs.component';
import { DetailsComponent } from './components/bugs/details/details.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'bugs', component: BugsComponent},
  { path: 'bugs/:id', component: DetailsComponent},
  { path: 'users', component: UsersComponent},
  { path: 'users/:username', component: ProfileComponent},
  { path: '', redirectTo: 'bugs', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
