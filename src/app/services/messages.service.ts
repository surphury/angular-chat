import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  subject = webSocket<Message>('ws://localhost:8080');
  messages: Message[] = [];
  /* msgCtrl = new FormControl(''); */
  destroyed$ = new Subject<Message>();
  connect = (): Observable<Message> => {};

  constructor(private message: MessagesService) {
    this.subject.subscribe({
      next: (msg) => console.log(`message received: "${msg}"`), // Called whenever there is a message from the server.
      error: (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete'), // Called when connection is closed (for whatever reason).
    });
  }
}
