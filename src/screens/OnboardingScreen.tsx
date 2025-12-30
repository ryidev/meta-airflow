import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../types';

const { width } = Dimensions.get('window');

type OnboardingScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Property Images Grid */}
      <View style={styles.imageGrid}>
        {/* Row 1 */}
        <View style={styles.row}>
          <View style={[styles.imageContainer, styles.largeImage]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400' }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.column}>
            <View style={[styles.imageContainer, styles.mediumImage]}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400' }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={[styles.imageContainer, styles.mediumImage]}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400' }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <View style={[styles.imageContainer, styles.smallImage1]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400' }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.imageContainer, styles.mediumImage]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400' }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          <View style={[styles.imageContainer, styles.smallImage]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800' }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.imageContainer, styles.smallImage]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800' }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.imageContainer, styles.smallImage]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.heading}>Ready to start a new chapter?</Text>
        <Text style={styles.subheading}>RentVerse is here to guide you home</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageGrid: {
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  column: {
    flex: 1,
    gap: 12,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  largeImage: {
    width: (width - 44) * 0.4,
    height: 200,
  },
  mediumImage: {
    flex: 1,
    height: 94,
  },
  smallImage: {
    flex: 1,
    height: 120,
  },
  smallImage1: {
    flex: 2,
    height: 94,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 20,
  },
  heading: {
    fontSize: 23,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '300',
    color: '#000000',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },
  loginButton: {
    backgroundColor: '#6366F1',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  signupButtonText: {
    color: '#1F2937',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
