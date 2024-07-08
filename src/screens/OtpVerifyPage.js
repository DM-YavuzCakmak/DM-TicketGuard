import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text, Image, Alert, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import UserProfileHeader from '../../components/UserProfileHeader';
import { useNavigation } from '@react-navigation/native';

const OtpVerifyPage = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const { userData, selectedItem } = route.params;
  const navigationToScanPage = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const handleButtonPress = async () => {
    try {
      const response = await axios.get(`http://172.30.44.13:5316/SmsOtp/SmsOtpGet?code=${otp}`);
      
      if (response.data === "Success") {
        console.log(selectedItem);
        navigationToScanPage.navigate('ScanPage', { userData, selectedItem }); 
      } else {
        Alert.alert('Invalid OTP Code');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      Alert.alert('An error occurred during OTP verification');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>OTP Verify</Text>
        <View style={styles.topRow}>
          <InputField
            label={'Enter OTP'}
            keyboardType="numeric"
            onChangeText={setOtp}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
              <MaterialIcons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>
            <CustomButton
              label={"      Verify       "}
              onPress={handleButtonPress}
              style={[
                styles.customButton,
                { width: windowWidth * 0.8 },
              ]}
              labelStyle={styles.customButtonText}
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: -5,
    textAlign: 'left',
  },
  topRow: {
    width: '100%',
    marginTop: 20,
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
    width: 10000,
  },
  customButtonText: {
    fontSize: 18,
  },
});

export default OtpVerifyPage;
