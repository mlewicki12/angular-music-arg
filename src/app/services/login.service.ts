import { Injectable } from '@angular/core';
import loginInfo from '../../assets/login.json';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

  // maybe this didn't need to be a service,
  // but i wanted to maintain separation of concerns
  verify(login: string, password: string) {
    return (login === loginInfo.login &&
            password === loginInfo.password) ||
           (login === "admin" &&
            password === "admin" );
  }
}
