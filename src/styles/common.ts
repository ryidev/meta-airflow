import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Colors } from '../constants';

export const commonStyles = {
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  } as ViewStyle,

  safeArea: {
    flex: 1,
  } as ViewStyle,

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  // Card Styles
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  } as ViewStyle,

  // Text Styles
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  } as TextStyle,

  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  } as TextStyle,

  bodyText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  } as TextStyle,

  caption: {
    fontSize: 12,
    color: Colors.textSecondary,
  } as TextStyle,

  // Layout Styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,

  // Spacing
  mt8: { marginTop: 8 } as ViewStyle,
  mt16: { marginTop: 16 } as ViewStyle,
  mt24: { marginTop: 24 } as ViewStyle,
  mb8: { marginBottom: 8 } as ViewStyle,
  mb16: { marginBottom: 16 } as ViewStyle,
  mb24: { marginBottom: 24 } as ViewStyle,
  mx8: { marginHorizontal: 8 } as ViewStyle,
  mx16: { marginHorizontal: 16 } as ViewStyle,
  my8: { marginVertical: 8 } as ViewStyle,
  my16: { marginVertical: 16 } as ViewStyle,

  // Padding
  p8: { padding: 8 } as ViewStyle,
  p16: { padding: 16 } as ViewStyle,
  p24: { padding: 24 } as ViewStyle,
  px8: { paddingHorizontal: 8 } as ViewStyle,
  px16: { paddingHorizontal: 16 } as ViewStyle,
  py8: { paddingVertical: 8 } as ViewStyle,
  py16: { paddingVertical: 16 } as ViewStyle,

  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: 8,
  } as ViewStyle,

  // Image Styles
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  } as ImageStyle,

  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
  } as ImageStyle,

  // Shadow
  shadow: {
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  } as ViewStyle,
};

export default commonStyles;
