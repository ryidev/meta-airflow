import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../context/ThemeContext';
import PropertyCard from './PropertyCard';

interface UserPropertiesListProps {
  properties: any[];
  onAddPress: () => void;
  onPropertyPress: (property: any) => void;
  containerStyle?: any;
}

const UserPropertiesList: React.FC<UserPropertiesListProps> = ({
  properties,
  onAddPress,
  onPropertyPress,
  containerStyle
}) => {
  const { colors } = useTheme();

  return (
    <Animated.View style={[styles.section, containerStyle]}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Properties</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            {properties.length} listed properties
          </Text>
        </View>
      </View>

      {properties.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {properties.map(property => (
            <View key={property.id} style={{ position: 'relative' }}>
              <PropertyCard
                property={property}
                onPress={() => onPropertyPress(property)}
              // No favorite toggle for own properties usually? Or keep it? keeping it simpler for now
              />
              <View style={[styles.statusBadge, {
                backgroundColor: property.status === 'approved' ? '#4ADE80' : '#FBBF24'
              }]}>
                <Text style={styles.statusText}>{property.status?.toUpperCase()}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Icon name="home-outline" size={60} color={colors.textSecondary} />
          <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>You have no listed properties yet.</Text>
        </View>
      )}

      {/* Add bottom padding for FAB visibility */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={onAddPress}
          activeOpacity={0.8}
        >
          <Icon name="add" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 10,
    paddingLeft: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingRight: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  horizontalScroll: {
    paddingBottom: 8,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 10,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 40,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 14,
  },
  fabContainer: {
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 100,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});

export default UserPropertiesList;
