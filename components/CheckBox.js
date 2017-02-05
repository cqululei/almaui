import React, { Component, PropTypes } from 'react'
import { TouchableOpacity, Platform, View } from 'react-native'

import { Theme } from '../theme'
import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'

class Checkbox extends Component {

  static propTypes = {
    theme: PropTypes.object,
    activeOpacity: PropTypes.number,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    styleName: PropTypes.string,
    checkType: PropTypes.oneOf(['icon', 'circle']),
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ])
  }

  static defaultProps = {
    activeOpacity: 0.8,
    checked: false,
    checkType: 'icon',
    onValueChange: () => {}
  }

  computeStyle = () => {
    const { style, styleName, disabled, checked } = this.props
    const listOfStyleNames = styleName && stringToArray(styleName)
    const computedStyle = listOfStyleNames &&
      mergeStyles(styles, listOfStyleNames) ||
      {}
    console.log([
      styles.checkbox,
      computedStyle,
      style,
      checked && style.checked,
      disabled && styles.disabledStyle
    ])

    return [
      styles.checkbox,
      computedStyle,
      style,
      checked && style.checked
    ]
  }

  render () {
    const {
      onValueChange,
      activeOpacity,
      disabled,
      checked,
      checkType
    } = this.props

    let CheckComponent
    if (checked) {
      CheckComponent = <View style={[
        styles.check.spot,
        checkType === 'circle' && styles.circle
      ]} />
    }

    return (
      <View style={[
        disabled && styles.disabledStyle
      ]}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          disabled={disabled}
          onPress={() => onValueChange(!checked)}
          style={this.computeStyle()}
        >
          {CheckComponent}
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = {
  checkbox: {
    width: Theme.checkboxSize,
    height: Theme.checkboxSize,
    borderWidth: (Platform.OS === 'ios') ? 1 : 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Theme.checkboxBgColor
  },
  checked: {
    borderColor: Theme.checkboxBorderColor,
    backgroundColor: Theme.checkboxBorderColor
  },
  circle: {
    borderRadius: 9999
  },
  rounded: {
    borderRadius: 5
  },
  disabledStyle: {
    opacity: 0.3
  },
  check: {
    icon: {
      backgroundColor: 'transparent',
      marginTop: 2
    },
    spot: {
      width: Theme.checkboxSize - 4,
      height: Theme.checkboxSize - 4,
      backgroundColor: '#2f8cff'
    }
  }
}

export default WithThemeHOC(Checkbox)
