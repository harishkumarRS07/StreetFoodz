import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../config/FirebaseConfig';

const Signup = () => {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');        
  const [password, setPassword] = useState(''); 

  
  const OnCreateAccount = () => {
    
    if (!email || !password || !username) {
      ToastAndroid.show('Please enter all details', ToastAndroid.LONG);
      return;
    }

    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;  // Get the user object from Firebase
        console.log(user);
        ToastAndroid.show('Account created successfully!', ToastAndroid.LONG);
        // Redirect to another screen after successful sign-up
        router.push('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // Show an error message if account creation fails
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      });
  };

  return (
    <View style={styles.container}>
      {/* Back Button to go to the previous screen */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Entypo name="chevron-left" size={24} color="black" />
      </TouchableOpacity> 

      <Text style={styles.title}>Create Your Account</Text>
      
      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}  // Hides the password
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={OnCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Redirect to the Sign In page */}
      <TouchableOpacity onPress={() => router.push('auth/Signin')}>
        <Text style={styles.switchText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,      
    left: 20,     
    zIndex: 10,   
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181411',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    height: 48,
    backgroundColor: '#ee7f2b',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  switchText: {
    fontSize: 14,
    color: '#897361',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Signup;
