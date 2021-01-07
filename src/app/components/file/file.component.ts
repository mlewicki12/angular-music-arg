import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  path: string;

  constructor(private route: ActivatedRoute) {
    this.path = this.route.snapshot.paramMap.get('path') || '';
    console.log(this.path);    
  }

  ngOnInit(): void {
  }

}
