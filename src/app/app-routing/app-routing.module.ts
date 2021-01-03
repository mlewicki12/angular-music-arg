import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackdoorComponent } from '../components/backdoor/backdoor.component';
import { LoginComponent } from '../components/login/login.component';
import { TransitionComponent } from '../components/transition/transition.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'hack', component: TransitionComponent},
  {path: 'backdoor/:id', component: BackdoorComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }