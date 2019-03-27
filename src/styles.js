import { StyleSheet, Platform } from 'react-native';
import { width, scale, verticalScale, moderateScale } from './sizes.js';

import { getAppDarkColor, getOrangeColor, getRedErrorColor } from './utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: 'white'
  },
  textInput: {
    height: verticalScale(50),
    backgroundColor: 'white',
    marginBottom: verticalScale(10),
    color: 'gray',
    paddingHorizontal: scale(10),
    borderRadius: 8,
    fontSize: moderateScale(18),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black'
  },
  buttonContainer: {
    height: verticalScale(50),
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: '#336699'
  }
});

export default styles;