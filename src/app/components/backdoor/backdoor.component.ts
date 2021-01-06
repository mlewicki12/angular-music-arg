import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BindingService } from 'src/app/services/binding.service';
import { ChallengesService } from 'src/app/services/challenges.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-backdoor',
  templateUrl: './backdoor.component.html',
  styleUrls: ['./backdoor.component.scss']
})
export class BackdoorComponent implements OnInit {
  answer: string = '*****';
  attempts: number = 0;

  challenge: any;
  challengeIndex: number = 0;
  challengeTextPreInput: string = "";
  challengeTextPostInput: string = "";

  displayText: string = '0 / 3';
  displayClass: string = 'hide';
  failText: string = 'Attempt to breach detected, purging';

  interval: any;
  loading: boolean = false;
  disabled: boolean = false;

  constructor(private binding: BindingService,
              private timer: TimerService,
              private router: Router,
              private challenges: ChallengesService,
              private route: ActivatedRoute) { 
    this.challengeIndex = +(this.route.snapshot.paramMap.get('id') || 0);
    this.loadChallenge(this.challengeIndex);
  }

  loadChallenge(index: number) {
    this.challenge = this.challenges.getChallenge(index);

    let response = this.challenge.sequence.slice();
    this.challengeTextPreInput = response.splice(0, this.challenge.answerIndex).join(', ');
    this.challengeTextPostInput = response.splice(1).join(', ');

    // reset values pog
    this.answer = '*****';
    this.attempts = 0;
    this.displayText = '0 / 3';
    this.displayClass = 'hide';
    this.loading = false;
    this.disabled = false;
  }

  ngOnInit(): void {
    this.binding.registerEvent('Enter', () => {
      if(this.answer.trim() === this.challenge.answer) {
        this.displayClass = 'success';
        this.disabled = true;

        this.displayText = this.challenge.success;
        this.loading = true;
        this.timer.loadingText(this.challenge.success, 3000, (text: string, last: boolean) => {
          if(last) {
            this.redirect();
          }

          this.displayText = text;
        })
      } else {
        this.attempts += 1;

        if(this.attempts >= 3) {
          this.disabled = true;
          this.attempts = 0;

          this.displayText = this.failText;
          this.loading = true;
          this.timer.loadingText(this.failText, 3000, (text: string, last: boolean) => {
            if(last) {
              this.redirect();
            }

            this.displayText = text;
          });
        } else {
          this.displayText = `${this.attempts} / 3`;
          this.displayClass = 'error';
        }

      }
    });
  }

  // TODO: make challenge type
  redirect() {
    if(typeof this.challenge.redirect === 'number') {
      this.loadChallenge(this.challenge.redirect);
    } else {
      this.router.navigate(this.challenge.redirect);
    }
  }
}
