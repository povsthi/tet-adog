import React, { useState } from 'react';
import { Image, View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

export function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const verificarLogin = async () => {
    console.log("Verificando Login");
    const userObj = { email, senha };
    const jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);

    try {
      const response = await fetch('https://tet2-thiago.glitch.me/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: jsonBody,
      });

      const json = await response.json();
      console.log(json);

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
      console.error("Erro ao verificar login: ", err);
      Alert.alert("Erro", "Não foi possível verificar o login. Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/LogoAdog.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="E-mail"
        placeholderTextColor="#666"
      />
      <TextInput
        style={styles.input}
        onChangeText={setSenha}
        value={senha}
        placeholder="Senha"
        placeholderTextColor="#666"
        secureTextEntry
      />
      <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
        <Text style={styles.button}>Registrar agora!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={verificarLogin}>
        <Text style={styles.button}>Entrar</Text>
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




