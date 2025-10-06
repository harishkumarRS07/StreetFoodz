import React from 'react';
import { View, Text, StyleSheet, Button, Linking, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRouter } from 'expo-router';

const OrderTrackingScreen = () => {
  const router = useRouter();

  // Delivery boy details
  const deliveryBoy = {
    name: 'Ravi Kumar',
    phone: '+919876543210',
    status: 'On the way',
  };

  // Hotel location
  const hotelLocation = {
    latitude: 12.9716, // Example coordinates for the hotel
    longitude: 77.5946,
  };

  // Home location
  const homeLocation = {
    latitude: 12.9352, // Example coordinates for the home
    longitude: 77.6247,
  };

  // Handle call to delivery boy
  const handleCallDeliveryBoy = () => {
    Linking.openURL(`tel:${deliveryBoy.phone}`).catch((err) =>
      Alert.alert('Error', 'Failed to make a call')
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mapTitle}>Your Delivery Route</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: (hotelLocation.latitude + homeLocation.latitude) / 2,
          longitude: (hotelLocation.longitude + homeLocation.longitude) / 2,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Hotel Marker */}
        <Marker coordinate={hotelLocation} title="Hotel" description="Biryani House" />
        {/* Home Marker */}
        <Marker coordinate={homeLocation} title="Your Home" description="Destination" />

        {/* Route between Hotel and Home */}
        <Polyline
          coordinates={[hotelLocation, homeLocation]}
          strokeColor="#ff6347"
          strokeWidth={3}
        />
      </MapView>

      <View style={styles.deliveryInfo}>
        <Text style={styles.deliveryInfoTitle}>Delivery Boy Details</Text>
        <Text style={styles.deliveryInfoText}>Name: {deliveryBoy.name}</Text>
        <Text style={styles.deliveryInfoText}>Status: {deliveryBoy.status}</Text>
        <Button title="Call Delivery Boy" onPress={handleCallDeliveryBoy} />
      </View>

      <Button title="Back to Cart" onPress={() => router.push('/cart')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  deliveryInfo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  deliveryInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deliveryInfoText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default OrderTrackingScreen;
