import { Workday, WorkdayEntity } from './shared/models';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class CrudService {
  workdayList$: FirebaseListObservable<WorkdayEntity[]>;
  workdayObject$: FirebaseObjectObservable<WorkdayEntity>;
  constructor(private af: AngularFire) {
    this.workdayList$ = af.database.list('workday');
    this.workdayObject$ = af.database.object('workday');
  }

  getList() {
    return this.workdayList$;
  }

  getObj() {

  }

  saveObj(toSave: Workday): firebase.Promise<any> {
    let db$ = this.af.database.object('workday/' + toSave.date.format('YYYY-MM-DD'));
    return db$.update(toSave.mapToWorkdayEntity());
  }

  removeObj(key: string): firebase.Promise<any> {
    let db$ = this.af.database.object('workday/' + key);
    return db$.remove();
  }
}
