import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../types';
import { Colors } from '../../constants';

type EditPropertyScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'EditProperty'
>;
type EditPropertyScreenRouteProp = RouteProp<HomeStackParamList, 'EditProperty'>;

interface Props {
  navigation: EditPropertyScreenNavigationProp;
  route: EditPropertyScreenRouteProp;
}

const EditPropertyScreen: React.FC<Props> = ({ navigation, route }) => {
  const { propertyId } = route.params;

  // Similar to CreatePropertyScreen but with pre-filled data
  // Implementation can be added based on CreatePropertyScreen

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Property Screen - ID: {propertyId}</Text>
      <Text style={styles.subtext}>Implementation similar to Create Property</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default EditPropertyScreen;
