
import * as React from 'react';

import { Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox } from '../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, usersStore } from '../../stores/_GlobalStore';

@observer
export default class Users extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        appStore.menu = false;
    }

    createUser(e) {
        e.preventDefault();
        usersStore.add()
    }

    template(item, index) {
        return (
            <div key={index}>
                {item.userName}
            </div>
        )
    }
 
    render() {

        return (
            <Layer fill flex>
                <Layer>
                    <Toolbar size="large"textCenter form block flex flush className="p5 border-top p20">
                        <Button materialIcon className="w80px" theme="primary" icon="add" onClick={this.createUser.bind(this)} submit />
                    </Toolbar>

                    <Table dataSource={usersStore.list} columns={[{template: this.template.bind(this)}]} />
                </Layer>
            </Layer>
        )
    }
} 
