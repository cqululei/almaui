import React, { Component } from 'react'
import { View } from 'react-native'

import { CommonStyles } from '../theme'
import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'

class CustomView extends Component {

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ])
  }

  containerStyle = () => {
    const { style, styleName } = this.props
    const listOfStyleNames = styleName && stringToArray(styleName)
    const computedStyle = listOfStyleNames &&
      mergeStyles(styles, listOfStyleNames) ||
      {}

    return [
      computedStyle,
      style
    ]
  }

  render () {
    return (
      <View
        {...this.props}
        style={this.containerStyle()}
        ref={component => (this._root = component)}>
        {this.props.children}
      </View>
    )
  }

}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 9
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  vertical: {
    flexDirection: 'column'
  },
  'fill-parent': CommonStyles.fillParent,
  'overlay': CommonStyles.overlay,
  'wrap': CommonStyles.wrap,
  'space-between': CommonStyles.spaceBetween,
  'content': CommonStyles.content,
  'notification-dot': CommonStyles.notificationDot
}

export default CustomView
