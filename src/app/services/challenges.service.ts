import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {
  challenges = [
    {
      text: 'To initiate backdoor protocol, complete the following number sequence:',
      success: 'Backdoor protocol initialising',
      sequence: [7, 28, 112, 448, 1792],
      answerIndex: 3,
      answer: '448',
      redirect: 1
    },
    {
      text: 'Complete the sequence to install packet sniffer:',
      success: 'Packet sniffer installing',
      sequence: [3369, 3693, 6933, 9336],
      answerIndex: 2,
      answer: '6933',
      redirect: 2
    },
    {
      text: 'Enter missing pin to install rootkit:',
      success: 'Rootkit installing',
      sequence: [144, 233, 377, 610, 987, 1597],
      answerIndex: 2,
      answer: '377',
      redirect: 3
    },
    {
      text: 'Complete password to gain admin privileges:',
      success: 'Enabling admin privileges',
      sequence: ['Tokyo', 'Delhi', 'Shanghai', 'São Paulo', 'Mexico City'],
      answerIndex: 0,
      answer: 'Tokyo',
      redirect: ['/login']
    }
  ];

  constructor() { }

  getChallenge(index: number) {
    if(index >= this.challenges.length) {
      return false;
    }

    return this.challenges[index];
  }
}
