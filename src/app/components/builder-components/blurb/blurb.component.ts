import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-blurb',
  templateUrl: './blurb.component.html',
  styleUrls: ['./blurb.component.scss','../test/test.component.scss'],
})
export class BlurbComponent implements OnInit {
  @Input() row;
  constructor(public db:DbService) { }

  ngOnInit() {}

}
