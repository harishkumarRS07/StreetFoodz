import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const EditProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St, Karur, India',
  });

  const handleInputChange = (field, value) => {
    setUserInfo({
      ...userInfo,
      [field]: value,
    });
  };

  const handleSaveChanges = () => {
    Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={userInfo.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={userInfo.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={userInfo.phone}
        onChangeText={(value) => handleInputChange('phone', value)}
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={userInfo.address}
        onChangeText={(value) => handleInputChange('address', value)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditProfileScreen;
