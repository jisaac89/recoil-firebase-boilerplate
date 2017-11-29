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
            <Layer overflow fill flex className="p10">
                <Open className="border-bottom" if={messagesExist} openToHeight={"42px"}>
                    <Toolbar flex block textCenter flush>
                        <Button block disabled={!messagesExist} icon={"times"} onClick={this.clearAllMessages.bind(this)} className="mb10">
                            Clear all messages
                        </Button>
                        <Button block disabled={!messagesExist} icon={"moon-o"} onClick={this.toggleNightmode.bind(this)} className="mb10">
                            Toggle nightmode
                        </Button>      
                    </Toolbar>
                </Open>
                <Layer className="ptb20" block fill scrollY scrollToId={!messageStoreLoaded && messageStore.shouldScroll ? 'bottom' : ''} scrollIf={messageStore.shouldScroll}>
                    {!messagesExist ? 
                    <Toolbar block textCenter>
                         <p><i className="fa super fa-commenting" /></p>
                         <p>No messages found...</p> 
                    </Toolbar> : null}

                    {messageStore.list.map((item : any) => {
                        return (
                            <Open key={item.id} if={removingItemId !== item.id} openToHeight="47px">
                                <Emerge>
                                    <Toolbar block className="ptb10 border-bottom">
                                        <Button simple icon="times" size="small" onClick={this.removeMessage.bind(this, item.id)} />
                                        <Button size="small" simple>{item.title}</Button>
                                    </Toolbar>
                                </Emerge>
                            </Open>
                        )
                    })}
                    <div id="bottom"></div>
                </Layer>
                <Toolbar size="large" form block flex flush className="p5 border-top">
                    <Button className="w80px" icon={messageStore.typing ? "commenting": "user"} />
                    <Input size="large" placeholder="Add a message.." block value={messageStore.message} onChange={this.setValue.bind(this)} />
                    <Button className="w80px" theme="primary" disabled={messageStore.message === ''} icon="comments" onClick={this.addMessage.bind(this)} submit />
                </Toolbar>
            
                <SlideIn className="z5" if={messageStore.loading} from="bottom" fill>
                    <Layer fill flexCenter theme="light">
                        <Loading size="xlarge" if={messageStore.loading} />
                        <Button simple>loading...</Button>
                    </Layer>
            </SlideIn>

            </Layer>

        </Recoil>
        )
    } 
} 