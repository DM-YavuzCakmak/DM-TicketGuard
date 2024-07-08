import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import UserProfileHeader from '../../components/UserProfileHeader';

const ErrorScanPage = ({ navigation, route }) => {
  const handleScanAgain = () => {
    navigation.navigate('ScanPage', { userData: route.params?.userData }); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <UserProfileHeader 
          userName={`${route.params?.userData?.firstName} ${route.params?.userData?.lastName}`} 
          onLogout={() => navigation.navigate('LoginPage')} 
        />
      </View>
      <View style={styles.content}>
        <View style={styles.checkMarkContainer}>
          <AntDesign name="closecircle" size={210} color="red" />
        </View>
        <Text style={styles.errorText}>{route.params?.userData?.screenMessage || 'Scan Error!'}</Text>
        <CustomButton label="           Tekrar Okut           " onPress={handleScanAgain} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 95,
    left: 75,
    right: 10,
    zIndex: 1,
  },
  content: {
    alignItems: 'center',
  },
  checkMarkContainer: {
    marginBottom: 10,
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ErrorScanPage;
