import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SavedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Saved</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
});

export default SavedScreen;
