import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { launchImageLibrary } from 'react-native-image-picker';
import { HomeStackParamList, CreatePropertyData } from '../../types';
import { propertyService } from '../../services/propertyService';
import { Colors, AMENITIES_LIST } from '../../constants';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CreatePropertyScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'CreateProperty'
>;

interface Props {
  navigation: CreatePropertyScreenNavigationProp;
}

const CreatePropertyScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenityId)) {
        return prev.filter(id => id !== amenityId);
      } else {
        return [...prev, amenityId];
      }
    });
  };

  const handleImagePicker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 5,
      });

      if (result.assets) {
        const newImages = result.assets
          .filter(asset => asset.uri)
          .map(asset => asset.uri!);
        setImages(prev => [...prev, ...newImages]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick images');
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors: any = {};

    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.bedrooms) newErrors.bedrooms = 'Bedrooms is required';
    if (!formData.bathrooms) newErrors.bathrooms = 'Bathrooms is required';
    if (!formData.area) newErrors.area = 'Area is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const propertyData: CreatePropertyData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
        address: formData.address,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseFloat(formData.area),
        amenities: selectedAmenities,
        images: images,
      };

      await propertyService.createProperty(propertyData);
      Alert.alert('Success', 'Property created successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      console.error('Error creating property:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to create property'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Basic Information</Text>

        <Input
          label="Title"
          placeholder="Beautiful 2BR Apartment"
          value={formData.title}
          onChangeText={(value) => handleInputChange('title', value)}
          error={errors.title}
        />

        <Input
          label="Description"
          placeholder="Describe your property..."
          value={formData.description}
          onChangeText={(value) => handleInputChange('description', value)}
          multiline
          numberOfLines={4}
          style={styles.textArea}
          error={errors.description}
        />

        <Input
          label="Price per Night (Rp)"
          placeholder="500000"
          value={formData.price}
          onChangeText={(value) => handleInputChange('price', value)}
          keyboardType="numeric"
          leftIcon="currency-usd"
          error={errors.price}
        />

        <Input
          label="Location"
          placeholder="Jakarta, Indonesia"
          value={formData.location}
          onChangeText={(value) => handleInputChange('location', value)}
          leftIcon="map-marker"
          error={errors.location}
        />

        <Input
          label="Full Address"
          placeholder="Jl. Example No. 123"
          value={formData.address}
          onChangeText={(value) => handleInputChange('address', value)}
          leftIcon="home-map-marker"
          error={errors.address}
        />

        <View style={styles.row}>
          <Input
            label="Bedrooms"
            placeholder="2"
            value={formData.bedrooms}
            onChangeText={(value) => handleInputChange('bedrooms', value)}
            keyboardType="numeric"
            containerStyle={styles.halfInput}
            error={errors.bedrooms}
          />
          <Input
            label="Bathrooms"
            placeholder="1"
            value={formData.bathrooms}
            onChangeText={(value) => handleInputChange('bathrooms', value)}
            keyboardType="numeric"
            containerStyle={styles.halfInput}
            error={errors.bathrooms}
          />
        </View>

        <Input
          label="Area (m²)"
          placeholder="80"
          value={formData.area}
          onChangeText={(value) => handleInputChange('area', value)}
          keyboardType="numeric"
          leftIcon="ruler-square"
          error={errors.area}
        />

        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesContainer}>
          {AMENITIES_LIST.map((amenity) => (
            <TouchableOpacity
              key={amenity.id}
              style={[
                styles.amenityChip,
                selectedAmenities.includes(amenity.id) && styles.amenityChipSelected,
              ]}
              onPress={() => handleAmenityToggle(amenity.id)}
            >
              <Icon
                name={amenity.icon}
                size={20}
                color={
                  selectedAmenities.includes(amenity.id)
                    ? Colors.white
                    : Colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.amenityText,
                  selectedAmenities.includes(amenity.id) && styles.amenityTextSelected,
                ]}
              >
                {amenity.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Images</Text>
        <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePicker}>
          <Icon name="camera-plus" size={32} color={Colors.primary} />
          <Text style={styles.imagePickerText}>Add Images</Text>
        </TouchableOpacity>

        {images.length > 0 && (
          <View style={styles.imagesContainer}>
            {images.map((uri, index) => (
              <View key={index} style={styles.imagePreview}>
                <Image source={{ uri }} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                >
                  <Icon name="close-circle" size={24} color={Colors.error} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        {errors.images && <Text style={styles.errorText}>{errors.images}</Text>}

        <Button
          title="Create Property"
          onPress={handleSubmit}
          isLoading={isLoading}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 0.48,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  amenityChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  amenityText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  amenityTextSelected: {
    color: Colors.white,
  },
  imagePickerButton: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    fontSize: 16,
    color: Colors.primary,
    marginTop: 8,
    fontWeight: '600',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 8,
    marginBottom: 8,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default CreatePropertyScreen;
