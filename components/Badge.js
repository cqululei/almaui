import React, { Component } from 'react'
import { View } from 'react-native'

import { Theme } from '../theme'
import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'
import { Text } from './Texts'

class Badge extends Component {

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ])
  }

  static defaultProps = {}

  computeStyle = () => {
    const { style, styleName } = this.props
    const listOfStyleNames = styleName && stringToArray(styleName)
    const computedStyle = listOfStyleNames &&
      mergeStyles(styles, listOfStyleNames) ||
      {}

    return [
      styles.badge,
      computedStyle,
      style
    ]
  }

  render () {
    const {
      // Style of the Button's Text compoment
      textStyle,
      textStyleName
    } = this.props
    return (
      <View
        style={this.computeStyle()}
        ref={component => (this._root = component)} >
        <Text
          style={[styles.text, textStyle]}
          styleName={textStyleName}
        >
          {this.props.children}
        </Text>
      </View>
    )
  }

}

const styles = {
  text: {
    paddingRight: 0
  },
  badge: {
    padding: 10,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: Theme.white,
    borderRadius: 20
  }
}

export default WithThemeHOC(Badge)
