import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, Alert, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import DropdownComponent from '../../components/DropdownComponent';
import axios from 'axios';

const LoginPage = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedEventItem, setSelectedEventItem] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSelectedItem = (item) => {
    setSelectedItem(item); 
  };

  const handleSelectedEvent = (event) => {
    setSelectedEventItem(event);
  };

  const handleLogin = async () => {
    try {
      if (!email) {
        setEmailError('This field cannot be left blank.');
        return;
      } else {
        setEmailError('');
      }
      if (!password) {
        setPasswordError('This field cannot be left blank.');
        return;
      } else {
        setPasswordError('');
      }

      const response = await axios.post('http://172.30.44.13:5316/Users/AuthenticateForMobile', {
        Email: email,
        Password: password,
      });

      if (response.status === 200) {
        setUserData(response.data);
        const selectedItemValue = selectedEventItem ? selectedEventItem.value : null;
        navigation.navigate('OtpVerifyPage', { userData: response.data , selectedItem: selectedItemValue });
      } else {
        Alert.alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('An error occurred during login');
    }
  };

  const handleEmailChange = (value) => {
    if (value) {
      setEmailError('');
    }
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);
    if (!isValidEmail) {
      setEmailError('Please enter a valid email address.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25, marginTop: -40 }}>
        <View style={{ alignItems: 'center' }}>
        <Image
            source={require('C:\Users\yavuz.cakmak\Desktop\OldDesktop\Folders\FirstApplication\FirstApplication\assets\misc\dem_logo.png')}
            style={{
              width: windowWidth * 0.8, 
              height: undefined, 
              aspectRatio: 4 / 1, 
              resizeMode: 'contain', 
            }}
          />
        </View>
        <Text style={styles.pageTitle}></Text>
        <InputField
          label={'Email Address'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#AD5326"
              style={styles.inputIcon}
            />
          }
          keyboardType="email-address"
          onChangeText={handleEmailChange}
          errorMessage={emailError}
          errorStyle={styles.errorStyle}
        />
        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#AD5326"
              style={styles.inputIcon}
            />
          }
          inputType="password"
          fieldButtonFunction={() => navigation.navigate('ForgotPage')}
          onChangeText={(value) => {
            setPassword(value);

            // Şifre alanına bir değer girildiğinde hata mesajını temizle
            if (value) {
              setPasswordError('');
            }
          }}
          errorMessage={passwordError}
          errorStyle={styles.errorStyle}
        />
        <DropdownComponent onSelect={handleSelectedItem}  onSelectEvent={handleSelectedEvent}/>
        <CustomButton label={'Login'} onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = {
  pageTitle: {
    fontSize: 28,
    fontWeight: '500',
    color: '#AD5326',
    marginBottom: 70,
    textAlign: 'center'
  },
  forgotPassword: {
    color: '#AD5326', 
    fontWeight: '700',
  },
  inputIcon: {
    marginRight: 5,
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  registerLink: {
    color: '#AD40AF',
    fontWeight: '700',
  },
  errorStyle: {
    color: 'red',
    fontSize: 12,
  },
};

export default LoginPage;