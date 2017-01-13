import { Dimensions } from 'react-native'
import Theme from './theme'

const window = Dimensions.get('window')

export default {
  // color
  get light () {
    return {
      color: Theme.white
    }
  },
  get dark () {
    return {
      color: Theme.dark
    }
  },
  get darker () {
    return {
      color: Theme.darker
    }
  },

  // Fonts
  get fontSizeLarge () {
    return {
      fontSize: Theme.fontSizeBase * 1.8,
      lineHeight: Theme.lineHeight + 12
    }
  },

  get fontSizeMedium () {
    return {
      fontSize: Theme.fontSizeBase * 1.6,
      lineHeight: Theme.lineHeight + 7
    }
  },

  get fontSizeSmall () {
    return {
      fontSize: Theme.fontSizeBase * 1.4,
      lineHeight: Theme.lineHeight + 2
    }
  },

  get fontSizeHeading () {
    return {
      fontSize: Theme.fontSizeBase * 1.2,
      lineHeight: Theme.lineHeight
    }
  },

  get fillParent () {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  },

  // Text style
  get defaultFont () {
    return { fontFamily: Theme.fontFamily }
  },

  get boldTextStyle () {
    return { fontWeight: '500' }
  },

  get italicTextStyle () {
    return { fontStyle: 'italic' }
  },

  get multilineTextStyle () {
    return {
      marginTop: -4,
      marginBottom: 4,
      lineHeight: 26
    }
  },

  get lineThrough () {
    return { textDecorationLine: 'line-through' }
  },

  get textCenter () {
    return { textAlign: 'center' }
  },

  get textLeft () {
    return { textAlign: 'left' }
  },

  get textRight () {
    return { textAlign: 'right' }
  },

  get bright () {
    return { color: Theme.white }
  },

  // Layout
  get top () {
    return {
      alignSelf: 'flex-start'
    }
  },
  // image sizes for application
  get small () {
    return {
      width: 65,
      height: 65
    }
  },

  get medium () {
    return {
      width: 145,
      height: 92
    }
  },

  get mediumSquare () {
    return {
      width: 145,
      height: 145
    }
  },

  get mediumWide () {
    return {
      width: (180 / 375) * window.width,
      height: 85
    }
  },

  get featured () {
    return {
      width: (365 / 375) * window.width,
      height: (345 / 375) * window.width
    }
  },

  get large () {
    return {
      width: window.width,
      height: (280 / 375) * window.width
    }
  },

  get largePortrait () {
    return {
      width: window.width,
      height: (518 / 375) * window.width
    }
  },

  get largeBanner () {
    return {
      width: window.width,
      height: (200 / 375) * window.width
    }
  },

  get largeSquare () {
    return {
      width: window.width,
      height: window.width
    }
  },

  get largeWide () {
    return {
      width: window.width,
      height: (238 / 375) * window.width
    }
  },

  get largeUltraWide () {
    return {
      width: window.width,
      height: (130 / 375) * window.width
    }
  },

  get preview () {
    return {
      flex: 1,
      backgroundColor: 'transparent',
      resizeMode: 'contain'
    }
  },

  get smallAvatar () {
    return {
      width: 25,
      height: 25,
      borderRadius: 12.5,
      borderWidth: 0,
      resizeMode: 'cover'
    }
  },

  get mediumAvatar () {
    return {
      width: 145,
      height: 145,
      borderRadius: 72.5,
      borderWidth: 0,
      resizeMode: 'cover'
    }
  },

  // Containers
  get overlay () {
    return { backgroundColor: Theme.overlay }
  },

  get wrap () {
    return { flexWrap: 'wrap' }
  },

  get roundedSmall () {
    return {
      width: 38,
      height: 38,
      borderRadius: 19,
      padding: 0
    }
  },
  get solidDark () {
    return {
      backgroundColor: Theme.darker
    }
  },
  get solidBright () {
    return {
      backgroundColor: Theme.backgroundColor
    }
  },

  // Screen
  get spaceBetween () {
    return { justifyContent: 'space-between' }
  },

  get fullScreen () {
    return { marginTop: -Theme.toolbarHeight }
  },

  get content () {
    return {
      alignSelf: 'stretch',
      paddingTop: Theme.mediumGutter,
      paddingBottom: Theme.smallGutter,
      paddingHorizontal: Theme.mediumGutter
    }
  },

  get paper () {
    return { color: Theme.white }
  },

  get notificationDot () {
    return {
      alignSelf: 'center',
      flex: 0,
      width: 6,
      height: 6,
      borderRadius: 3,
      borderColor: Theme.dark,
      backgroundColor: Theme.dark,
      marginLeft: -10,
      marginRight: 4
    }
  },

  // NAVIGATION BAR
  get leftComponent () {
    return {
      alignItems: 'flex-start',
      flex: 1
    }
  },

  get titleComponent () {
    return {
      alignItems: 'center',
      flex: 2
    }
  },

  get rightComponent () {
    return {
      alignItems: 'flex-end',
      flex: 1
    }
  },

  // Button
  get darkButton () {
    return {
      backgroundColor: Theme.darker,
      borderColor: Theme.darker
    }
  },

  get tight () {
    return {
      paddingLeft: 0,
      paddingRight: 0
    }
  }

}
