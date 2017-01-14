import React, { Component } from 'react'
import { Dimensions } from 'react-native'

import View from './View'
import { Theme } from '../theme'
import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'

const window = Dimensions.get('window')

class Card extends Component {

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
      styles.container,
      style,
      computedStyle
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
    width: (180 / 375) * window.width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Theme.backgroundColor,
    borderRadius: 2,
    shadowColor: Theme.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 }
  }
}

export default WithThemeHOC(Card)
