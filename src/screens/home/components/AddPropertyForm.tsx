import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../context/ThemeContext';
import { launchImageLibrary } from 'react-native-image-picker';

interface AddPropertyFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
  containerStyle?: any;
}

const AddPropertyForm: React.FC<AddPropertyFormProps> = ({ onBack, onSubmit, containerStyle }) => {
  const { colors } = useTheme();

  const [propertyName, setPropertyName] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [propertyPrice, setPropertyPrice] = useState('');
  const [propertyArea, setPropertyArea] = useState('');
  const [propertyRooms, setPropertyRooms] = useState('');
  const [propertyImage, setPropertyImage] = useState<string | null>(null);
  const [propertyDescription, setPropertyDescription] = useState('');

  const handleImageSelect = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.8,
    });

    if (result.assets && result.assets[0]?.uri) {
      setPropertyImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      propertyName,
      propertyLocation,
      propertyPrice,
      propertyArea,
      propertyRooms,
      propertyImage: propertyImage || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400', // Fallback if no image
      propertyDescription
    });
  };

  return (
    <Animated.View style={[styles.formContainer, containerStyle]}>
      <View style={styles.formHeader}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.formTitle, { color: colors.text }]}>List Your Property</Text>
          <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
            Fill in the details to list your property for rent or sale.
          </Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Property Title</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          placeholder="e.g. Modern Villa with Pool"
          placeholderTextColor={colors.textSecondary}
          value={propertyName}
          onChangeText={setPropertyName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Location</Text>
        <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Icon name="location-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.inputFlex, { color: colors.text }]}
            placeholder="e.g. Surabaya, East Java"
            placeholderTextColor={colors.textSecondary}
            value={propertyLocation}
            onChangeText={setPropertyLocation}
          />
        </View>
      </View>

      <View style={styles.rowInputs}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
          <Text style={[styles.label, { color: colors.text }]}>Price (USD)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
            placeholder="e.g. 500"
            keyboardType="numeric"
            placeholderTextColor={colors.textSecondary}
            value={propertyPrice}
            onChangeText={setPropertyPrice}
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={[styles.label, { color: colors.text }]}>Size (sqm)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
            placeholder="e.g. 120"
            keyboardType="numeric"
            placeholderTextColor={colors.textSecondary}
            value={propertyArea}
            onChangeText={setPropertyArea}
          />
        </View>
      </View>

      <View style={styles.rowInputs}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
          <Text style={[styles.label, { color: colors.text }]}>Bedroom</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
            placeholder="e.g. 3"
            keyboardType="numeric"
            placeholderTextColor={colors.textSecondary}
            value={propertyRooms}
            onChangeText={setPropertyRooms}
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={[styles.label, { color: colors.text }]}>Property Image</Text>
          <TouchableOpacity
            style={[styles.imageUploadBtn, { borderColor: colors.border, backgroundColor: colors.surface }]}
            onPress={handleImageSelect}
          >
            {propertyImage ? (
              <Image source={{ uri: propertyImage }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Icon name="camera-outline" size={24} color={colors.textSecondary} />
                <Text style={[styles.uploadText, { color: colors.textSecondary }]}>Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Description</Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          placeholder="Describe your property..."
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={4}
          value={propertyDescription}
          onChangeText={setPropertyDescription}
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        activeOpacity={0.8}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Submit Listing</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    paddingTop: 10,
  },
  formHeader: {
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputFlex: {
    flex: 1,
    fontSize: 15,
    height: '100%',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textArea: {
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    fontSize: 15,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#0F6980',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 32,
    shadowColor: '#0F6980',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  imageUploadBtn: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  uploadPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  uploadText: {
    fontSize: 14,
  },
});

export default AddPropertyForm;
