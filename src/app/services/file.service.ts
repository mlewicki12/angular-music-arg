import { Injectable } from '@angular/core';
import filePath from '../../assets/system.json';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private filePath: {[key: string]: any} = filePath;
  private cursor = "/";
  getFile(path: string) {
    this.cursor = path;
    var pathSplit = path.split('/').reverse();
    var key: string;
    var current = this.filePath;

    while(pathSplit.length > 0) {
      key = pathSplit.pop() || '';
      if(key === '' || !current[key]) {
        return {type: 'error', value: `${path} not found`};
      }

      current = current[key];
    }

    return current;
  }

  private logFileName?: string;
  private logStartTime?: Date;
  getLogFileName() {
    if(!this.logFileName) {
      this.logFileName = '/log/access_' + new Date().toLocaleDateString('en-US').replace(/[/]/g, '.') + '.log';
      // create file here
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
    const infoPos = Math.floor(Math.random() * 23) + 1; // generate password position
    const infoString = `username: ${this.userInfo.login}, password: ${this.userInfo.password}`;

    var ret = '';
    for(let i = 0; i < length; ++i) {
      ret += `[${this.logStartTime.toLocaleDateString('en-US')} ${this.logStartTime.toLocaleTimeString('en-US')}]: `;
      if(i === infoPos) {
        ret += `ERROR: ${infoString}`;
      } else if((i + 1) === infoPos) {
        ret += 'ERROR: data overflow detected, dumping login info';
      } else if((i + 1) === length) {
        ret += 'ERROR: i did it on purpose...';
      } else {
        ret += this.generateRandomString();
      }

      ret += '\n';
      this.logStartTime.setSeconds(this.logStartTime.getSeconds() + Math.random() * 7);
    }

    return ret;
  }

  generateRandomString() {
    const chance = Math.random() * 100;
    if(chance < 15) {
      return `ERROR: ${this.errorMessage()}`;
    } else if(chance < 65) {
      return `WARNING: ${this.warningMessage()}`;
    } else return `DEBUG: ${this.debugMessage()}`;
  }

  private debug = ['closed that chapter',
                   'watching life through phantom eyes',
                   'things aren\'t better off this time',
                   'i\'m doing fine',
                   'i just don\'t wanna talk about it',
                   'they told me to stay away',
                   'it gets harder to forget a face',
                   'you thought it out'];
  debugMessage() {
    return this.debug[Math.floor(Math.random() * this.debug.length)];
  }

  private warning = ['do i have to repeat myself?',
                     'hammer growing heavy',
                     'this is me drowning in my sleep',
                     'nausea is building',
                     'what\'s that hanging off your back?',
                     'you did that on purpose',
                     'now i\'ll never be free',
                     'i hope they just hide'];
  warningMessage() {
    return this.warning[Math.floor(Math.random() * this.warning.length)];
  }

  private error = ['sentencing every shiver in my spine to death',
                   'just trying my best to stay in line',
                   'curse cast through my body',
                   'my innocence left me',
                   'float up till your heart stops',
                   'painting still life frames with my insides'];
  errorMessage() {
    return this.error[Math.floor(Math.random() * this.error.length)];
  }

  setLogTime(time: Date) {
    this.logStartTime = time;
  }

  constructor() { }
}
