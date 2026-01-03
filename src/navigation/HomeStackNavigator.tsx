import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import PropertyDetailFullScreen from '../screens/property/PropertyDetailFullScreen';
import RentBookingScreen from '../screens/booking/RentBookingScreen';
import { Colors } from '../constants';

export type HomeStackParamList = {
  HomeMain: undefined;
  PropertyDetailFull: { property: any };
  RentBooking: { property: any };
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.white,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PropertyDetailFull"
        component={PropertyDetailFullScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RentBooking"
        component={RentBookingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
