
import * as React from 'react';

import { Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox } from '../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, messageStore } from '../stores/_GlobalStore';

@observer
export default class Message extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    addMessage(e) {
        e.preventDefault();
        messageStore.add()
    }

    template(item, index) {
        return (
            <h1>{item.title}</h1>
        )
    }

    setValue(value) {
        messageStore.setMessage(value);
    }

    clearAllMessages() {
        messageStore.clearAll();
    }

    removeMessage(id) {
        messageStore.del(id);
    }

    render() {

        let messagesExist = messageStore.list.length !== 0,
            messageStoreLoaded = messageStore.loading,
            removingItemId = messageStore.removingItemId;

        return (
            <Layer fill flex>
                {messagesExist  ? <Toolbar flex block textCenter flush className="p10">
                    <Button materialIcon block disabled={!messagesExist} icon={"close"} onClick={this.clearAllMessages.bind(this)}>
                        Clear all messages
                    </Button>
                </Toolbar> : null}
                <Layer block fill scrollY scrollToId={!messageStoreLoaded && messageStore.shouldScroll ? 'bottom' : ''} scrollIf={messageStore.shouldScroll}>
                    {!messagesExist ?
                        <Toolbar block textCenter className="mt20 floatL">
                            <p><i className="fa super fa-commenting" /></p>
                            <p>No messages found...</p>
                        </Toolbar> : null}

                    {messageStore.list.map((item: any) => {
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
                        <Button materialIcon className="w80px" icon={messageStore.typing ? "commenting" : "face"} />
                        <Input size="large" placeholder="Add a message.." block value={messageStore.message} onChange={this.setValue.bind(this)} />
                        <Button materialIcon className="w80px" theme="primary" disabled={messageStore.message === ''} icon="add" onClick={this.addMessage.bind(this)} submit />
                    </Toolbar>
                </Layer>
            </Layer>
        )
    }
} 
