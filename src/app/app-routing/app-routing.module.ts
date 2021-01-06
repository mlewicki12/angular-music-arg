import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackdoorComponent } from '../components/backdoor/backdoor.component';
import { ErrorComponent } from '../components/error/error.component';
import { LogComponent } from '../components/log/log.component';
import { LoginComponent } from '../components/login/login.component';
import { TransitionComponent } from '../components/transition/transition.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'hack', component: TransitionComponent},
  {path: 'backdoor/:id', component: BackdoorComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'log/mikau/:id', component: LogComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }