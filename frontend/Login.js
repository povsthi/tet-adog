import React, { useState } from 'react';
import { Image, View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

export function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const verificarLogin = async () => {
    const userObj = { email, senha };
    const jsonBody = JSON.stringify(userObj);

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: jsonBody,
      });

      const json = await response.json();

      if (json.mensagem === 'Usuário válido') {
        if (json.idUsuario) {
          navigation.navigate('AtualizaUsuario', {
            idUsuario: json.idUsuario,
          });
        } else {
          Alert.alert("Erro", "ID do usuário não encontrado na resposta.");
        }
      } else {
        Alert.alert("Erro", "Usuário inválido");
      }
    } catch (err) {
      Alert.alert("Erro", "Não foi possível verificar o login. Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/LogoAdog.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity onPress={verificarLogin}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
        <Text style={styles.button}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    color: "black",
    borderRadius: 30,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textAlign: 'center',
    width: '80%',
  },
  button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#F3BD0F',
    borderRadius: 20,
    textAlign: 'center',
    color: 'white',
  },
});

export default Login;





