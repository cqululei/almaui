import React, { Component, PropTypes } from 'react'
import { Platform, View } from 'react-native'

import { Theme, CommonStyles } from '../theme'
import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'

class NavigationBar extends Component {

  static propTypes = {
    theme: PropTypes.object,
    style: React.PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ]),
    styleName: PropTypes.string,
    leftComponent: PropTypes.node,
    titleComponent: PropTypes.node,
    rightComponent: PropTypes.node
  }

  static defaultProps = {}

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
    const {
      leftComponent,
      titleComponent,
      rightComponent
    } = this.props
    return (
      <View
        {...this.props}
        style={this.containerStyle()}
        ref={component => (this._root = component)} >
        <View style={styles.componentContainer}>
          <View style={styles.leftComponent}>{leftComponent}</View>
          <View style={styles.centerComponent}>{titleComponent}</View>
          <View style={styles.rightComponent}>{rightComponent}</View>
        </View>
      </View>
    )
  }

}

const styles = {
  container: {
    paddingTop: (Platform.OS === 'ios') ? 15 : 0,
    paddingBottom: 15,
    paddingHorizontal: 15,
    height: Theme.toolbarHeight,
    backgroundColor: Theme.navigationBarBackgroundColor,
    borderBottomWidth: 1,
    borderBottomColor: Theme.navigationBarBorderColor
  },
  leftComponent: CommonStyles.leftComponent,
  titleComponent: CommonStyles.titleComponent,
  rightComponent: CommonStyles.rightComponent,
  componentContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  clear: {
    backgroundColor: 'transparent'
  }
}

export default WithThemeHOC(NavigationBar)
