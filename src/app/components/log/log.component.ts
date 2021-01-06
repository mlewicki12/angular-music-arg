import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  displayText: string;

  constructor(private file: FileService) {
    this.displayText = this.file.generateLogFile();
  }

  ngOnInit(): void {
  }

}
