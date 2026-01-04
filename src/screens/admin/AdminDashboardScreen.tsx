import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Property } from '../../types';

// Mock data for property requests
const MOCK_REQUESTS: Property[] = [
  {
    id: 'req_1',
    title: 'Modern Apartment in Jakarta Selatan',
    description: 'Beautiful 2 bedroom apartment with city view. Near MRT station.',
    price: 15000000,
    location: 'Jakarta Selatan',
    address: 'Jl. Sudirman No. 123',
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
    amenities: [],
    ownerId: 'user_1',
    owner: {
      id: 'user_1',
      name: 'Budi Santoso',
      email: 'budi@example.com',
      createdAt: new Date().toISOString(),
    },
    rating: 0,
    reviewCount: 0,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: 'req_2',
    title: 'Cozy Villa in Bandung',
    description: 'Perfect for weekend getaway. Mountain view and fresh air.',
    price: 2500000,
    location: 'Bandung',
    address: 'Jl. Dago Pakar',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
    amenities: [],
    ownerId: 'user_2',
    owner: {
      id: 'user_2',
      name: 'Siti Aminah',
      email: 'siti@example.com',
      createdAt: new Date().toISOString(),
    },
    rating: 0,
    reviewCount: 0,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'pending',
  },
];

const AdminDashboardScreen: React.FC = () => {
  const { colors } = useTheme();
  const { logout } = useAuth();
  const [requests, setRequests] = useState<Property[]>(MOCK_REQUESTS);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const handleApprove = (id: string, name: string) => {
    Alert.alert('Confirm Approval', `Approve Listing "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Approve',
        onPress: () => {
          setRequests(prev => prev.filter(req => req.id !== id));
          Alert.alert('Success', 'Property has been approved and is now live.');
        }
      }
    ]);
  };

  const handleReject = (id: string, name: string) => {
    Alert.alert('Confirm Rejection', `Reject Listing "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reject',
        style: 'destructive',
        onPress: () => {
          setRequests(prev => prev.filter(req => req.id !== id));
          Alert.alert('Rejected', 'Property request has been rejected.');
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Admin Dashboard</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {requests.length} Pending Approvals
          </Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={[styles.logoutButton, { backgroundColor: colors.surface }]}>
          <Icon name="log-out-outline" size={24} color={colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {requests.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="checkmark-circle-outline" size={80} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>All caught up! No pending requests.</Text>
          </View>
        ) : (
          requests.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: colors.card, shadowColor: '#000' }]}>
              <Image source={{ uri: item.images[0] }} style={styles.cardImage} />

              <View style={styles.cardContent}>
                <View style={styles.row}>
                  <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>REQUEST</Text>
                  </View>
                  <Text style={[styles.date, { color: colors.textSecondary }]}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
                </View>

                <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.price, { color: colors.primary }]}>
                  Rp {item.price.toLocaleString('id-ID')} / month
                </Text>

                <View style={styles.ownerInfo}>
                  <Icon name="person-circle-outline" size={20} color={colors.textSecondary} />
                  <Text style={[styles.ownerName, { color: colors.textSecondary }]}>
                    {item.owner?.name} ({item.owner?.email})
                  </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={() => handleReject(item.id, item.title)}
                  >
                    <Text style={styles.rejectText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.approveButton, { backgroundColor: colors.primary }]}
                    onPress={() => handleApprove(item.id, item.title)}
                  >
                    <Text style={styles.approveText}>Approve</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 12,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
  },
  card: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagContainer: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1565C0',
  },
  date: {
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  ownerName: {
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#ff0000ff',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  approveButton: {
    // Background color set via props
  },
  rejectText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  approveText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default AdminDashboardScreen;
