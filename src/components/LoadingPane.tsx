import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../recoil/src/index';

import {observer} from 'mobx-react';

import {messageStore} from '../stores/_GlobalStore';

@observer
export default class LoadingPane extends React.Component<any, any> {
    render() {
        return (
            <SlideIn className="z5" if={messageStore.loading} from="bottom" fill>
                <Layer fill flexCenter theme="light">
                    <Loading size="xlarge" if={messageStore.loading} />
                    <Button simple>loading...</Button>
                </Layer>
            </SlideIn>
        )
    } 
} 