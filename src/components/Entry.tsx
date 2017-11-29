import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore, messageStore} from '../stores/_GlobalStore';

import {BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';
import Message from './Message';
import MenuPane from './MenuPane';
import LoadingPane from './LoadingPane';

@observer
export default class App extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        appStore.initializeApp();
    }

    render() {

    let messagesExist = messageStore.list.length !== 0,
        messageStoreLoaded = messageStore.loading,
        removingItemId = messageStore.removingItemId;
        
    return (
        <Router>
            <Recoil overflow nightmode={appStore.nightmode}>
                <Layer overflow fill>
                    <Layer overflow fill flex>
                        <Header />
                        <Message />
                    </Layer>
                    <MenuPane />
                    <LoadingPane />
                </Layer>
            </Recoil>
        </Router>
        )
    } 
} 