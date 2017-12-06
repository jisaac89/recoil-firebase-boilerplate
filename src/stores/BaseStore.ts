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

    loadNewPage() {
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

    init() {
        const self = this;
        this.loadNewPage();
    }

    async add() : Promise<any> {
        const ref = fire.database().ref(this.ref);
        const id = ref.push().key;
        await this.update(id, this.merge(id, this.addObject()));

        return id;
    };

    merge(id : string, object ?: any){
        object.id = id;
        return object;
    }

    abstract addObject() : void;
    
    afterAdd(){
        return null;
    }

    async update(id : string, object: Object) {
        const self = this;
        const ref = fire.database().ref(this.ref);
        await ref.update({[id]: object}).then(()=>{
            self.afterAdd();
        })
    };

    async del(id : string) {
        const self = this;
        const ref = fire.database().ref(self.ref);
        self.removingItemId = id;

        await setTimeout(() => {
            ref.child(id).remove();
            self.removingItemId = '';
        }, this.delay);
    };

    async clearAll(){
        const ref = fire.database().ref(this.ref);
        this.loading = true;

        await setTimeout(() => {
            ref.remove();
            this.loading = false;
        }, this.delay);
    }

}