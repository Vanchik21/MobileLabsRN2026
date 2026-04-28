import 'react-native-gesture-handler'; 
import 'react-native-reanimated';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './src/screens/MainScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ContactsScreen from './src/screens/ContactsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: 'https://picsum.photos/100' }} style={styles.avatar} />
        <Text style={styles.name}>Іван Іванов</Text>
        <Text style={styles.group}>Група ІПЗ-26</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function NewsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Новини" component={NewsStack} />
        <Drawer.Screen name="Контакти" component={ContactsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  profileContainer: { padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  group: { fontSize: 14, color: 'gray' }
});