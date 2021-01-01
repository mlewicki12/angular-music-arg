
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { LoginComponent } from './components/login/login.component';
import { TransitionComponent } from './components/transition/transition.component';

import { AutoFocusDirective } from './directives/autofocus';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    LoginComponent,
    TransitionComponent,

    AutoFocusDirective,
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
