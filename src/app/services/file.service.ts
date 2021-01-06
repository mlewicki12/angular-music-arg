import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private logFileName?: string;
  getLogFileName() {
    if(!this.logFileName) {
      this.logFileName = '~/log/mikau/access_' + new Date().toLocaleDateString('en-US').replace(/[/]/g, '.') + '.log';
    }

    return this.logFileName;
  }

  constructor() { }
}
