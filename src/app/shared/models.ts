import * as moment from 'moment';

export class Workday {
  date: moment.Moment;
  start: moment.Moment;
  end: moment.Moment;
  break: number;
  _persist: boolean;

  mapToWorkdayEntity(): WorkdayEntity {
    let entity = new WorkdayEntity();
    entity.date = this.date.toDate();
    entity.start = this.start.toDate();
    entity.end = this.end.toDate();
    entity.break = this.break;
    return entity;
  }
}

export class WorkdayEntity {
  date: Date;
  start: Date;
  end: Date;
  break: number;

  mapToWorkday(): Workday {
    let workday = new Workday();
    workday.date = moment(this.date);
    workday.start = moment(this.start);
    workday.end = moment(this.end);
    workday.break = this.break;
    workday._persist = true;
    return workday;
  }
}

export class AlertMessage {
  id: string;
  message: string;
  type: MessageType;
}

export enum MessageType {
  DANGER = <any>'alert-danger',
  WARNING = <any>'alert-warning',
  INFO = <any>'alert-info',
  SUCCESS = <any>'alert-success'
}
