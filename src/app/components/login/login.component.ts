import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BindingService } from 'src/app/services/binding.service';
import { FileService } from 'src/app/services/file.service';
import { LoginService } from 'src/app/services/login.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: string = "";
  password: string = "";
  displayHack: string = "Click here to start override sequence";
  displayText: string = this.displayHack;

  displayHackText: boolean = false;
  displayPromptText: boolean = false;
  interval: any;

  loadingText: string = "Logging in";

  attemptMade: boolean = false;
  loggedIn: boolean = false;
  loggingIn: boolean = false;

  constructor(private bindingService: BindingService,
              private loginService: LoginService,
              private fileService: FileService,
              private timerService: TimerService,
              private router: Router) {
                this.fileService.setLogTime(new Date());
              }

  ngOnInit(): void {
    this.bindingService.registerEvent('LoginEnter', 'Enter', () => this.processLogin());
  }

  ngOnDestroy(): void {
    this.bindingService.endEvent('LoginEnter', 'Enter');
  }

  processLogin() {
    this.attemptMade = true;
    this.loggedIn = this.loginService.verify(this.login.toLowerCase(), this.password.toLowerCase());
    this.login = this.password = "";

    if(!this.loggedIn) {
      setTimeout(() => {
        this.lerpText();
      }, 400);
    } else {
      this.loggingIn = true;
      this.timerService.loadingText(this.loadingText, 3000, (text: string, last: boolean) => {
        if(last) {
          this.router.navigate(['/files/split']);
        }

        this.loadingText = text;
      });
    }
  }

  lerpText(): void {
    const time = 75;
    const text = this.displayHack;
    
    this.displayText = '_'.repeat(this.displayHack.length);
    let curChar = 0;
    let times = 5;

    this.interval = setInterval(() => {
        if(this.displayText === text) {
          times--;
          this.displayHackText = this.displayPromptText = !this.displayPromptText;

          if(times <= 0) {
            clearInterval(this.interval);
            this.displayHackText = true;
            this.displayPromptText = true;
          }
        } else {
          while(this.displayText.charAt(curChar) !== '_') {
            curChar = Math.floor(Math.random() * this.displayHack.length);
          }

          this.displayText = this.displayText.substring(0, curChar) + text.charAt(curChar) + this.displayText.substring(curChar + 1);
          this.displayHackText = !this.displayHackText;
        }
      }, time);
  }
}
