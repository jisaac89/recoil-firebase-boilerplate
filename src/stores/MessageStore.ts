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

  addObject(){
    return {
      title : this.message
    }
  }

  afterAdd(){
    this.shouldScroll = true;
    this.typing = false;
    this.message = '';
  }

  setMessage(message : string){
    this.message = message;
    this.shouldScroll = false;
    this.typing = true;
  }
}

export const messageStore = new MessageStore();