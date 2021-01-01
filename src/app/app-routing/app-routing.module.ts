import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { TransitionComponent } from '../components/transition/transition.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'hack', component: TransitionComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }