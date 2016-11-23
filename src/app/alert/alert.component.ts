import { AlertMessage } from './../shared/models';
import { Component, OnInit } from '@angular/core';
import { remove } from 'lodash';

@Component({
  selector: 'jk-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  messages: AlertMessage[] = [];

  constructor() { }

  ngOnInit() {
  }

  addMessage(message: AlertMessage) {
    this.messages.push(message);
  }

  removeMessage(message: AlertMessage) {
    remove(this.messages, (obj) => obj.id === message.id);
  }

}
