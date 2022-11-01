import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Message } from '../models/message.model';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
  messages: Message[] = [];
  msgCtrl = new FormControl('');
  destroyed$ = new Subject();

  constructor(private webSocket: MessagesService) {}

  ngOnInit() {
    this.webSocket.subject.subscribe();
  }
  sendMessage() {
    this.webSocket.send({ message: this.msgCtrl.value });
    this.msgCtrl.setValue('');
  }
  ngOnDestroy() {
    this.destroyed$.next();
  }
}
