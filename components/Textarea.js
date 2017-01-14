import React, { Component } from 'react'
import { TextInput, Platform } from 'react-native'

import { Theme } from '../theme'
import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'

class Textarea extends Component {

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
    const { placeholderColor, selectionColor } = this.props
    return (
      <TextInput
        {...this.props}
        multiline={true}
        placeholderTextColor={placeholderColor}
        selectionColor={selectionColor || Theme.textSelectionColor}
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
    height: 250,
    paddingHorizontal: Theme.mediumGutter,
    paddingVertical: Theme.smallGutter,
    fontSize: 15,
    fontFamily: (Platform.OS === 'ios') ? 'HelveticaNeue' : 'Roboto',
    color: Theme.textColor
  },
  underline: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    marginTop: 5
  },

  bordered: {
    marginTop: 5
  },

  rounded: {
    borderRadius: 30,
    marginTop: 5
  }
}

export default WithThemeHOC(Textarea)
