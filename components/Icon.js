import React, { Component, PropTypes } from 'react'
import { Platform, TouchableOpacity, StyleSheet, View } from 'react-native'

import { Theme } from '../theme'
import getIconType from '../utils/getIconType'
import WithThemeHOC from './withThemeHOC'

class Icon extends Component {
  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ]),
    type: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    underlayColor: PropTypes.string,
    reverse: PropTypes.bool,
    raised: PropTypes.bool,
    containerStyle: PropTypes.any,
    iconStyle: PropTypes.any,
    onPress: PropTypes.func,
    reverseColor: PropTypes.string
  }

  static defaultProps = {
    underlayColor: 'white',
    reverse: false,
    raised: false,
    size: 24,
    color: 'black',
    reverseColor: 'white'
  }

  computeStyle = () => {
    const { style } = this.props
    const defaultStyles = {}
    return [defaultStyles, style]
  }

  render () {
    const {
      type,
      name,
      size,
      color,
      iconStyle,
      onPress,
      underlayColor,
      reverse,
      raised,
      onLongPress,
      containerStyle,
      reverseColor
    } = this.props

    let Component = View
    onPress && (Component = TouchableOpacity)

    let Icon = type ? getIconType(type) : getIconType('material')

    return (
      <Component
        {...this.props}
        underlayColor={
          reverse ? color : underlayColor || color
        }
        style={[
          (reverse || raised) && styles.button,
          (reverse || raised) && {
            borderRadius: size + 4,
            height: size * 2 + 4,
            width: size * 2 + 4
          },
          raised && styles.raised,
          {
            backgroundColor: reverse ? color : raised ? 'white' : 'transparent',
            alignItems: 'center',
            justifyContent: 'center'},
          containerStyle && containerStyle
        ]}
        onLongPress={onLongPress}
        onPress={onPress}>
        <Icon
          style={[
            {backgroundColor: 'transparent'},
            iconStyle && iconStyle
          ]}
          size={size}
          name={name}
          color={reverse ? reverseColor : color} />
      </Component>
    )
  }

}

const styles = StyleSheet.create({
  button: {
    margin: 7
  },
  light: {
    color: Theme.white
  },
  darker: {
    color: Theme.darker
  },
  raised: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 1,
        shadowRadius: 1
      },
      android: {
        elevation: 2
      }
    })
  },
  disclosure: {
    opacity: 0.5,
    marginRight: -7,
    marginLeft: 4
  }
})

export default WithThemeHOC(Icon)
