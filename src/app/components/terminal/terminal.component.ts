import { Component, HostListener, OnInit } from '@angular/core';
import { Step } from 'src/app/types/step';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowUp':
        this.stepActive(-1);
        break;

      case 'ArrowDown':
        this.stepActive(1);
        break;

      case 'Enter':
        this.confirm();
        break;
    }
  }

  step: Step = {
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure " +
                  "dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non " +
                  "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    options: [
      { 
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, " +
              "totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
        id: "first",

        next: ""
      },

      {
        text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti " +
              "atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia " +
              "deserunt mollitia animi, id est laborum et dolorum fuga",
        id: "second",

        next: ""
      }
    ]
  };

  active = 1;

  constructor() { }

  ngOnInit(): void {
  }

  stepActive(diff: number) {
    this.active =  Math.max(
      Math.min(this.active + diff, this.step.options.length - 1),
      0);
  }

  confirm() {
    console.log(this.step.options[this.active].text);
  }
}
