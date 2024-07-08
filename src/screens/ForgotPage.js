import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';

const ForgotPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonPress = async () => {
    try {
      setIsLoading(true);

      // Servise istek yap
      const response = await fetch(`http://172.30.44.13:5316/Users/ResetPasswordForMobile?email=${email}`);

      if (response.status === 200) {
        // Başarılı ise popup göster
        Alert.alert('Success', `Reset link will be sent to: ${email}`);
      } else {
        // Hata durumunda popup göster
        Alert.alert('Error', 'Failed to reset password. Please check your email address.');
      }
    } catch (error) {
      // Hata durumunda popup göster
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.sunImageContainer}></TouchableOpacity>
        <Text style={styles.headerText}>Forgot Password</Text>
        <View style={styles.topRow}>
          <InputField
            label={'Email Address'}
            icon={
              <MaterialIcons name="alternate-email" size={20} color="#666" style={styles.inputIcon} />
            }
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
              <MaterialIcons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>
            <CustomButton
              label={"Send password reset link"}
              onPress={handleButtonPress}
              style={styles.customButton}
              labelStyle={styles.customButtonText}
              disabled={isLoading}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
  },
  content: {
    width: '80%',
    alignItems: 'flex-start',
  },
  sunImageContainer: {
    position: 'absolute',
    top: -20,
    right: 10,
  },
  sunImage: {
    width: 50, 
    height: 50,   
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  topRow: {
    width: '100%',
    marginTop: 20,
  },
  inputIcon: {
    marginRight: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  goBackButton: {
    backgroundColor: '#AD5326',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginRight: 10,
  },
  customButton: {
    width: 600,
  },
  customButtonText: {
    fontSize: 18,
  },
});

export default ForgotPage;
