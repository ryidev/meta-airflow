import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileTabScreen: React.FC = () => {
  const navigation = useNavigation();

  const menuItems = [
    { id: 1, icon: 'person-outline', title: 'Personal details', screen: 'Personal' },
    { id: 2, icon: 'settings-outline', title: 'Settings', screen: 'Settings' },
    { id: 3, icon: 'card-outline', title: 'Payment details', screen: null },
    { id: 4, icon: 'help-circle-outline', title: 'FAQ', screen: null },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/720x0/webp/photo/2025/09/26/1043297320.jpg' }} 
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>Asus Turun Gunung</Text>
        <Text style={styles.email}>asusturungunung@gmail.com</Text>
      </View>

      <View style={styles.divider} />

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.menuItem}
            onPress={() => {
              if (item.screen) {
                navigation.navigate(item.screen as never);
              }
            }}
          >
            <View style={styles.iconContainer}>
              <Icon name={item.icon} size={24} color="#000" />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            <Icon name="chevron-forward" size={24} color="#94A3B8" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Switch to Hosting */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <Icon name="home-outline" size={24} color="#000" />
          </View>
          <Text style={styles.menuText}>Switch to hosting</Text>
          <Icon name="chevron-forward" size={24} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      {/* Bottom spacing for tab bar */}
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 30,
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 60,
    backgroundColor: '#dbd5e1ff',
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  email: {
    fontSize: 13,
    color: '#64748B',
  },
  divider: {
    height: 1,
    backgroundColor: '#dadadaff',
    marginHorizontal: 24,
    marginVertical: 10,
  },
  menuSection: {
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 16,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  bottomSpace: {
    height: 100,
  },
});

export default ProfileTabScreen;
