import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const HelpSupportScreen = () => {
  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'You can contact support at support@foodapp.com');
  };

  const handleFaq = () => {
    Alert.alert('FAQs', 'Here you can find answers to frequently asked questions.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help & Support</Text>

        <TouchableOpacity style={styles.supportItem} onPress={handleContactSupport}>
          <Text style={styles.supportText}>Contact Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.supportItem} onPress={handleFaq}>
          <Text style={styles.supportText}>FAQ</Text>
        </TouchableOpacity>
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
  supportItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
  supportText: {
    fontSize: 16,
  },
});

export default HelpSupportScreen;
