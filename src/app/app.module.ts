
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { LoginComponent } from './components/login/login.component';
import { TransitionComponent } from './components/transition/transition.component';
import { BackdoorComponent } from './components/backdoor/backdoor.component';

import { AutoFocusDirective } from './directives/autofocus';
import { ErrorComponent } from './components/error/error.component';
import { LogComponent } from './components/log/log.component';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    LoginComponent,
    TransitionComponent,
    BackdoorComponent,

    AutoFocusDirective,

    ErrorComponent,

    LogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
