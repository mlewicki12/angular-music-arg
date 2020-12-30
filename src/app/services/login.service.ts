import { Injectable } from '@angular/core';
import loginInfo from '../../login.json';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

  // maybe this didn't need to be a service,
  // but i wanted to maintain separation of concerns
  verify(login: string, password: string) {
    return loginInfo.login === login &&
            loginInfo.password === password;
  }
}
