import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BindingService } from 'src/app/services/binding.service';

@Component({
  selector: 'app-backdoor',
  templateUrl: './backdoor.component.html',
  styleUrls: ['./backdoor.component.scss']
})
export class BackdoorComponent implements OnInit {
  challenges = [
    {
      text: 'To initiate backdoor protocol, complete the following number sequence:',
      success: 'Backdoor protocol initialising',
      sequence: [7, 28, 112, 448, 1792],
      answerIndex: 3,
      answer: '448'
    },
    {
      text: 'Complete the sequence to install packet sniffer:',
      success: 'Packet sniffer installing',
      sequence: [3369, 3693, 6933, 9336],
      answerIndex: 2,
      answer: '6933'
    },
    {
      text: 'Enter missing pin to install rootkit:',
      success: 'Rootkit installing',
      sequence: [144, 233, 377, 610, 987, 1597],
      answerIndex: 2,
      answer: '377'
    },
    {
      text: 'Complete password to gain admin privileges:',
      success: 'Enabling admin privileges',
      sequence: ['Tokyo', 'Delhi', 'Shanghai', 'São Paulo', 'Mexico City'],
      answerIndex: 0,
      answer: 'Tokyo'
    }
  ];

  answer: string = '*****';
  attempts: number = 0;

  challenge: any;
  challengeIndex: number = 0;
  challengeTextPreInput: string;
  challengeTextPostInput: string;

  displayText: string = '0 / 3';
  displayClass: string = 'hide';

  interval: any;
  loading: boolean = false;
  disabled: boolean = false;

  constructor(private binding: BindingService,
              private router: Router) { 
    this.challenge = this.challenges[this.challengeIndex];
    this.challengeTextPreInput = this.challenge.sequence.splice(0, this.challenge.answerIndex).join(', ');
    this.challengeTextPostInput = this.challenge.sequence.splice(1).join(', ');
  }

  ngOnInit(): void {
    this.binding.registerEvent('Enter', () => {
      if(this.answer.trim() === this.challenge.answer) {
        this.displayClass = 'success';
        this.disabled = true;

        this.loadingText(this.challenge.success, 3000, '/hack');
      } else {
        this.attempts += 1;

        if(this.attempts >= 3) {
          this.disabled = true;
          this.attempts = 0;

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
