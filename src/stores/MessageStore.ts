import {observable, computed, ObservableMap, toJS} from 'mobx';
import * as firebase from 'firebase';
import fire from '../fire.js';

import {IMessage} from '../interfaces/IMessage';

import BaseStore from './BaseStore';

export class MessageStore extends BaseStore {

  @observable message : IMessage = observable({title : ''});
  @observable shouldScroll : boolean = true;
  @observable typing : boolean = false;

  constructor(){
    super('messages');
  }

  addObject(){
    return this.message;
  }

  afterAdd(){
    this.shouldScroll = true;
    this.typing = false;
    this.message.title = '';
  }

  setMessage(message : string){
    this.message.title = message;
    this.shouldScroll = false;
    this.typing = true;
  }
}

export const messageStore = new MessageStore();