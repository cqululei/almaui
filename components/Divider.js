import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import View from './View'
import { Theme, CommonStyles } from '../theme'
import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'

class Divider extends Component {

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ])
  }

  static defaultProps = {}

  containerStyle = () => {
    const { style, styleName } = this.props
    const listOfStyleNames = styleName && stringToArray(styleName)
    const computedStyle = listOfStyleNames &&
      mergeStyles(styles, listOfStyleNames) ||
      {}

    return [
      CommonStyles.spaceBetween,
      styles.container,
      computedStyle,
      style
    ]
  }

  render () {
    return (
      <View
        style={this.containerStyle()}
        ref={component => (this._root = component)}
      />
    )
  }

}

const styles = {
  container: {
    alignSelf: 'stretch',
    backgroundColor: Theme.white,
    paddingTop: 25,
    flexDirection: 'row'
  },
  'line': {
    paddingTop: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.dividerColor
  },
  'section-header': {
    paddingTop: 23,
    backgroundColor: Theme.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.dividerColor
  },
  small: {
    width: 55
  },
  center: {
    alignSelf: 'center'
  },
  list: {
    backgroundColor: Theme.white,
    borderTopWidth: 0
  }
}

export default WithThemeHOC(Divider)
