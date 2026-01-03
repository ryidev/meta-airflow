import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
  initialFilters?: FilterValues;
}

export interface FilterValues {
  page?: number;
  limit?: number;
  city?: string;
  state?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyTypeId?: string;
  furnished?: boolean;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'rating';
  latitude?: number;
  longitude?: number;
  radius?: number;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  initialFilters,
}) => {
  const { colors } = useTheme();
  const [filters, setFilters] = useState<FilterValues>(initialFilters || {});

  const updateFilter = (key: keyof FilterValues, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({});
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rating' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
  ];

  const bedroomOptions = [1, 2, 3, 4, 5];
  const bathroomOptions = [1, 2, 3, 4];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Filters</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* City */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: colors.text }]}>City</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
                placeholder="Enter city name"
                placeholderTextColor={colors.textSecondary}
                value={filters.city}
                onChangeText={(text) => updateFilter('city', text)}
              />
            </View>

            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: colors.text }]}>Price Range</Text>
              <View style={styles.priceRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.subLabel, { color: colors.textSecondary }]}>Min</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
                    placeholder="0"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={filters.minPrice?.toString()}
                    onChangeText={(text) => updateFilter('minPrice', text ? parseInt(text) : undefined)}
                  />
                </View>
                <Text style={[styles.priceSeparator, { color: colors.textSecondary }]}>-</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.subLabel, { color: colors.textSecondary }]}>Max</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
                    placeholder="∞"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={filters.maxPrice?.toString()}
                    onChangeText={(text) => updateFilter('maxPrice', text ? parseInt(text) : undefined)}
                  />
                </View>
              </View>
            </View>

            {/* Bedrooms */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: colors.text }]}>Bedrooms</Text>
              <View style={styles.optionsRow}>
                {bedroomOptions.map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.optionButton,
                      { backgroundColor: colors.surface, borderColor: colors.border },
                      filters.bedrooms === num && styles.optionButtonActive,
                    ]}
                    onPress={() => updateFilter('bedrooms', filters.bedrooms === num ? undefined : num)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        { color: colors.text },
                        filters.bedrooms === num && styles.optionTextActive,
                      ]}
                    >
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bathrooms */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: colors.text }]}>Bathrooms</Text>
              <View style={styles.optionsRow}>
                {bathroomOptions.map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.optionButton,
                      { backgroundColor: colors.surface, borderColor: colors.border },
                      filters.bathrooms === num && styles.optionButtonActive,
                    ]}
                    onPress={() => updateFilter('bathrooms', filters.bathrooms === num ? undefined : num)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        { color: colors.text },
                        filters.bathrooms === num && styles.optionTextActive,
                      ]}
                    >
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sort By */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: colors.text }]}>Sort By</Text>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.sortOption,
                    { backgroundColor: colors.surface },
                    filters.sortBy === option.value && { backgroundColor: '#0F698010' },
                  ]}
                  onPress={() => updateFilter('sortBy', option.value)}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      { color: colors.text },
                      filters.sortBy === option.value && { color: '#0F6980', fontWeight: '600' },
                    ]}
                  >
                    {option.label}
                  </Text>
                  {filters.sortBy === option.value && (
                    <Icon name="checkmark-circle" size={20} color="#0F6980" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <TouchableOpacity
              style={[styles.resetButton, { backgroundColor: colors.surface }]}
              onPress={handleReset}
            >
              <Text style={[styles.resetButtonText, { color: colors.text }]}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  scrollContent: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  subLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  priceSeparator: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionButtonActive: {
    backgroundColor: '#0F6980',
    borderColor: '#0F6980',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  sortOptionText: {
    fontSize: 15,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#0F6980',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FilterModal;
