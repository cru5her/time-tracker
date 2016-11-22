import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

const now = new Date();

@Component({
  selector: 'jk-datepicker',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class Datepicker implements OnInit{

  currentDate: NgbDateStruct;
  @Output() weekChanged = new EventEmitter<moment.Moment>();

  ngOnInit() {
    this.selectToday();
  }

  setCurrentMomemt(event: NgbDateStruct) {
    let current = moment('' + event.year + event.month + event.day);
    this.weekChanged.emit(current);
  }

  selectToday() {
    this.currentDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
}