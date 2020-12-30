import { Component, HostListener, OnInit } from '@angular/core';
import { BindingService } from 'src/app/services/binding.service';
import { Step } from 'src/app/types/step';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.binding.pushEvent(event.key);
  }

  constructor(private binding: BindingService) { }

  ngOnInit(): void {
  }
}
