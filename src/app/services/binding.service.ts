import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BindingService {
  private keyHooks: {[key: string]: Function[]} = {};
  private actionHistory: string[] = [];

  constructor() { }

  registerEvent(key: string, callback: Function): number {
    if(this.keyHooks[key]) {
      this.keyHooks[key].push(callback);
    } else {
      this.keyHooks[key] = [callback];
    }

    return this.keyHooks[key].length;
  }

  pushEvent(key: string): void {
    if(this.keyHooks[key]) {
      this.keyHooks[key].forEach(val => {
        val()
      });
    }

    this.actionHistory.push(key);
  }
}
