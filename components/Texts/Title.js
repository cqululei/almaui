import React, { Component } from 'react'

import Text from './Text'
import { Theme } from '../../theme'
import WithThemeHOC from '../withThemeHOC'

class Title extends Component {

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
      color: Theme.titleColor,
      fontSize: 20,
      lineHeight: 25,
      letterSpacing: 1
    }
    return [defaultStyles, style]
  }

  render () {
    return (
      <Text
        {...this.props}
        style={this.textStyle()}
        ref={component => (this._root = component)} >
        {this.props.children}
      </Text>
    )
  }

}

export default WithThemeHOC(Title)
