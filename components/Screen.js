import React, { Component } from 'react'
import { View } from 'react-native'

import { CommonStyles } from '../theme'
class Screen extends Component {
  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ])
  }

  computeStyle = () => {
    const { style } = this.props
    const defaultStyles = {}
    return [
      CommonStyles.fillParent,
      defaultStyles,
      style
    ]
  }

  render () {
    return (
      <View
        style={this.computeStyle()}
        ref={component => (this._root = component)} >
        {this.props.children}
      </View>
    )
  }

}

export default Screen
