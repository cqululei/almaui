import React, { Component } from 'react'
import View from './View'
import WithThemeHOC from './withThemeHOC'

class Col extends Component {

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ]),
    colspan: React.PropTypes.number
  }

  calculateColFlex = (colspan, width) => {
    if (colspan) {
      return colspan
    } else {
      return width ? 0 : 1
    }
  }

  containerStyle = () => {
    const { style, colspan } = this.props
    const { width } = style || {}
    const defaultStyles = {
      flexDirection: 'column',
      flex: this.calculateColFlex(colspan, width)
    }
    return [style, defaultStyles]
  }

  setNativeProps (nativeProps) {
    this._root.setNativeProps(nativeProps)
  }

  render () {
    return (
      <View
        {...this.props}
        style={this.containerStyle()}
        ref={component => (this._root = component)}>
        {this.props.children}
      </View>
    )
  }

}

export default WithThemeHOC(Col)
