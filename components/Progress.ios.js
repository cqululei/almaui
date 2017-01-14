import React, { Component } from 'react'
import { ProgressViewIOS } from 'react-native'

import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'

class Progress extends Component {

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
      computedStyle,
      style
    ]
  }

  render () {
    const { progress, color } = this.props
    return (
      <ProgressViewIOS
        {...this.props}
        progress={progress ? progress / 100 : 0.5}
        progressTintColor={color}
        style={this.computeStyle()}
        ref={component => (this._root = component)} />
    )
  }

}

const styles = {}

export default WithThemeHOC(Progress)
