import React, { Component } from 'react'
import { View } from 'react-native'

import { Theme, CommonStyles, Images } from '../theme'
import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'

class Overlay extends Component {

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ])
  }

  static defaultProps = {
    // If source is not defined then
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
      <View
        {...this.props}
        style={this.containerStyle()}
        ref={component => (this._root = component)}
      />
    )
  }

}

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2 * Theme.smallGutter,
    paddingBottom: 2 * Theme.smallGutter,
    paddingHorizontal: Theme.smallGutter,
    backgroundColor: Theme.overlayDark
  },
  'fill-parent': CommonStyles.fillParent,
  'rounded-small': CommonStyles.roundedSmall,
  'solid-dark': CommonStyles.solidDark,
  'solid-bright': CommonStyles.solidBright,
  'medium-avatar': CommonStyles.mediumAvatar,
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

export default WithThemeHOC(Overlay)
