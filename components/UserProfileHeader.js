import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserProfileHeader = ({ userName, onLogout }) => { 
  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end', // Sağa hizalama
    paddingHorizontal: 20,
    marginTop: -20,
    marginLeft: -30, 
    marginBottom: 80,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15, 
  },
  userName: {
    fontSize: 15,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#AD5326',
    paddingVertical: 8,
    paddingHorizontal: 45,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserProfileHeader;
