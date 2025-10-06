import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../../supabase/supabase'; // Ensure correct path to your Supabase client

const CartScreen = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from Supabase on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      const { data, error } = await supabase
        .from('cart_items') // Adjust to your cart items table name
        .select('*');

      if (error) {
        console.error('Error fetching cart items:', error);
      } else {
        setCartItems(data);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
  };

  const handleRemoveItem = async (id) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .match({ id }); // Ensure the `id` is your primary key

    if (error) {
      console.error('Error removing item:', error);
    } else {
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  const handleIncreaseQuantity = async (id) => {
    const updatedItems = cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price } 
        : item
    );

    setCartItems(updatedItems);

    // Update the item in Supabase
    const { error } = await supabase
      .from('cart_items')
      .update({
        quantity: updatedItems.find(item => item.id === id).quantity,
        totalPrice: updatedItems.find(item => item.id === id).totalPrice,
      })
      .match({ id });

    if (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleDecreaseQuantity = async (id) => {
    const updatedItems = cartItems.map(item => 
      item.id === id && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1, totalPrice: (item.quantity - 1) * item.price } 
        : item
    );

    // Check if the item will be removed
    const itemToRemove = cartItems.find(item => item.id === id);
    if (itemToRemove && itemToRemove.quantity === 1) {
      await handleRemoveItem(id); // Call remove item if quantity is 1
    } else {
      setCartItems(updatedItems);

      // Update the item in Supabase
      const { error } = await supabase
        .from('cart_items')
        .update({
          quantity: updatedItems.find(item => item.id === id).quantity,
          totalPrice: updatedItems.find(item => item.id === id).totalPrice,
        })
        .match({ id });

      if (error) {
        console.error('Error updating item quantity:', error);
      }
    }
  };

  const handleCheckout = () => {
    const totalAmount = calculateTotal();
    router.push(`/checkout/checkoutscreen?total=${totalAmount}`); 
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cartListContainer}>
        <Text style={styles.sectionTitle}>Your Cart</Text>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.cartItemInfo}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecreaseQuantity(item.id)}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncreaseQuantity(item.id)}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text>Price: ₹{item.price} each</Text>
                <Text>Total: ₹{item.totalPrice}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        )}
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ₹{calculateTotal()}</Text>
        <Button title="Proceed to Checkout" onPress={handleCheckout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  cartListContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantityButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: '#fff',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
  },
  totalContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CartScreen;
