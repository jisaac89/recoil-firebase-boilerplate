import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore} from '../stores/_GlobalStore';

@observer
export default class MenuPane extends React.Component<any, any> {

    render() {
        
    return (
            <SlideIn className="z4" if={appStore.menu} from="bottom" fill>
                <Layer fill flexCenter theme="light">
                    MENU
                </Layer>
            </SlideIn>         
        )
    } 
} 