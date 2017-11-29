import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore, messageStore} from '../stores/_GlobalStore';

@observer
export default class App extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        appStore.initializeApp();
    }

    addMessage(e){
        e.preventDefault();
        messageStore.add()
    }

    template(item, index) {
        return (
            <h1>{item.title}</h1>
        )
    }

    setValue(value){
        messageStore.setMessage(value);
    }

    clearAllMessages(){
        messageStore.clearAll();
    }

    removeMessage(id){
        messageStore.del(id);
    }

    toggleNightmode(){
        appStore.toggleNightmode();
    }

    render() {

    let messagesExist = messageStore.list.length !== 0,
        messageStoreLoaded = messageStore.loading,
        removingItemId = messageStore.removingItemId;
        
    return (
        <Recoil overflow nightmode={appStore.nightmode}>
            <Layer overflow fill flex>
                <Layer>
                    <Open className="border-bottom" if={messagesExist} openToHeight={"52px"}>
                        <Toolbar flex block textCenter flush className="p10">
                            <Button materialIcon block disabled={!messagesExist} icon={"close"} onClick={this.clearAllMessages.bind(this)}>
                                Clear all messages
                            </Button>
                            <Button materialIcon  block disabled={!messagesExist} icon={"mood"} onClick={this.toggleNightmode.bind(this)}>
                                Toggle nightmode
                            </Button>      
                        </Toolbar>
                    </Open>
                </Layer>
                <Layer block fill scrollY scrollToId={!messageStoreLoaded && messageStore.shouldScroll ? 'bottom' : ''} scrollIf={messageStore.shouldScroll}>
                    {!messagesExist ? 
                    <Toolbar block textCenter>
                         <p><i className="fa super fa-commenting" /></p>
                         <p>No messages found...</p> 
                    </Toolbar> : null}

                    {messageStore.list.map((item : any) => {
                        return (
                            <Open key={item.id} if={removingItemId !== item.id} openToHeight="61px">
                                <Emerge>
                                    <Toolbar onClick={this.removeMessage.bind(this, item.id)} block className="p10 border-bottom">
                                        <Button materialIcon className="p0" simple icon="close" size="large" />
                                        <Button className="ps10" size="large" simple>{item.title}</Button>
                                    </Toolbar>
                                </Emerge>
                            </Open>
                        )
                    })}
                    <div id="bottom"></div>
                </Layer>
               <Layer>
                    <Toolbar size="large" form block flex flush className="p5 border-top">
                        <Button materialIcon className="w80px" icon={messageStore.typing ? "commenting": "face"} />
                        <Input size="large" placeholder="Add a message.." block value={messageStore.message} onChange={this.setValue.bind(this)} />
                        <Button materialIcon className="w80px" theme="primary" disabled={messageStore.message === ''} icon="add" onClick={this.addMessage.bind(this)} submit />
                    </Toolbar>
                </Layer>
            </Layer>
            <SlideIn className="z5" if={messageStore.loading} from="bottom" fill>
                <Layer fill flexCenter theme="light">
                    <Loading size="xlarge" if={messageStore.loading} />
                    <Button simple>loading...</Button>
                </Layer>
            </SlideIn>
        </Recoil>
        )
    } 
} 