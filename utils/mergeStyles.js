import _ from 'lodash'
export default (styles, styleList) => {
  let newStyle = {}

  _.forEach(styleList, function (style) {
    newStyle = styles[style]
      ? {...newStyle, ...styles[style]}
      : newStyle
  })

  return newStyle
}
