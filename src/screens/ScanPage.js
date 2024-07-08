import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image } from 'react-native';
import axios from 'axios';
import UserProfileHeader from '../../components/UserProfileHeader';

const ScanPage = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { userData,selectedItem } = route.params;
  const [scanResult, setScanResult] = useState(null);
  const [selectedItemAsString, setSelectedItemAsString] = useState(String(selectedItem));

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setScanned(false);
      setHasPermission(false);
      setSelectedItemAsString(String(selectedItem));
      (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted"); 
      })();
    });
    return unsubscribe;
  }, [navigation]);



  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      console.log("Buradaaaa",selectedItemAsString);
      const response = await axios.get(`http://172.30.44.13:5316/Ticket/VerifyTicketForMobile?ticketQrCode=${data}&eventId=${selectedItemAsString}`);
      if (response.data.entryAllowed) {
        navigation.navigate('SuccessScanPage', { userData });
      } else {
        const updatedUserData = { ...userData, screenMessage: response.data.screenMessage };
        navigation.navigate('ErrorScanPage', { userData: updatedUserData });
      }
      setScanResult(response.data);
    } catch (error) {
      console.error('Error during QR code verification:', error);
    }
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <UserProfileHeader 
          userName={`${userData.firstName} ${userData.lastName}`} 
          onLogout={() => navigation.navigate('LoginPage')} 
        />
      </View>
      <Text style={styles.title}>Scan QR Code!</Text>
      {renderCamera()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerContainer: {
    position: 'absolute',
    top: 95,
    left: 75,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 50,
    marginBottom: 5,
  },
  camera: {
    flex: 1,
  },
});

export default ScanPage;