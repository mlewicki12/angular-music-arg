import { Component, OnInit } from '@angular/core';
import { BindingService } from 'src/app/services/binding.service';
import { LoginService } from 'src/app/services/login.service';

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

  attemptMade: boolean = false;
  loggedIn: boolean = false;

  constructor(private bindingService: BindingService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.bindingService.registerEvent('Enter', () => {
      this.login = this.password = "";
      this.attemptMade = true;
      this.loggedIn = this.loginService.verify(this.login, this.password);

      if(!this.loggedIn) {
        setTimeout(() => {
          this.lerpText();
        }, 400);
      }
    });
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
