import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BindingService } from 'src/app/services/binding.service';

@Component({
  selector: 'app-backdoor',
  templateUrl: './backdoor.component.html',
  styleUrls: ['./backdoor.component.scss']
})
export class BackdoorComponent implements OnInit {
  answer: string = '*****';
  attempts: number = 0;

  displayText: string = '0 / 3';
  displayClass: string = 'hide';

  interval: any;
  loading: boolean = false;
  disabled: boolean = false;

  constructor(private binding: BindingService,
              private router: Router) { }

  ngOnInit(): void {
    this.binding.registerEvent('Enter', () => {
      if(this.answer.trim() === '448') {
        this.displayClass = 'success';
        this.disabled = true;

        this.loadingText('Backdoor protocol initialising', 3000, '/hack');
      } else {
        this.attempts += 1;

        if(this.attempts >= 3) {
          this.disabled = true;

          this.loadingText('Attempt to breach detected, purging', 3000, '/login');
        } else {
          this.displayText = `${this.attempts} / 3`;
          this.displayClass = 'error';
        }

      }
    });
  }

  loadingText(text: string, runtime: number, callback: string) {
    const time = 250;
    const append = ['.', '..', '...'];
    
    let cur = 0;
    let total = runtime / time;

    this.displayText = text;
    this.loading = true;

    this.interval = setInterval(() => {
      this.displayText = text + append[cur];
      cur = (cur + 1) % append.length;
      total--;

      if(total <= 0) {
        clearInterval(this.interval);
        this.displayText = text;
        this.router.navigate([callback]);
      }
    }, time);
  }
}
