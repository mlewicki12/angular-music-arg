import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BindingService {
  private keyHooks: {[key: string]: {[key: string]: Function}} = {};
  private actionHistory: string[] = [];

  constructor() { }

  registerEvent(name: string, key: string, callback: Function): number {
    if(!this.keyHooks[key]) {
      this.keyHooks[key] = {};
    }

    this.keyHooks[key][name] = callback;
    return Object.keys(this.keyHooks[key]).length;
  }

  pushEvent(key: string): void {
    if(this.keyHooks[key]) {
      Object.keys(this.keyHooks[key]).forEach(val => {
        console.log(`executing key ${val}`);
        this.keyHooks[key][val]();
      });
    }

    this.actionHistory.push(key);
  }

  endEvent(name: string, key: string): void {
    delete this.keyHooks[key][name];
    console.log(`${name} - ${this.keyHooks[key][name]}`);
  }

  endEvents(names: string[], keys: string[]): void {
    names.forEach((val, ind) => {
      this.endEvent(val, keys[ind]);
    });
  }
}
