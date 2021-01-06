import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  displayText = 'Please wait, accessing admin privileges';
  displayClass = '';
  errorText = 'STOP: c0000021a (FATAL SYSTEM ERROR)\nThe verification of a knownDLL failed.\n' +
                'The following user (razorxblade) is not authorized to access admin \n' +
                'privileges.\n\n' +
                'Please refer to the error log for more details.';


  fileName: string; 
  loading: boolean = true;

  constructor(private file: FileService,
              private timer: TimerService) { 
    this.fileName = file.getLogFileName();
  }

  ngOnInit(): void {
    const time = 3500;
    setTimeout(() => {
      this.displayText = this.errorText;
      this.loading = false;
      this.displayClass = 'error';
    }, time);

    this.timer.loadingText(this.displayText, 3500, (text: string, last: boolean) => {
      this.displayText = text;

      if(last) {
        this.displayText = this.errorText;
        this.loading = false;
        this.displayClass = 'error';
      }
    });
  }

}
