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

  constructor(private bindingService: BindingService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.bindingService.registerEvent('Enter', () => {
      console.log(
        this.loginService.verify(this.login, this.password)
      );

      this.login = this.password = "";
    });
  }

}
