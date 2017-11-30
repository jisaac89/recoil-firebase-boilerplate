import {observable, computed, ObservableMap, toJS} from 'mobx';
import * as firebase from 'firebase';
import fire from '../fire.js';

import BaseStore from './BaseStore';

export class UsersStore extends BaseStore {

    constructor(){
        super('users');
    }

    addObject(){
        return {
            userName: 'joe',
            age: 21,
            friends : ['john', 'tom', 'mat']
        }
    }
}

export const usersStore = new UsersStore();