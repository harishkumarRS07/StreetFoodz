import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();

  
  const [userInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St, Karur, India',
    profilePicture: 'https://example.com/profile-pic.jpg', 
  });


  const [orderHistory] = useState([
    { id: 1, name: 'Biryani House', date: '2024-10-10', total: '₹400', status: 'Delivered' },
    { id: 2, name: 'Pizza Street Cart', date: '2024-10-09', total: '₹300', status: 'Pending' },
    { id: 3, name: 'Chaat Hub', date: '2024-10-08', total: '₹150', status: 'Delivered' },
  ]);


  const [settings] = useState([
    { id: 1, name: 'Notifications' },
    { id: 2, name: 'Payment Methods' },
    { id: 3, name: 'Help & Support' },
  ]);

 
  const handleEditProfile = () => {
    router.push('/profile/edit-profile');  
  };

 
  const handleOrderHistoryPress = (order) => {
    
    Alert.alert('Order Details', `View details for order ${order.id}`);
  };


  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => Alert.alert('Logged Out', 'You have been logged out successfully!') },
      ],
      { cancelable: false }
    );
  };


  const handleSettingsPress = (settingName) => {
    switch (settingName) {
      case 'Notifications':
        router.push('/profile/notifications');
        break;
      case 'Payment Methods':
        router.push('/profile/payment-methods');
        break;
      case 'Help & Support':
        router.push('/profile/help-support');
        break;
      default:
        Alert.alert('Error', 'Invalid setting option.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.profileContainer}>
        <Image source={{ uri: userInfo.profilePicture }} style={styles.profilePicture} />
        <Text style={styles.profileName}>{userInfo.name}</Text>
        <Text style={styles.profileEmail}>{userInfo.email}</Text>
        <Text style={styles.profilePhone}>{userInfo.phone}</Text>
        <Text style={styles.profileAddress}>{userInfo.address}</Text>

        <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.orderHistoryContainer}>
        <Text style={styles.sectionTitle}>Order History</Text>
        {orderHistory.length > 0 ? (
          orderHistory.map((order) => (
            <View key={order.id} style={styles.orderItem}>
              <Text style={styles.orderItemName}>{order.name}</Text>
              <Text>Date: {order.date}</Text>
              <Text>Total: {order.total}</Text>
              <Text>Status: {order.status}</Text>
              <TouchableOpacity
                style={styles.viewOrderButton}
                onPress={() => handleOrderHistoryPress(order)}
              >
                <Text style={styles.viewOrderButtonText}>View Order</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyOrderText}>No orders found.</Text>
        )}
      </View>

     
      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {settings.map((setting) => (
          <TouchableOpacity
            key={setting.id}
            style={styles.settingsItem}
            onPress={() => handleSettingsPress(setting.name)}
          >
            <Text style={styles.settingsItemText}>{setting.name}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: 'gray',
  },
  profilePhone: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  profileAddress: {
    fontSize: 16,
    marginTop: 5,
  },
  editProfileButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  orderHistoryContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderItem: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewOrderButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 5,
  },
  viewOrderButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyOrderText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  settingsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  settingsItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
  settingsItemText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
