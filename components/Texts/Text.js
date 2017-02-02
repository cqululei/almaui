import React, { Component } from 'react'
import { Text } from 'react-native'

import { Theme, CommonStyles } from '../../theme'
import mergeStyles from '../../utils/mergeStyles'
import stringToArray from '../../utils/stringToArray'
import WithThemeHOC from '../withThemeHOC'

class CustomText extends Component {

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ])
  }

  textStyle = () => {
    const { style, styleName } = this.props
    const listOfStyleNames = styleName && stringToArray(styleName)
    const computedStyle = listOfStyleNames &&
      mergeStyles(styles, listOfStyleNames) ||
      {}
    return [
      styles.text,
      computedStyle,
      style
    ]
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

const styles = {
  text: {
    color: Theme.textColor,
    fontFamily: Theme.fontFamily,
    paddingRight: Theme.smallGutter,
    letterSpacing: 1
  },
  center: CommonStyles.textCenter,
  left: CommonStyles.textLeft,
  right: CommonStyles.textRight,
  light: CommonStyles.light,
  dark: CommonStyles.dark,
  darker: CommonStyles.darker,
  button: {
    fontSize: 12,
    lineHeight: null,
    marginVertical: 12,
    marginRight: 10
  }
}

export default WithThemeHOC(CustomText)
