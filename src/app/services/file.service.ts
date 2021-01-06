import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private logFileName?: string;
  private logStartTime?: Date;
  getLogFileName() {
    if(!this.logFileName) {
      this.logFileName = '/log/mikau/access_' + new Date().toLocaleDateString('en-US').replace(/[/]/g, '.') + '.log';
    }

    return this.logFileName;
  }

  private userInfo = {
    login: 'razorxblade',
    password: 'dosexmachina'
  }
  generateLogFile() {
    if(!this.logStartTime) {
      this.logStartTime = new Date();
    }

    const length = 25; // generate total length
    const infoPos = Math.floor(Math.random() * 24) + 1; // generate password position
    const infoString = `login: ${this.userInfo.login}, password: ${this.userInfo.password}`;

    var ret = '';
    for(let i = 0; i < length; ++i) {
      ret += `[${this.logStartTime.toLocaleDateString('en-US')} ${this.logStartTime.toLocaleTimeString('en-US')}]: `;
      if(i === infoPos) {
        ret += `ERROR: ${infoString}`;
      } else if((i + 1) === infoPos) {
        ret += 'ERROR: data overflow detected, dumping login info';
      } else {
        ret += `${this.generateRandomString()}: random string`;
      }

      ret += '\n';
      this.logStartTime.setSeconds(this.logStartTime.getSeconds() + Math.random() * 7);
    }

    return ret;
  }

  generateRandomString() {
    const chance = Math.random() * 100;
    if(chance < 15) {
      return 'ERROR';
    } else if(chance < 45) {
      return 'WARNING'
    } else return 'DEBUG';
  }

  private debug = [];
  debugMessage() {
    return this.debug[Math.floor(Math.random() * this.debug.length)];
  }

  private warning = [];
  warningMessage() {
    return this.warning[Math.floor(Math.random() * this.warning.length)];
  }

  private error = ['cache overflow detected, attempting to fix...',
                   'OutOfRangeException thrown in '];
  errorMessage() {
    return this.error[Math.floor(Math.random() * this.error.length)];
  }

  setLogTime(time: Date) {
    this.logStartTime = time;
  }

  constructor() { }
}
