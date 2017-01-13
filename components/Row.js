import React, { Component } from 'react'

import View from './View'
import { Theme } from '../theme'
import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'

class Row extends Component {

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ]),
    rowspan: React.PropTypes.number
  }

  calculateRowFlex = (rowspan, height) => {
    if (rowspan) {
      return rowspan
    } else {
      return height ? 0 : 1
    }
  }

  containerStyle = () => {
    const { style, styleName, rowspan } = this.props
    const { height } = style || {}
    const listOfStyleNames = styleName && stringToArray(styleName)
    const rowspanStyle = {
      flex: this.calculateRowFlex(rowspan, height)
    }
    const computedStyle = listOfStyleNames &&
      mergeStyles(styles, listOfStyleNames) ||
      {}
    return [
      styles.container,
      computedStyle,
      style,
      rowspanStyle
    ]
  }

  setNativeProps (nativeProps) {
    this._root.setNativeProps(nativeProps)
  }

  render () {
    return (
      <View
        {...this.props}
        style={this.containerStyle()}
        ref={component => (this._root = component)} >
        {this.props.children}
      </View>
    )
  }

}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Theme.backgroundColor,
    paddingHorizontal: Theme.mediumGutter,
    paddingVertical: Theme.mediumGutter
  },
  small: {
    height: 65,
    paddingVertical: 0
  }
}

export default WithThemeHOC(Row)
