import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Property } from '../types';
import { Colors } from '../constants';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPress,
  onFavoritePress,
  isFavorite = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: property.images[0] || 'https://via.placeholder.com/400x250' }}
          style={styles.image}
          resizeMode="cover"
        />
        {property.isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        {onFavoritePress && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={onFavoritePress}
            activeOpacity={0.7}
          >
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? Colors.primary : Colors.white}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {property.title}
          </Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color={Colors.star} />
            <Text style={styles.rating}>{property.rating.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.location} numberOfLines={1}>
          <Icon name="map-marker" size={14} color={Colors.textSecondary} />{' '}
          {property.location}
        </Text>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Icon name="bed" size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{property.bedrooms} Beds</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="shower" size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{property.bathrooms} Baths</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="ruler-square" size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{property.area} m²</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>
            Rp {property.price.toLocaleString('id-ID')}
            <Text style={styles.priceUnit}> /night</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  featuredText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingTop: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  priceUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
});

export default PropertyCard;
