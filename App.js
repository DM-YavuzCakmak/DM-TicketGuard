import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/screens/LoginPage';
import ForgotPage from './src/screens/ForgotPage';
import OtpVerifyPage from './src/screens/OtpVerifyPage';
import ScanPage from './src/screens/ScanPage';
import SuccessScanPage from './src/screens/SuccessScanPage';
import ErrorScanPage from './src/screens/ErrorScanPage';

const Stack = createNativeStackNavigator();
export default function App() {

  // const checkStoredDataAndNavigate = async () => {
  //   try {
  //     const storedUserData = await AsyncStorage.getItem('userData');
  //     const storedSelectedItem = await AsyncStorage.getItem('selectedItem');

  //     if (storedUserData && storedSelectedItem) {
  //       // AsyncStorage'de bilgiler varsa, ScanPage'e yönlendir
  //       const userData = JSON.parse(storedUserData);
  //       const selectedItem = JSON.parse(storedSelectedItem);
  //       navigation.navigate('ScanPage', { userData, selectedItem });
  //     }
  //   } catch (error) {
  //     console.error('Error checking stored data:', error);
  //   }
  // };

  // useEffect(() => {
  //   checkStoredDataAndNavigate();
  // }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
      <Stack.Screen name="LoginPage"
                    component={LoginPage}
                    options={{ headerShown: false }}
        />
       <Stack.Screen name="ScanPage"
                    component={ScanPage}
                    options={{ headerShown: false }}
        />
        <Stack.Screen name="ForgotPage" 
                      component={ForgotPage} 
                      options={{ headerShown: false }} 
        />
        <Stack.Screen name="OtpVerifyPage" 
                      component={OtpVerifyPage} 
                      options={{ headerShown: false }} 
        />
        <Stack.Screen name="SuccessScanPage"
                    component={SuccessScanPage}
                    options={{ headerShown: false }}
        />

        <Stack.Screen name="ErrorScanPage"
                    component={ErrorScanPage}
                    options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
