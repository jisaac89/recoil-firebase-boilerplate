import {observable, computed, ObservableMap, toJS} from 'mobx';
import * as firebase from 'firebase';
import fire from '../fire.js';

import BaseStore from './BaseStore';

export default abstract class PaginateStore extends BaseStore{

    ref: string;

    @observable pageSize : number = 10;
    @observable currentPageIndex : number = 1;
    @observable lastQuery;

    constructor(ref : string) { 
        super(ref);
    }

    handler = (feed:  any) => {
        let shouldMap = feed.val() ? Object.keys(feed.val()).map(key => feed.val()[key]) : [];
        let items : any = [];
        items = shouldMap;
        this.list = items;
        this.loading = false;
        this.currentPageIndex++; 
    }

    loadNewPage() {
        const ref = fire.database().ref(this.ref);
        if(this.lastQuery) {
            ref.off("value", this.handler);
        }
        this.lastQuery = ref.limitToLast(this.currentPageIndex * this.pageSize);
        this.lastQuery.on("value", this.handler);
    }
}