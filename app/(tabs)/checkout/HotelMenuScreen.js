import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import { supabase } from '../../../supabase/supabase';

const HotelMenuScreen = () => {
  const [hotelInfo, setHotelInfo] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHotelAndMenu = async () => {
      try {
        const { data: hotelData, error: hotelError } = await supabase
          .from('street_food_shops')
          .select('*')
          .eq('name', 'Biryani House')
          .single();

        if (hotelError) throw hotelError;
        setHotelInfo(hotelData);

        const { data: menuData, error: menuError } = await supabase
          .from('menu')
          .select('*')
          .eq('shop_id', hotelData.id);

        if (menuError) throw menuError;
        setMenuItems(menuData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHotelAndMenu();
  }, []);

  const addToCart = async (item) => {
    const existingItem = cart.find(cartItem => cartItem.menu_item_id === item.id);
    if (existingItem) {
      incrementQuantity(item); // Increment quantity if already in cart
    } else {
      // Add new item to cart and insert into Supabase
      const { data, error } = await supabase
        .from('cart_items')
        .insert([{ menu_item_id: item.id, quantity: 1, total_price: item.price }]);

      if (error) {
        console.error('Error adding to cart:', error);
      } else {
        // Update the cart state with the newly added item
        setCart(prevCart => [...prevCart, { ...item, quantity: 1 }]);
      }
    }
  };

  const incrementQuantity = async (item) => {
    const updatedCart = cart.map(cartItem =>
      cartItem.menu_item_id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );

    setCart(updatedCart);

    await supabase
      .from('cart_items')
      .update({ quantity: updatedCart.find(cartItem => cartItem.menu_item_id === item.id).quantity })
      .match({ menu_item_id: item.id });
  };

  const decrementQuantity = async (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.menu_item_id === item.id);
      if (existingItem.quantity > 1) {
        const updatedCart = prevCart.map(cartItem =>
          cartItem.menu_item_id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );

        supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity - 1 })
          .match({ menu_item_id: item.id });

        return updatedCart;
      } else {
        supabase
          .from('cart_items')
          .delete()
          .match({ menu_item_id: item.id });
          
        return prevCart.filter(cartItem => cartItem.menu_item_id !== item.id);
      }
    });
  };

  // Navigate to cart screen with cart data
  const goToCart = () => {
    router.push({
      pathname: '/(tabs)/cart',
      params: { cart },
    });
  };

  return (
    <ScrollView style={styles.container}>
      {hotelInfo && (
        <View style={styles.hotelInfoContainer}>
          <Image source={{ uri: hotelInfo.image_url }} style={styles.hotelImage} />
          <Text style={styles.hotelName}>{hotelInfo.name}</Text>
          <Text style={styles.hotelRating}>Rating: {hotelInfo.rating} ⭐</Text>
          <Text style={styles.hotelDescription}>{hotelInfo.description}</Text>
        </View>
      )}

      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Menu</Text>
        {menuItems.map(item => (
          <View key={item.id} style={styles.menuItemContainer}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>₹{item.price}</Text>
            <View style={styles.menuItemActions}>
              {cart.find(cartItem => cartItem.menu_item_id === item.id) ? (
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decrementQuantity(item)}>
                    <Text style={styles.quantityButton}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>
                    {cart.find(cartItem => cartItem.menu_item_id === item.id)?.quantity || 0}
                  </Text>
                  <TouchableOpacity onPress={() => incrementQuantity(item)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>

      {cart.length > 0 && (
        <View style={styles.floatingCartContainer}>
          <TouchableOpacity style={styles.floatingCartButton} onPress={goToCart}>
            <Entypo name="shopping-cart" size={30} color="white" />
            <Text style={styles.cartItemCount}>{cart.length}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hotelInfoContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    marginBottom: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  hotelImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hotelRating: {
    fontSize: 16,
    color: 'green',
    marginVertical: 5,
  },
  hotelDescription: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
  menuContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItemPrice: {
    fontSize: 16,
    color: '#ff6347',
  },
  menuItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 24,
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#ff6347',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  floatingCartContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  floatingCartButton: {
    backgroundColor: '#ff6347',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemCount: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ffcc00',
    borderRadius: 10,
    padding: 4,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HotelMenuScreen;
