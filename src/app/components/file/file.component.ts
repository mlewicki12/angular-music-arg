import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  path: string;
  displayText: string;

  constructor(private route: ActivatedRoute,
              private file: FileService) {
    this.path = this.route.snapshot.paramMap.get('path') || '';
    var toDisplay = this.file.getFile(this.path);
    this.displayText = ''; // bc apparently typescript isn't picking up on switch default

    switch(toDisplay.type) {
      case 'text':
        this.displayText = toDisplay.value.join('\n');
        break;

      case 'link':
        this.displayText = toDisplay.value;
        break;

      case 'drive':
        // stolen from stackoverflow https://stackoverflow.com/questions/42775017/angular-2-redirect-to-an-external-url-and-open-in-a-new-tab
        const link = document.createElement('a');
        link.target = '_blank';
        link.href = toDisplay.value;
        link.setAttribute('visibility', 'hidden');
        link.click();
        break;

      case 'error':
      default:
        this.displayText = `Error 404: file ${this.path} not found`;
    }
  }

  ngOnInit(): void {
  }

}
