import { Component } from 'inferno';
import shallowDiffers from './shallowDiffers';

export class PureComponent extends Component {
  shouldComponentUpdate(props, state) {
    return (
      shallowDiffers(this.props, props) || shallowDiffers(this.state, state)
    );
  }
}
