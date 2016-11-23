import { CrudService } from './crud.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Datepicker } from './calendar/calendar.component';
import { AngularFireModule } from 'angularfire2';
import { ClarityModule } from 'clarity-angular';

import { AppComponent } from './app.component';
import { WeekdaysComponent } from './weekdays/weekdays.component';
import { AlertComponent } from './alert/alert.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyDreKpY6QAj4KB2DLdPoowrip4tUz9l9Pg',
  authDomain: 'cru5her-d5c06.firebaseapp.com',
  databaseURL: 'https://cru5her-d5c06.firebaseio.com',
  storageBucket: 'cru5her-d5c06.appspot.com',
  messagingSenderId: '1011310184163'
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ClarityModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [
    AppComponent,
    Datepicker,
    WeekdaysComponent,
    AlertComponent
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
