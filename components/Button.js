import React, { Component, PropTypes } from 'react'
import { View, TouchableOpacity } from 'react-native'

import { Theme, CommonStyles } from '../theme'
import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'
import { Text } from './Texts'

class Button extends Component {

  static propTypes = {
    theme: PropTypes.object,
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ]),
    onPress: PropTypes.func,
    onLongPress: PropTypes.func
  }

  static defaultProps = {}

  measureComponent = (event) => {
    // console.log('properties: ', event.nativeEvent.layout)
  }

  computeStyle = () => {
    const { style, styleName } = this.props
    const listOfStyleNames = styleName && stringToArray(styleName)
    const computedStyle = listOfStyleNames &&
      mergeStyles(styles, listOfStyleNames) ||
      {}

    return [
      styles.button,
      computedStyle,
      style
    ]
  }

  render () {
    const {
      onPress,
      onLongPress,
      disabled,
      // Style of the Button's Text compoment
      textStyle,
      textStyleName
    } = this.props
    let Component = View
    onPress && (Component = TouchableOpacity)
    return (
      <Component
        {...this.props}
        onLayout={(event) => this.measureComponent(event)}
        onLongPress={onLongPress}
        onPress={onPress}
        disabled={disabled}
        accessibilityTraits='button'
        accessibilityComponentType='button'
        style={this.computeStyle()}
        ref={component => (this._root = component)} >
        <Text
          style={textStyle}
          styleName={textStyleName}
        >
          {this.props.children}
        </Text>
      </Component>
    )
  }

}

const styles = {
  button: {
    backgroundColor: Theme.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Theme.white,
    paddingVertical: Theme.smallGutter,
    paddingLeft: Theme.mediumGutter,
    paddingRight: Theme.mediumGutter - Theme.smallGutter
  },

  primary: CommonStyles.primaryBtn,
  success: CommonStyles.successBtn,
  info: CommonStyles.infoBtn,
  warning: CommonStyles.warningBtn,
  danger: CommonStyles.dangerBtn,
  dark: CommonStyles.dark,
  tight: CommonStyles.tight,
  clear: {
    backgroundColor: Theme.clear,
    borderWidth: 0,
    borderRadius: 0
  },
  'right-icon': {
    ...CommonStyles.dark,
    ...CommonStyles.tight,
    marginLeft: Theme.mediumGutter
  }
}

export default WithThemeHOC(Button)
