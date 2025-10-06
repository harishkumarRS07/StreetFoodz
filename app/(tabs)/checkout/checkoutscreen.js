import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const CheckoutScreen = () => {
  const router = useRouter();
  const { query } = router;
  const total = parseFloat(query?.total) || 0; // Access the total passed from the CartScreen

  const [discount] = useState(10); // Default discount percentage
  const [paymentMethods] = useState([
    { id: 1, name: 'Credit Card' },
    { id: 2, name: 'Google Pay' },
    { id: 3, name: 'Cash on Delivery' },
  ]);

  const [address, setAddress] = useState(''); // For delivery address input
  const [couponCode, setCouponCode] = useState(''); // For coupon input
  const [couponDiscount, setCouponDiscount] = useState(0); // Discount applied by coupon

  const discountAmount = (total * discount) / 100;
  const finalAmount = total - discountAmount - couponDiscount;

  const handlePaymentSelect = (method) => {
    Alert.alert('Payment Method', `You selected ${method}`);
  };

  const handleApplyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      const discountApplied = 50; // Example: ₹50 off
      setCouponDiscount(discountApplied);
      Alert.alert('Coupon Applied', `You have received ₹${discountApplied} off!`);
    } else {
      Alert.alert('Invalid Coupon', 'The coupon code you entered is not valid.');
    }
  };

  const handlePlaceOrder = () => {
    if (!address) {
      Alert.alert('Error', 'Please provide a delivery address');
      return;
    }
    router.push('/checkout/OrderTrackingScreen'); // Navigate to OrderTrackingScreen
    Alert.alert('Order Placed', 'Your order has been placed successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.text}>Order Summary</Text>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Total: ₹{total.toFixed(2)}</Text>
          <Text style={styles.summaryText}>Discount: ₹{discountAmount.toFixed(2)} ({discount}%)</Text>
          <Text style={styles.summaryText}>Coupon Discount: ₹{couponDiscount.toFixed(2)}</Text>
          <Text style={styles.summaryText}>Final Amount: ₹{finalAmount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Delivery Address Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your delivery address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Apply Coupon Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apply Coupon</Text>
        <View style={styles.couponContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter coupon code"
            value={couponCode}
            onChangeText={setCouponCode}
          />
          <TouchableOpacity style={styles.couponButton} onPress={handleApplyCoupon}>
            <Text style={styles.couponButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Payment Method Section */}
      <View style={styles.paymentSection}>
        <Text style={styles.sectionTitle}>Choose Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={styles.paymentButton}
            onPress={() => handlePaymentSelect(method.name)}
          >
            <Text style={styles.paymentText}>{method.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Place Order Button */}
      <View style={styles.orderButtonContainer}>
        <Button title="Place Order" onPress={handlePlaceOrder} color="#ff6347" />
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#666',
  },
  summaryContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  couponButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  paymentSection: {
    marginTop: 20,
  },
  paymentButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  paymentText: {
    color: '#fff',
    fontSize: 14,
  },
  orderButtonContainer: {
    marginTop: 20,
  },
});

export default CheckoutScreen;
