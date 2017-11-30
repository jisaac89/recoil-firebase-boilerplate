import * as React from "react";
import {withRouter} from "react-router-dom";

import { Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox } from '../../recoil/src/index';
import { observer } from 'mobx-react';
import { appStore } from '../stores/_GlobalStore';

interface IRouterButton{
    icon?: string;
    history?: any;
    route ?: string;
}

@observer
class RouterButton extends React.Component<IRouterButton, any> {

  gotoRoute(route) {
    appStore.menu = false;
    this.props.history.push(route);
  }
  render(){
      const {icon, history, route} = this.props;
      return (
          <Button simple materialIcon icon={icon} size="xlarge" onClick={this.gotoRoute.bind(this, route)}  />
      )
  }
}
export default withRouter(RouterButton);
