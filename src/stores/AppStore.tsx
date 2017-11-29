import {observable, computed} from 'mobx';

import * as firebase from 'firebase';

import {messageStore} from './_GlobalStore';

export class AppStore {
    
    @observable nightmode = false;
    @observable mobile = false;

    constructor() {
        const self = this;
    }

    initializeApp() {
        messageStore.init();
    }

    toggleNightmode(){
        this.nightmode = !this.nightmode;
    }

}

export const appStore = new AppStore();