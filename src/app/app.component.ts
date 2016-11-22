import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zeiterfassung';
  currentDate: moment.Moment = moment();

  setWeek(currentDate: moment.Moment) {
    this.currentDate = currentDate;
  }
}
