import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore} from '../../stores/_GlobalStore';

import RouterButton from '../helpers/RouterButton';

@observer
export default class MenuPane extends React.Component<any, any> {
    render() {

        let {history} = this.props;

        return (
            <SlideIn className="z4" if={appStore.menu} from="bottom" fill>
                <Layer fill flexCenter theme="light">
                    <RouterButton history={history} icon="mood" route="/users" title="users" />
                    <RouterButton history={history} icon="messages" route="/messages" title="messages" />
                </Layer>
            </SlideIn>
        )
    } 
}  