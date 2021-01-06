import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  loadingText(text: string, runtime: number, callback: Function) {
    const time = 250;
    const append = ['.', '..', '...'];
    
    let cur = 0;
    let total = runtime / time;

    //this.displayText = text;
    //this.loading = true;

    const interval = setInterval(() => {
      callback(text + append[cur]);
      cur = (cur + 1) % append.length;
      total--;

      if(total <= 0) {
        clearInterval(interval);
        callback(text, true);
      }
    }, time);
  }
}
