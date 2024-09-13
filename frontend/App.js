import React from 'react';
import { Image, Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import CadastroUsuario from './CadastroUsuario';
import AtualizaUsuario from './AtualizaUsuario';
import PetList from './List';


const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('./assets/LogoAdog.png')} style={styles.logo} />
        <PetList />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CadastroUsuario')}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PetList')}
        >
          <Text style={styles.buttonText}>Lista de pets</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AtualizaUsuario" component={AtualizaUsuario} />
        <Stack.Screen name="Petlist" component={PetList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#212A75',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200
  },
  button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#F3BD0F',
    borderRadius: 20,
  },
  buttonText: {
    color: '#4A0077',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  
});
