import React, { Component, PropTypes } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'

import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'
import Image from './Image'

const window = Dimensions.get('window')

class Carousel extends Component {

  static propTypes = {
    theme: PropTypes.object,
    indicators: PropTypes.bool,
    indicatorActiveStyle: PropTypes.object,
    indicatorStyle: PropTypes.object,
    indicatorSize: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    images: PropTypes.array,
    onChange: PropTypes.func,
    children: PropTypes.node,
    imageStyleName: PropTypes.string,
    imageStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ]),
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ])
  }

  static defaultProps = {
    indicators: true,
    images: [],
    onChange: () => {}
  }

  state = { activeSlide: 0 }

  computeStyle = () => {
    let styles = []
    const { style, styleName, height, width } = this.props
    const listOfStyleNames = styleName && stringToArray(styleName)
    const computedStyle = listOfStyleNames &&
      mergeStyles(styles, listOfStyleNames) ||
      {}

    width && styles.push({width: width})
    height && styles.push({height: height})

    return [
      styles.carousel,
      computedStyle,
      style,
      styles
    ]
  }

  computeScrollViewStyle = () => {
    let height = this.props.height || styles.CAROUSEL_HEIGHT
    return [
      styles.scrollView,
      {
        height: height
      }
    ]
  }

  _onAnimationEnd = () => {}

  render () {
    const {
      imageStyle,
      imageStyleName
    } = this.props

    let width = this.props.width || styles.CAROUSEL_WIDTH
    let height = this.props.height || styles.CAROUSEL_HEIGHT
    let content = this.props.children
    if (!content) {
      content = this.props.images.map((image, index) => {
        return (
          <Image
            key={index}
            style={[styles.image, imageStyle, { width, height }]}
            styleName={imageStyleName}
            source={{ uri: image }}
          />
        )
      })
    }

    return (
      <View style={this.computeStyle()}>
        <ScrollView
          bounces={false}
          ref={(scrollView) => {
            this._scrollView = scrollView
          }}
          horizontal
          decelerationRate={'fast'}
          directionalLockEnabled
          pagingEnabled
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          height={height}
          onMomentumScrollEnd={this._onAnimationEnd}
        >
          {content}
        </ScrollView>
      </View>
    )
  }

}

const styles = {
  CAROUSEL_WIDTH: window.width,
  CAROUSEL_HEIGHT: window.width,
  CAROUSEL_INDICATOR_SIZE: 24,
  CAROUSEL_INDICATOR_COLOR: '#bdc1cc',
  CAROUSEL_INDICATOR_ACTIVE_COLOR: '#2f8cff',
  image: {
  },
  carousel: {
    width: window.width,
    height: window.width
  }
}

export default WithThemeHOC(Carousel)
