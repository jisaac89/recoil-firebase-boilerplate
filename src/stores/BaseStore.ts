import {observable, computed, ObservableMap, toJS} from 'mobx';
import * as firebase from 'firebase';
import fire from '../fire.js';

import Store from './_Store';

export default abstract class BaseStore extends Store{

    ref: string;
    delay : number;

    @observable list : Array<Object> = [];
    @observable listItem : ObservableMap<Object> = new ObservableMap({});

    @observable loading : boolean = true;
    @observable removingItemId : string = '';

    constructor(ref : string) { 
        super(ref);
        this.delay = 300;
    }

    init() {
        const self = this;
        const ref = fire.database().ref(this.ref);

        ref.on('value', (snap : any) => {
            let items : any = [];
            snap.forEach((child : any) => {
                items.push(child.val());
            });
            this.list = items;
            this.loading = false;
        });
    }

    add() {
        const self = this;
        const ref = fire.database().ref(this.ref);
        const id = ref.push().key;
        this.update(id, 
            self.merge(id, this.addObject())
        );
    };

    merge(id : string, object ?: any){
        object.id = id;
        return object;
    }

    abstract addObject() : void;
    
    afterAdd(){
        return null;
    }

    update(id : string, object: Object) {
        const self = this;
        const ref = fire.database().ref(this.ref);
        ref.update({[id]: object}, ()=>{
            self.afterAdd();
        })
    };

    del(id : string) {
        const self = this;
        const ref = fire.database().ref(self.ref);
        self.removingItemId = id;

        setTimeout(() => {
            ref.child(id).remove();
            self.removingItemId = '';
        }, this.delay);
    };

    clearAll(){
        const ref = fire.database().ref(this.ref);
        this.loading = true;

        setTimeout(() => {
            ref.remove();
            this.loading = false;
        }, this.delay);
    }

}