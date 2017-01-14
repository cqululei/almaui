import { Platform } from 'react-native'

export default {
  // Colors
  white: '#FFFFFF',
  grey: '#F2F2F2',
  steel: '#CCCCCC',
  dark: '#333333',
  darker: '#222222',
  black: '#000000',
  clear: 'rgba(0, 0, 0, 0)',
  overlay: 'rgba(0, 0, 0, 0.2)',
  overlayDark: 'rgba(0, 0, 0, 0.4)',

  backgroundColor: '#FFFFFF',
  borderColor: '#CCCCCC',
  dividerColor: '#EEEEEE',
  navigationBarTintColor: '#333333',
  navigationBarBackgroundColor: '#FFFFFF',
  navigationBarBorderColor: 'rgba(20, 20, 20, 0.2)',
  navigationBarTextColor: '#000000',

  textColor: '#666666',
  titleColor: '#222222',
  captionColor: '#555555',
  inverseTextColor: '#FFFFFF',
  placeholderColor: '#A7A7A7',

  // Margins and Peddings
  smallGutter: 5,
  mediumGutter: 15,
  largeGutter: 30,
  extraLargeGutter: 45,

  navigationBarHeight: 70,
  imageHeight: 200,
  videoHeight: 200,

  // Text
  fontFamily: (Platform.OS === 'ios') ? 'HelveticaNeue' : 'Roboto',
  lineHeight: (Platform.OS === 'ios') ? 20 : 24,
  fontSizeBase: 15,

  // Input
  textSelectionColor: 'rgb(107, 138, 218)',

  // Button
  btnFontFamily: (Platform.OS === 'ios') ? 'HelveticaNeue' : 'Roboto_medium',
  btnDisabledBackground: '#b5b5b5',
  btnDisabledColor: '#f1f1f1',

  // Toolbar
  toolbarHeight: (Platform.OS === 'ios') ? 64 : 56
}
