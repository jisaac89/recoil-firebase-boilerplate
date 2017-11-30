import {observable, computed} from 'mobx';

import * as firebase from 'firebase';

import {messageStore, usersStore} from './_GlobalStore';

import { browserHistory } from 'react-router';


export class AppStore {
    
    @observable nightmode = false;
    @observable mobile = false;
    @observable menu = false;

    constructor() {
        const self = this;
    }

    initializeApp() {
        messageStore.init();
        usersStore.init();
    }

    toggleNightmode(){
        this.nightmode = !this.nightmode;
    }

    toggleMenu(){
        this.menu = !this.menu;
    }

    gotoRoute(route : string){
        browserHistory.push('/some/path');
    }

}

export const appStore = new AppStore();