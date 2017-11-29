import {observable, computed, ObservableMap, toJS} from 'mobx';
import * as firebase from 'firebase';
import fire from '../fire.js';

import Store from './_Store';

export default class BaseStore extends Store{

    ref: string;

    @observable list : Array<Object> = [];
    @observable listItem : ObservableMap<Object> = new ObservableMap({});

    @observable loading : boolean = true;
    @observable removingItemId : string = '';

    constructor(ref : string) { 
        super(ref);
    }

    init() {
        const self = this;
        const listRef = fire.database().ref(this.ref);

        listRef.on('value', (snap : any) => {
            let items : any = [];
            snap.forEach((child : any) => {
                items.push(child.val());
            });
            this.list = items;
            this.loading = false;
        });
    }

    update(id : string, listItem: Object) {
        const self = this;
        const listRef = fire.database().ref(this.ref);
        listRef.update({[id]: listItem})
    };

    del(id : string) {
        const self = this;
        const listRef = fire.database().ref(self.ref);
        self.removingItemId = id;

        setTimeout(function() {

            listRef.child(id).remove();
            self.removingItemId = '';
        }, 300);
    };

    clearAll(){
        const self = this;
        const listRef = fire.database().ref(this.ref);
        this.loading = true;

        setTimeout(function() {
        listRef.remove();
            self.loading = false;
        }, 3500);
    }

}