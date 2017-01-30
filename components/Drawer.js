import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import { Platform } from 'react-native'

import { Screen } from '../index'
import WithThemeHOC from './withThemeHOC'

class DrawerView extends Component {

  static defaultProps = {
    open: false,
    drawerType: 'overlay',
    openDrawerOffset: 100,
    closedDrawerOffset: 0,
    panOpenMask: 0.1,
    panCloseMask: 0.9,
    relativeDrag: false,
    panThreshold: 0.25,
    tweenHandlerOn: false,
    tweenDuration: 350,
    tweenEasing: 'linear',
    disabled: false,
    tweenHandlerPreset: null,
    acceptDoubleTap: false,
    acceptTap: false,
    acceptPan: true,
    tapToClose: false,
    negotiatePan: false,
    rightSide: false
  }

  render () {
    const { rightSide, content } = this.props
    return (
      <Drawer
        {...this.props}
        content={content}
        styles={styles}
        side={rightSide ? 'right' : 'left'}
        ref={c => (this.drawer = c)} >
          <Screen styles={{
            padding: 30,
            backgroundColor: 'red'
          }}>
            {this.props.children}
          </Screen>
      </Drawer>
    )
  }

}

const styles = (Platform.OS === 'ios') ? {} : {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3
  }
}
export default WithThemeHOC(DrawerView)
