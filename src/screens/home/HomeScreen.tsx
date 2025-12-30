import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeStackParamList, MainTabParamList } from '../../types';
import { Property } from '../../types';
import { propertyService } from '../../services/propertyService';
import { Colors } from '../../constants';
import PropertyCard from '../../components/PropertyCard';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'HomeScreen'>,
  BottomTabNavigationProp<MainTabParamList>
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const [allProps, favs] = await Promise.all([
        propertyService.getProperties({ featured: false }),
        propertyService.getFavorites(),
      ]);

      const featuredProps = await propertyService.getProperties({ featured: true });

      setProperties(allProps.properties);
      setFeaturedProperties(featuredProps.properties);
      setFavorites(new Set(favs.map(f => f.propertyId)));
    } catch (error) {
      console.error('Error loading properties:', error);
      Alert.alert('Error', 'Failed to load properties');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProperties();
    setRefreshing(false);
  }, []);

  const handlePropertyPress = (propertyId: string) => {
    navigation.navigate('PropertyDetail', { propertyId });
  };

  const handleFavoritePress = async (propertyId: string) => {
    try {
      const isFav = favorites.has(propertyId);
      if (isFav) {
        const favorite = await propertyService.getFavorites();
        const fav = favorite.find(f => f.propertyId === propertyId);
        if (fav) {
          await propertyService.removeFromFavorites(fav.id);
          setFavorites(prev => {
            const newSet = new Set(prev);
            newSet.delete(propertyId);
            return newSet;
          });
        }
      } else {
        await propertyService.addToFavorites(propertyId);
        setFavorites(prev => new Set(prev).add(propertyId));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Find Your</Text>
        <Text style={styles.title}>Dream Property</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateProperty')}
      >
        <Icon name="plus" size={24} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );

  const renderFeaturedSection = () => {
    if (featuredProperties.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Properties</Text>
        <FlatList
          horizontal
          data={featuredProperties}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.featuredCard}>
              <PropertyCard
                property={item}
                onPress={() => handlePropertyPress(item.id)}
                onFavoritePress={() => handleFavoritePress(item.id)}
                isFavorite={favorites.has(item.id)}
              />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        />
      </View>
    );
  };

  if (isLoading) {
    return <Loading message="Loading properties..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => handlePropertyPress(item.id)}
            onFavoritePress={() => handleFavoritePress(item.id)}
            isFavorite={favorites.has(item.id)}
          />
        )}
        ListHeaderComponent={
          <>
            {renderHeader()}
            {renderFeaturedSection()}
            <Text style={styles.sectionTitle}>All Properties</Text>
          </>
        }
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="home-search" size={80} color={Colors.textLight} />
            <Text style={styles.emptyText}>No properties found</Text>
            <Button
              title="Add Property"
              onPress={() => navigation.navigate('CreateProperty')}
              style={styles.emptyButton}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  featuredList: {
    paddingRight: 16,
  },
  featuredCard: {
    marginRight: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 16,
    marginBottom: 24,
  },
  emptyButton: {
    paddingHorizontal: 32,
  },
});

export default HomeScreen;
