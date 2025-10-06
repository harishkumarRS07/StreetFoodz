import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const PaymentMethodsScreen = () => {
  const [paymentMethods] = useState([
    { id: 1, method: 'Google Pay' },
    { id: 2, method: 'PhonePe' },
    { id: 3, method: 'Cash on Delivery' },
  ]);

  const handleRemoveMethod = (methodId) => {
    Alert.alert('Remove Payment Method', `Are you sure you want to remove this payment method?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', onPress: () => Alert.alert('Payment Method Removed', 'The payment method has been removed successfully!') },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
        {paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentItem}>
              <Text style={styles.paymentText}>{method.method}</Text>
              {method.method !== 'Cash on Delivery' && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveMethod(method.id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No payment methods added yet.</Text>
        )}
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
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
  paymentText: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});

export default PaymentMethodsScreen;
