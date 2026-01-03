import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ExploreDetail: React.FC = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Extended list of properties
  const allProperties = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400',
      title: 'Entire Bromo mountain view Cabin in Suraya',
      rented: 526,
      location: 'Suraya, Bromo',
      rating: 4.8,
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      title: 'Modern Beach House',
      rented: 750,
      location: 'Bali, Indonesia',
      rating: 4.9,
    },
    {
      id: '3',
      image: 'https://31sudirmansuites.com/wp-content/uploads/2019/11/FEATURED_10_20191115031104-814x534-1.jpg',
      title: 'Modern Apartmen',
      rented: 7989,
      location: 'Jakarta, Indonesia',
      rating: 4.7,
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      title: 'Luxury Villa with Private Pool',
      rented: 1250,
      location: 'Ubud, Bali',
      rating: 4.9,
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      title: 'Cozy Mountain Retreat',
      rented: 890,
      location: 'Bandung, West Java',
      rating: 4.6,
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
      title: 'Urban Loft Downtown',
      rented: 1580,
      location: 'Surabaya, East Java',
      rating: 4.8,
    },
    {
      id: '7',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
      title: 'Seaside Cottage',
      rented: 650,
      location: 'Lombok, Indonesia',
      rating: 4.7,
    },
    {
      id: '8',
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400',
      title: 'Traditional Wooden House',
      rented: 420,
      location: 'Yogyakarta, Indonesia',
      rating: 4.5,
    },
    {
      id: '9',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400',
      title: 'Penthouse with City View',
      rented: 2100,
      location: 'Jakarta, Indonesia',
      rating: 4.9,
    },
    {
      id: '10',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400',
      title: 'Garden Villa',
      rented: 980,
      location: 'Bogor, West Java',
      rating: 4.6,
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

  const renderPropertyCard = ({ item, index }: { item: any; index: number }) => {
    return (
      <Animated.View
        style={[
          styles.propertyCard,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: slideAnim,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => (navigation as any).navigate('PropertyDetailFull', { property: item })}
        >
          <Image source={{ uri: item.image }} style={styles.propertyImage} />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id)}
          >
            <Icon
              name={favorites.has(item.id) ? 'heart' : 'heart-outline'}
              size={24}
              color={favorites.has(item.id) ? '#FF385C' : '#FFFFFF'}
            />
          </TouchableOpacity>
          <View style={styles.ratingBadge}>
            <Icon name="star" size={14} color="#FFB800" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <View style={styles.propertyInfo}>
            <Text style={styles.propertyTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={styles.locationRow}>
              <Icon name="location-outline" size={14} color="#64748B" />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
            <View style={styles.rentedRow}>
              <Icon name="people-outline" size={14} color="#0F6980" />
              <Text style={styles.rentedText}>{item.rented} people rented</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Your Next Trip</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      {/* List */}
      <FlatList
        data={allProperties}
        renderItem={renderPropertyCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  listContent: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  propertyCard: {
    width: '48%',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 8,
  },
  propertyImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  propertyInfo: {
    padding: 12,
  },
  propertyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
    lineHeight: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
  },
  rentedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rentedText: {
    fontSize: 12,
    color: '#0F6980',
    fontWeight: '500',
  },
});

export default ExploreDetail;