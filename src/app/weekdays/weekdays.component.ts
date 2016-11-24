import { AlertComponent } from './../alert/alert.component';
import { element } from 'protractor';
import { CrudService } from './../crud.service';
import { Workday, WorkdayEntity, MessageType } from './../shared/models';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { cloneDeep, keyBy, uniqueId } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'jk-weekdays',
  templateUrl: './weekdays.component.html',
  styleUrls: ['./weekdays.component.css']
})
export class WeekdaysComponent implements OnInit {

  _date: moment.Moment;
  days: Workday[] = [];
  editModalState: boolean = false;
  deleteModalState: boolean = false;
  editWorkdayEntry: Workday;
  startTime: String;
  endTime: String;
  data: FirebaseListObservable<Workday[]>;
  list: WorkdayEntity[] = [];
  deletePromise: Promise<any>;
  showError: boolean = false;

  private deleteKey: string;
  @ViewChild(AlertComponent)
  private alertCmp;

  @Input()
  set currentDate(date: moment.Moment) {
    if (date) {
      this._date = date;
      this._initWeek(date);
    }
  }

  get currentDate() {
    return this.currentDate;
  }

  constructor(private db: CrudService) { }

   ngOnInit() {
     this.db.getList();
   }


  openWorkdayEdit(current: Workday) {
    this.editModalState = true;
    this.editWorkdayEntry = current;
  }

  getDifference(start: moment.Moment, end: moment.Moment, timeBreak?: number) {
    if (!start || !end) {
      return null;
    }
    return {
      withoutBreak: moment.utc(end.diff(start)),
      withBreak: moment.utc(end.diff(start)).subtract(timeBreak, 'minutes')
    };
  }

  getSum() {
    let sum: moment.Duration = moment.duration(0);
    this.days.forEach((day) => {
      let current = this.getDifference(day.start, day.end, day.break);
      if (current) {
        sum.add(current.withBreak.hour(), 'hour');
        sum.add(current.withBreak.minute(), 'minute');
      }
    });
    let hours = Math.floor(sum.asHours());
    let mins = Math.floor(sum.asMinutes()) - hours * 60;
    return (hours < 10 ? hours + '0' : hours) + ':' + (mins < 10 ? mins + '0' : mins);
  }

  saveWorkday(toSave: Workday, form: any) {
    if (form.invalid) {
      this.showError = true;
      return;
    }
    let start = this.startTime.split(':');
    let end = this.endTime.split(':');
    toSave.start.set('hour', parseInt(start[0], 0));
    toSave.start.set('minute', parseInt(start[1], 0));
    toSave.end.set('hour', parseInt(end[0], 0));
    toSave.end.set('minute', parseInt(end[1], 0));
    if (!toSave.break) { toSave.break = 0; }
    toSave._persist = true;

    this.db.saveObj(toSave).then(() => {
        this.editModalState = false;
        this.editWorkdayEntry = null;
        this.startTime = null;
        this.endTime = null;
        this.showError = false;
        this.alertCmp.addMessage({
          id: uniqueId('msg-'),
          message: 'Eintrag wurde erfolgreiche erstellt',
          type: MessageType.SUCCESS
        });
    });
  }

  openDeleteConfirmation(key: string) {
    this.deleteModalState = true;
    this.deleteKey = key;
  }

  cancelDelete() {
    this.deleteModalState = false;
    this.deleteKey = null;
  }

  removeWorkday() {
    this.db.removeObj(this.deleteKey);
    this.deleteModalState = false;
    this.alertCmp.addMessage({
      id: uniqueId('msg-'),
      message: 'Eintrag wurde erfolgreiche gelöscht',
      type: MessageType.SUCCESS
    });
    console.log('fmdl');
  }

  private _initWeek(current: moment.Moment) {
    this.db.getList()
      .subscribe((data) => {
        this.days = [];
        for (let i = 1; i < 6; i++) {
          let dataByDate = keyBy(data, '$key');
          let currentDate = current.days(i).format('YYYY-MM-DD');
          if (dataByDate[currentDate]) {
            this.days.push(this.mapToWorkday(dataByDate[currentDate]));
          } else {
            let day = new Workday();
            day.date = cloneDeep(current.days(i));
            day.start = cloneDeep(current.days(i));
            day.end = cloneDeep(current.days(i));
            this.days.push(day);
          }
        }
      });
  }

  private mapToWorkday(workdayEntity: WorkdayEntity): Workday {
    let workday = new Workday();
    workday.date = moment(workdayEntity.date);
    workday.start = moment(workdayEntity.start);
    workday.end = moment(workdayEntity.end);
    workday.break = workdayEntity.break;
    workday._persist = true;
    return workday;
  }

}

