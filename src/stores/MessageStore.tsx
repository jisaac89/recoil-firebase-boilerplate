import {observable, computed, ObservableMap, toJS} from 'mobx';
import * as firebase from 'firebase';
import fire from '../fire.js';

import BaseStore from './BaseStore';

export class MessageStore extends BaseStore {

  @observable message : string = '';
  @observable shouldScroll : boolean = true;
  @observable typing : boolean = false;

  constructor(){
    super('messages');
  }

  add() {
    const self = this;
    const messagesRef = fire.database().ref(this.ref);
    const id = messagesRef.push().key;
    this.update(id, {
      id: id,
      title: this.message
    });

    this.message = '';
    setTimeout(function() {
      self.shouldScroll = true;
      self.typing = false;
    }, 300);
  };

  setMessage(message : string){
    this.message = message;
    this.shouldScroll = false;
    this.typing = true;
  }
}

export const messageStore = new MessageStore();