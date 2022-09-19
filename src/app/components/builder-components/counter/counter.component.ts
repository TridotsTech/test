import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss','../test/test.component.scss'],
})
export class CounterComponent implements OnInit {
@Input() row;
  constructor(public db:DbService) { }

  ngOnInit() {
   
  }
   
}
