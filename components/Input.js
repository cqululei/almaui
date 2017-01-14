import React, { Component } from 'react'
import { TextInput, Platform } from 'react-native'

import { Theme } from '../theme'
import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'

class Input extends Component {

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ])
  }

  inputStyle = () => {
    const { style, styleName } = this.props
    const listOfStyleNames = styleName && stringToArray(styleName)
    const computedStyle = listOfStyleNames &&
      mergeStyles(styles, listOfStyleNames) ||
      {}

    return [
      styles.textInput,
      computedStyle,
      style
    ]
  }

  render () {
    const { placeholderColor } = this.props
    return (
      <TextInput
        {...this.props}
        placeholderTextColor={placeholderColor}
        underlineColorAndroid='rgba(0,0,0,0)'
        style={this.inputStyle()}
        ref={component => (this._root = component)}
      />
    )
  }

}

const styles = {
  textInput: {
    backgroundColor: Theme.white,
    height: 55,
    paddingHorizontal: Theme.mediumGutter,
    paddingVertical: 18,
    fontSize: 15,
    fontFamily: (Platform.OS === 'ios') ? 'HelveticaNeue' : 'Roboto',
    color: Theme.textColor
  }
}

export default WithThemeHOC(Input)
