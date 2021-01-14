import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BindingService } from 'src/app/services/binding.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  path: string;
  displayText: string | any[];
  displayLink: boolean;
  upLink: string;

  paths: string[];
  dir: any;
  active: number;
  directory: boolean;

  constructor(private route: ActivatedRoute,
              private file: FileService,
              private binding: BindingService,
              private router: Router) {
    this.displayText = ''; // bc apparently typescript isn't picking up on switch default
    this.displayLink = false;
    this.paths = ['gay']; // dummy element in paths so it doesn't break on division by zero in ArrowDown event

    // i need this here because fuck typescript
    this.directory = false;
    this.active = 0;
    this.upLink = '';
    this.path = ''; // fuck you typescript

    this.route.params.subscribe(params => {
      this.path = params['path'];

      // get the previous path
      let temp = this.path.split('/');
      temp.pop();
      this.upLink = temp.join('/');

      var toDisplay = this.file.getFile(this.path);
      this.getAction(toDisplay);
    });
  }

  getAction(path: any) {
    // reset values
    this.directory = false;
    this.displayLink = false;
    this.active = 0;

    switch(path.type) {
      case 'text':
        this.displayText = path.value.join('\n');
        this.displayLink = true;
        break;

      case 'link':
        // this needs to redirect to right value
        this.getAction(this.file.getFile(path.value));
        break;

      case 'drive':
        // stolen from stackoverflow https://stackoverflow.com/questions/42775017/angular-2-redirect-to-an-external-url-and-open-in-a-new-tab
        const link = document.createElement('a');
        link.target = '_blank';
        link.href = path.value;
        link.setAttribute('visibility', 'hidden');
        link.click();
        this.router.navigate([`files/${this.upLink}`]);
        break;

      case 'error':
        this.displayText = `Error 404: file '${this.path}' not found`;
        break;

      // this means it doesn't have a type parameter, so it's a directory
      default:
        this.directory = true;
        this.paths = Object.keys(path);
        this.dir = path;
        this.active = 0;
        break;
    }
  }

  ngOnInit(): void {
    this.binding.registerEvent('ArrowUp', () => {
      this.active -= 1;
      if(this.active < 0) {
        this.active = this.paths.length - 1;
      }
    });

    this.binding.registerEvent('ArrowDown', () => {
      this.active = (this.active + 1) % this.paths.length;
    });

    this.binding.registerEvent('Enter', () => {
      this.path = `${this.dir[this.paths[this.active]].type === 'link' ? this.dir[this.paths[this.active]].value : `${this.path}/${this.paths[this.active]}`}`;
      this.router.navigate([`/files/${this.path}`]);
    });

    this.binding.registerEvent('Escape', () => {
      this.path = this.upLink;
      this.router.navigate([`/files/${this.path}`]);
    });
  }

}
