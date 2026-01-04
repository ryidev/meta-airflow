import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface LocationInfo {
  coords: LocationCoords;
  city: string;
  state: string;
  country: string;
}

class LocationService {
  async requestPermissions(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show nearby properties.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      // iOS permissions are handled in Info.plist
      return true;
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      return false;
    }
  }

  async getCurrentLocation(): Promise<LocationInfo | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        console.log('Location permission denied');
        return null;
      }

      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Get location details from reverse geocoding
            const locationData = await this.getLocationFromCoords(latitude, longitude);

            resolve({
              coords: { latitude, longitude },
              city: locationData.city,
              state: locationData.state,
              country: locationData.country,
            });
          },
          (error) => {
            console.error('Error getting location:', error);
            reject(error);
          },
          {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 10000,
          }
        );
      });
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  async getCityFromCoords(latitude: number, longitude: number): Promise<string> {
    try {
      const locationData = await this.getLocationFromCoords(latitude, longitude);
      return locationData.city || 'Unknown';
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return 'Unknown';
    }
  }

  async getLocationFromCoords(latitude: number, longitude: number): Promise<{
    city: string;
    state: string;
    country: string;
    countryCode: string;
    address: string;
  }> {
    try {
      // Using OpenStreetMap Nominatim for reverse geocoding (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'RentverseApp/1.0',
          },
        }
      );

      const data = await response.json();

      if (data && data.address) {
        // Get major city - prioritize city over smaller localities
        const city = this.getMajorCity(data.address);

        // Get state/province
        const state = data.address.state || data.address.province || data.address.region || '';

        // Get country
        const country = data.address.country || '';
        const countryCode = data.address.country_code?.toUpperCase() || '';

        // Map country codes to our system
        let mappedCountryCode = countryCode;
        if (countryCode === 'MY') {
          mappedCountryCode = 'MY';
        } else if (countryCode === 'ID') {
          mappedCountryCode = 'ID';
        }

        // Get full address
        const address = data.display_name || '';

        return {
          city: this.capitalizeWords(city),
          state: this.capitalizeWords(state),
          country: this.capitalizeWords(country),
          countryCode: mappedCountryCode,
          address,
        };
      }

      return {
        city: 'Unknown',
        state: '',
        country: '',
        countryCode: 'MY',
        address: '',
      };
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return {
        city: 'Unknown',
        state: '',
        country: '',
        countryCode: 'MY',
        address: '',
      };
    }
  }

  private getMajorCity(address: any): string {
    // Priority order: city > town > municipality > county > village
    // This ensures we get major cities instead of small localities
    return (
      address.city ||
      address.town ||
      address.municipality ||
      address.county ||
      address.village ||
      'Unknown'
    );
  }

  private capitalizeWords(str: string): string {
    if (!str) return '';
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  getDefaultLocation(): LocationInfo {
    return {
      coords: {
        latitude: 5.4164,
        longitude: 100.3327,
      },
      city: 'George Town',
      state: 'Penang',
      country: 'Malaysia',
    };
  }
}

export const locationService = new LocationService();
