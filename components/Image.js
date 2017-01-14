import React, { Component } from 'react'
import { Image } from 'react-native'

import { Theme, CommonStyles, Images } from '../theme'
import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'

class CustomImage extends Component {

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ])
  }

  static defaultProps = {
    // If source is not defined then use default
    // transparent image
    source: Images.transparent
  }

  containerStyle = () => {
    const { style, styleName } = this.props
    const listOfStyleNames = styleName && stringToArray(styleName)
    const computedStyle = listOfStyleNames &&
      mergeStyles(styles, listOfStyleNames) ||
      {}

    return [
      styles.container,
      computedStyle,
      style
    ]
  }

  render () {
    return (
      <Image
        {...this.props}
        style={this.containerStyle()}
        ref={component => (this._root = component)}
      />
    )
  }

}

const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    backgroundColor: Theme.backgroundColor,
    // Image {require} is broken in React Native for Resizing
    // https://github.com/facebook/react-native/issues/4598
    // #issuecomment-162328501
    width: null
  },
  small: CommonStyles.small,
  medium: CommonStyles.medium,
  top: CommonStyles.top,
  'medium-square': CommonStyles.mediumSquare,
  'medium-wide': CommonStyles.mediumWide,
  featured: CommonStyles.featured,
  large: CommonStyles.large,
  'large-portrait': CommonStyles.largePortrait,
  'large-banner': CommonStyles.largeBanner,
  'large-square': CommonStyles.largeSquare,
  'large-wide': CommonStyles.largeWide,
  'large-ultra-wide': CommonStyles.largeUltraWide
}

export default WithThemeHOC(CustomImage)
