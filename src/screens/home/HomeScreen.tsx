import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { nearProperties, topRatedProperties, userProperties, allProperties } from './mockData';
import PropertyCard from './components/PropertyCard';
import AddPropertyForm from './components/AddPropertyForm';
import UserPropertiesList from './components/UserPropertiesList';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'rent' | 'buy'>('rent');
  const [listingMode, setListingMode] = useState<'list' | 'create'>('list');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideHeaderAnim = useRef(new Animated.Value(-50)).current;
  const scaleSearchAnim = useRef(new Animated.Value(0.9)).current;
  const slideSection1Anim = useRef(new Animated.Value(50)).current;
  const slideSection2Anim = useRef(new Animated.Value(50)).current;
  const slideSection3Anim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideHeaderAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleSearchAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideSection1Anim, {
        toValue: 0,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideSection2Anim, {
        toValue: 0,
        duration: 500,
        delay: 450,
        useNativeDriver: true,
      }),
      Animated.timing(slideSection3Anim, {
        toValue: 0,
        duration: 500,
        delay: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const toggleFavorite = (id: string, e: any) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleAddPropertySubmit = (data: any) => {
    // Logic to handle new property submission
    console.log('New Property Data:', data);
    Alert.alert('Success', 'Property submitted successfully!');
    setListingMode('list');
  };

  const sectionStyle = (animValue: Animated.Value) => ({
    marginTop: 24,
    paddingLeft: 16,
    opacity: fadeAnim,
    transform: [{ translateY: animValue }]
  });

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Animated.View
          style={[
            styles.topBar,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideHeaderAnim }]
            }
          ]}
        >
          <View style={styles.locationContainer}>
            <Text style={[styles.findText, { color: colors.textSecondary }]}>
              {selectedTab === 'rent' ? 'Find your place in' : 'List property in'}
            </Text>
            <View style={styles.locationRow}>
              <Icon name="location" size={20} color="#0F6980" />
              <Text style={[styles.locationText, { color: colors.text }]}>Surabaya, Indonesia</Text>
              <Icon name="chevron-down" size={20} color={colors.text} />
            </View>
          </View>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/720x0/webp/photo/2025/09/26/1043297320.jpg' }}
              style={styles.avatar}
            />
          </View>
        </Animated.View>

        {/* Search Bar - Always Visible */}
        <Animated.View
          style={[
            styles.searchContainer,
            {
              backgroundColor: colors.surface,
              opacity: fadeAnim,
              transform: [{ scale: scaleSearchAnim }]
            }
          ]}
        >
          <Icon name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={
              selectedTab === 'rent'
                ? "Search address, city, location"
                : "Search your properties"
            }
            placeholderTextColor={colors.textSecondary}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="options-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </Animated.View>

        {/* Start Toggle Section */}
        <Animated.View
          style={{
            marginTop: 24,
            opacity: fadeAnim,
            transform: [{ translateY: scaleSearchAnim }]
          }}
        >
          <Text style={[styles.questionText, { color: colors.text }]}>What do you need?</Text>
          <View style={[styles.toggleContainer, { backgroundColor: colors.surface }]}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedTab === 'rent' && { backgroundColor: colors.primary }
              ]}
              onPress={() => setSelectedTab('rent')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.toggleText,
                  selectedTab === 'rent' ? { color: '#FFFFFF' } : { color: colors.textSecondary }
                ]}
              >
                I need to rent
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedTab === 'buy' && { backgroundColor: colors.primary }
              ]}
              onPress={() => {
                setSelectedTab('buy');
                setListingMode('list');
              }}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.toggleText,
                  selectedTab === 'buy' ? { color: '#FFFFFF' } : { color: colors.textSecondary }
                ]}
              >
                I want to list
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        {/* End Toggle Section */}

      </View>

      {/* Content Section */}
      {selectedTab === 'rent' ? (
        <>
          {/* Near your location */}
          <Animated.View style={sectionStyle(slideSection1Anim)}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Near your location</Text>
                <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>243 properties in Surabaya</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {nearProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onPress={() => (navigation as any).navigate('PropertyDetailFull', { property })}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.has(property.id)}
                />
              ))}
            </ScrollView>
          </Animated.View>

          {/* Top rated in Surabaya */}
          <Animated.View style={sectionStyle(slideSection2Anim)}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Top rated in Surabaya</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {topRatedProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onPress={() => (navigation as any).navigate('PropertyDetailFull', { property })}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.has(property.id)}
                />
              ))}
            </ScrollView>
          </Animated.View>

          {/* Your favorites */}
          <Animated.View style={sectionStyle(slideSection3Anim)}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Your favorites</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            {allProperties.filter(p => favorites.has(p.id)).length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                {allProperties.filter(p => favorites.has(p.id)).map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onPress={() => (navigation as any).navigate('PropertyDetailFull', { property })}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.has(property.id)}
                  />
                ))}
              </ScrollView>
            ) : (
              <View style={styles.emptyFavContainer}>
                <Icon name="heart-outline" size={48} color={colors.textSecondary} />
                <Text style={[styles.emptyFavText, { color: colors.textSecondary }]}>No favorites yet</Text>
                <Text style={[styles.emptyFavSubtext, { color: colors.textSecondary }]}>Tap the heart icon to save properties</Text>
              </View>
            )}
          </Animated.View>
        </>
      ) : (
        listingMode === 'list' ? (
          <UserPropertiesList
            properties={userProperties}
            onAddPress={() => setListingMode('create')}
            onPropertyPress={(property) => (navigation as any).navigate('PropertyDetailFull', { property })}
            containerStyle={{ opacity: fadeAnim, transform: [{ translateY: slideSection1Anim }] }}
          />
        ) : (
          <AddPropertyForm
            onBack={() => setListingMode('list')}
            onSubmit={handleAddPropertySubmit}
            containerStyle={{ opacity: fadeAnim, transform: [{ translateY: slideSection1Anim }] }}
          />
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    padding: 16,
    paddingTop: 50,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    marginTop: 20,
  },
  locationContainer: {
    flex: 1,
  },
  findText: {
    fontSize: 14,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 16,
    height: 52,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  filterButton: {
    padding: 4,
  },
  sectionHeader: { // Used in HomeScreen for rent sections
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
  seeAllText: {
    fontSize: 15,
    color: '#6366F1',
    fontWeight: '500',
  },
  horizontalScroll: {
    paddingBottom: 8,
  },
  emptyFavContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyFavText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  emptyFavSubtext: {
    fontSize: 14,
    marginTop: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 50,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default HomeScreen;
