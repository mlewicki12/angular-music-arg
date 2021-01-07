import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  link: string;

  constructor(private route: ActivatedRoute) {
    this.link = this.route.snapshot.url.toString().replace(/,/g, '/');
  }

  ngOnInit(): void {
  }

}
