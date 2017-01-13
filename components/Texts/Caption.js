import React, { Component } from 'react'

import Text from './Text'
import { Theme } from '../../theme'
import WithThemeHOC from '../withThemeHOC'

class Caption extends Component {

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ])
  }
  textStyle = () => {
    const { style } = this.props
    const defaultStyles = {
      color: Theme.captionColor,
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.5
    }
    return [defaultStyles, style]
  }

  render () {
    return (
      <Text
        style={this.textStyle()}
        ref={component => (this._root = component)} >
        {this.props.children}
      </Text>
    )
  }

}

export default WithThemeHOC(Caption)
