import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const CadastroUsuario = ({ navigation }) => {
  console.log("Cadastro feito com sucesso!");
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  

  const Cadastrar = () => {

    if(!nome || !email || !senha) {
      console.log("Todos os campos são obrigatórios!");
      return;
    }

    var userObj = { nome: nome, email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);
    fetch('http:localhost:3000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      .then(response => response.json())
      .then((json) => {
        console.log(json);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/LogoAdog.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(text) => setNome(text)}
        value={nome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => setSenha(text)}
        value={senha}
        secureTextEntry
      />
      <TouchableOpacity onPress={Cadastrar}>
        <Text style={styles.button}>
          Cadastrar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default CadastroUsuario;
