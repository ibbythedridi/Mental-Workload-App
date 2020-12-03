import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import { StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar, 
  Button,
  TouchableHighlight
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppearanceProvider>
      <NavigationContainer theme = {DarkTheme}>
        <Stack.Navigator mode = 'modal'>
          <Stack.Screen name = 'Dashboard' component = {homepage} options = {{ headerShown: false }} />
          <Stack.Screen name = 'ISA' component = {isapage} />
          <Stack.Screen name = 'Sleep' component = {sleeppage} />
          <Stack.Screen name = 'Screen Time' component = {screentimepage} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
      
  );
}

function homepage({ navigation }) {
  const { colors } = useTheme();
  return (
    
    <ScrollView>
      <SafeAreaView style = {styles.container}>
        <Text style = {[{ color: colors.text }, {paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}]}>Dashboard</Text>

        <TouchableHighlight 
          style = { styles.box }
          onPress = { () => navigation.navigate("ISA") }>
          <Text style = {[{ color: colors.text }, styles.dashText]}>ISA</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style = { styles.box }
          onPress = { () => navigation.navigate("Sleep") }>
          <Text style = {[{ color: colors.text }, styles.dashText]}>Sleep</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style = { styles.box }
          onPress = { () => navigation.navigate("Screen Time") }>
          <Text style = {[{ color: colors.text }, styles.dashText]}>Screen Time</Text>
        </TouchableHighlight>
      </SafeAreaView>
    </ScrollView>
    
  );
}

function isapage({ navigation }) {
  return (
    <SafeAreaView style = {styles.container}>
        <Text>ISA</Text>
    </SafeAreaView>
  );
}

function sleeppage({ navigation }) {
  return (
    <SafeAreaView style = {styles.container}>
        <Text>Sleep</Text>
    </SafeAreaView>
  );
}

function screentimepage({ navigation }) {
  return (
    <SafeAreaView style = {styles.container}>
        <Text>Screen Time</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#111'
    //justifyContent: 'center',
  },
  box: {
    backgroundColor: '#555',
    height: 100,
    width: '95%',
    borderRadius: 10,
    marginTop: '10%'
  },
  dashText: {
    textAlign: 'center',
  }
});
