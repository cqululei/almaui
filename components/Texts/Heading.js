import React, { Component } from 'react'
import Text from './Text'

import { CommonStyles } from '../../theme'
import mergeStyles from '../../utils/mergeStyles'
import stringToArray from '../../utils/stringToArray'
import WithThemeHOC from '../withThemeHOC'

class Heading extends Component {

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
      styles.dark, // Default dark color
      styles.heading, // Default fontSize and lineHeight
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
  heading: CommonStyles.fontSizeHeading,
  small: CommonStyles.fontSizeSmall,
  medium: CommonStyles.fontSizeMedium,
  large: CommonStyles.fontSizeLarge,
  center: CommonStyles.textCenter,
  left: CommonStyles.textLeft,
  right: CommonStyles.textRight,
  light: CommonStyles.light,
  dark: CommonStyles.dark,
  darker: CommonStyles.darker
}

export default WithThemeHOC(Heading)
