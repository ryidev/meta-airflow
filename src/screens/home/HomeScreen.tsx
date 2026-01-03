import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<'rent' | 'buy'>('rent');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideHeaderAnim = new Animated.Value(-50);
  const scaleSearchAnim = new Animated.Value(0.9);
  const slideSection1Anim = new Animated.Value(50);
  const slideSection2Anim = new Animated.Value(50);
  const slideSection3Anim = new Animated.Value(50);

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

  // Dummy data
  const nearProperties = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400',
      rating: 4.8,
      reviews: 73,
      title: 'Entire Bromo mountain view Cabin in Suraya',
      location: 'Malang, Probolinggo',
      rooms: 2,
      area: 673,
      price: 526,
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      rating: 4.9,
      reviews: 104,
      title: 'Modern Beach House',
      location: 'Surabaya, Beach Road',
      rooms: 3,
      area: 850,
      price: 750,
    },
  ];

  const topRatedProperties = [
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      rating: 4.9,
      reviews: 104,
      title: 'Entire private villa in Surabaya City',
      location: 'Harapan Raya, Surabaya',
      rooms: 2,
      area: 488,
      price: 400,
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      rating: 4.7,
      reviews: 89,
      title: 'Luxury Apartment',
      location: 'Central Surabaya',
      rooms: 4,
      area: 920,
      price: 850,
    },
  ];

  const toggleFavorite = (id: string) => {
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

  // Gabungkan semua properties untuk favorites
  const allProperties = [...nearProperties, ...topRatedProperties];

  const renderPropertyCard = (property: any) => (
    <TouchableOpacity 
      key={property.id} 
      style={styles.propertyCard}
      onPress={() => (navigation as any).navigate('PropertyDetailFull', { property })}
      activeOpacity={0.9}
    >
      <Image source={{ uri: property.image }} style={styles.propertyImage} />
      <TouchableOpacity 
        style={styles.favoriteButton}
        activeOpacity={0.7}
        onPress={(e) => {
          e.stopPropagation();
          toggleFavorite(property.id);
        }}
      >
        <Icon 
          name={favorites.has(property.id) ? "heart" : "heart-outline"} 
          size={24} 
          color={favorites.has(property.id) ? "#FF385C" : "#FFFFFF"} 
        />
      </TouchableOpacity>
      <View style={styles.propertyInfo}>
        <View style={styles.ratingRow}>
          <Icon name="star" size={16} color="#FFB800" />
          <Text style={styles.ratingText}>{property.rating}</Text>
          <Text style={styles.reviewsText}>({property.reviews})</Text>
        </View>
        <Text style={styles.propertyTitle} numberOfLines={2}>
          {property.title}
        </Text>
        <Text style={styles.locationSubtext}>{property.location}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Icon name="bed-outline" size={16} color="#64748B" />
            <Text style={styles.detailText}>{property.rooms} room</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="resize-outline" size={16} color="#64748B" />
            <Text style={styles.detailText}>{property.area} m²</Text>
          </View>
        </View>
        <Text style={styles.priceText}>
          ${property.price}
          <Text style={styles.priceUnit}> /month</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            <Text style={styles.findText}>Find your place in</Text>
            <View style={styles.locationRow}>
              <Icon name="location" size={20} color="#0F6980" />
              <Text style={styles.locationText}>Surabaya, Indonesia</Text>
              <Icon name="chevron-down" size={20} color="#000" />
            </View>
          </View>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/720x0/webp/photo/2025/09/26/1043297320.jpg' }} 
              style={styles.avatar} 
            />
          </View>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View 
          style={[
            styles.searchContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleSearchAnim }]
            }
          ]}
        >
          <Icon name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search address, city, location"
            placeholderTextColor="#94A3B8"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="options-outline" size={20} color="#000" />
          </TouchableOpacity>
        </Animated.View>

      </View>

      {/* Near your location */}
      <Animated.View 
        style={[
          styles.section,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideSection1Anim }]
          }
        ]}
      >
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Near your location</Text>
            <Text style={styles.sectionSubtitle}>243 properties in Surabaya</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {nearProperties.map(property => renderPropertyCard(property))}
        </ScrollView>
      </Animated.View>

      {/* Top rated in Surabaya */}
      <Animated.View 
        style={[
          styles.section,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideSection2Anim }]
          }
        ]}
      >
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Top rated in Surabaya</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {topRatedProperties.map(property => renderPropertyCard(property))}
        </ScrollView>
      </Animated.View>

      {/* Your favorites */}
      <Animated.View 
        style={[
          styles.section,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideSection3Anim }]
          }
        ]}
      >
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>your favorites</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        {allProperties.filter(p => favorites.has(p.id)).length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {allProperties.filter(p => favorites.has(p.id)).map(property => renderPropertyCard(property))}
          </ScrollView>
        ) : (
          <View style={styles.emptyFavContainer}>
            <Icon name="heart-outline" size={48} color="#CBD5E1" />
            <Text style={styles.emptyFavText}>No favorites yet</Text>
            <Text style={styles.emptyFavSubtext}>Tap the heart icon to save properties</Text>
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    color: '#64748B',
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
    color: '#000',
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
    backgroundColor: '#F8FAFC',
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
    color: '#000',
  },
  filterButton: {
    padding: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
  },
  tabActive: {
    backgroundColor: '#0F6980',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  section: {
    marginTop: 24,
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
    color: '#000',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748B',
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
  propertyCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  propertyImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyInfo: {
    padding: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 2,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    lineHeight: 22,
  },
  locationSubtext: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#64748B',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  priceUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: '#64748B',
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
    color: '#64748B',
    marginTop: 12,
  },
  emptyFavSubtext: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
});

export default HomeScreen;
