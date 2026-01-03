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

const ExploreScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'rent' | 'buy'>('rent');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);
  const slideAnim = new Animated.Value(30);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Dummy data
  const nearProperties = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400',
      title: 'Entire Bromo mountain view Cabin in Suraya',
      rented: 526,
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      title: 'Modern Beach House',
      rented: 750,
    },
    {
      id: '3',
      image: 'https://31sudirmansuites.com/wp-content/uploads/2019/11/FEATURED_10_20191115031104-814x534-1.jpg',
      title: 'Modern Apartmen',
      rented: 7989,
    },
  ];

  const topRatedProperties = [
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      title: 'Beach',
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      title: 'Luxury ',
    },
    {
      id:'6',
      image: 'https://www.laconservancy.org/wp-content/uploads/2022/10/JapaneseHouse_KellySutherlinMcLeodArchitectureInc.jpg',
      title: 'Japanese',
    },
  ];

  const renderPropertyCard = (property: any) => (
    <View key={property.id} style={styles.propertyCard}>
      <Image source={{ uri: property.image }} style={styles.propertyImage} />
      <View style={styles.propertyInfo}>
        
        <Text style={styles.propertyTitle} numberOfLines={2}>
          {property.title}
        </Text>
        <Text style={styles.locationSubtext}>Rented props {property.rented}</Text>
 
      </View>
    </View>
  );
  const renderPropertyCard1 = (property: any) => (
    <View key={property.id} style={styles.propertyCard1}>
      <Image source={{ uri: property.image }} style={styles.propertyImage} />
      <View style={styles.propertyInfo}>
        
        <Text style={styles.propertyTitle} numberOfLines={2}>
          {property.title}
        </Text>
 
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <Animated.View 
        style={[
          styles.searchContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
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
      <Animated.View 
        style={[
          styles.section,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Find your next trip!</Text>
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
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Exploring about your living style?</Text>
          </View>
          
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {topRatedProperties.map(property => renderPropertyCard1(property))}
        </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',//
    borderRadius: 50,
    paddingHorizontal: 26,
    marginHorizontal: 16,
    height: 52,
    marginTop: 75,
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
    fontSize: 16,
    marginBottom: 10,
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
    width: 175,
    marginRight: 26,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  propertyCard1: {
    width: 240,
    marginRight: 26,
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
  emptyFavText: {
    fontSize: 15,
    color: '#94A3B8',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
});

export default ExploreScreen;
