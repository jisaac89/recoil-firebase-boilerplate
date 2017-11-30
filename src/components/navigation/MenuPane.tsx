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
                <Layer flexCenter fill theme="light">
                    <Emerge if={appStore.menu}>
                        <div></div>
                        <div>
                            <RouterButton materialIcon size="xlarge" simple history={history} icon="messages" route="/messages" title="messages" />
                        </div>                 
                    </Emerge>
                </Layer>
            </SlideIn>
        )
    } 
}  