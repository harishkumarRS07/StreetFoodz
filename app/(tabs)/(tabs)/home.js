import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import { supabase } from '../../../supabase/supabase';//Adjust the relative path based on where your current file is

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [streetFoodShops, setStreetFoodShops] = useState([]);
  const router = useRouter(); 

  // Fetch data from Supabase
  useEffect(() => {
    const fetchShops = async () => {
      const { data, error } = await supabase
        .from('street_food_shops')  // Supabase table for shops
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setStreetFoodShops(data);
      }
    };

    fetchShops();
  }, []);

  const handleShopPress = (shop) => {
    router.push({
      pathname: '/checkout/HotelMenuScreen',
      params: {
        shop: JSON.stringify(shop),  
      },
    });
  };

  const filteredShops = streetFoodShops.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    shop.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.locationContainer}>
          <Entypo name="location-pin" size={24} color="red" />
          <Text style={styles.locationText}>Karur</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search street food or shop"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <TouchableOpacity>
            <Entypo name="magnifying-glass" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.shopListContainer}>
        <Text style={styles.sectionTitle}>Street Food Shops Near You</Text>
        {filteredShops.length > 0 ? (
          filteredShops.map((shop) => (
            <TouchableOpacity 
              key={shop.id} 
              style={styles.shopCard} 
              onPress={() => handleShopPress(shop)}
            >
              <Image source={{ uri: shop.imageUrl }} style={styles.shopImage} />
              <View style={styles.shopInfo}>
                <Text style={styles.shopName}>{shop.name}</Text>
                <Text>{shop.type} · {shop.distance}</Text>
                <Text>{shop.time} · {shop.price}</Text>
                <Text style={styles.shopRating}>Rating: {shop.rating} ⭐</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResultsText}>No results found</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 18, marginLeft: 8 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 8, paddingHorizontal: 8, width: '70%' },
  searchInput: { flex: 1, fontSize: 16, padding: 8 },
  shopListContainer: { paddingHorizontal: 16 },
  shopCard: { flexDirection: 'row', marginBottom: 16, backgroundColor: '#f8f8f8', borderRadius: 10, overflow: 'hidden' },
  shopImage: { width: 100, height: 100 },
  shopInfo: { padding: 10, justifyContent: 'center' },
  shopName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  shopRating: { fontSize: 16, color: '#ff6347', marginTop: 4 },
  noResultsText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
});

export default HomeScreen;
