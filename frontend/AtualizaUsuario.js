import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const AtualizaUsuario = ({ navigation, route }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { idUsuario } = route.params;

  useEffect(() => {
    async function fetchItem() {
      try {
        let response = await fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        let resJson = await response.json();
        if (resJson.length > 0) {
          setNome(resJson[0].nome);
          setEmail(resJson[0].email);
        }
      } catch (e) {
        console.log("Erro ao buscar usuário:", e);
      }
    }
    fetchItem();
  }, [idUsuario]);

  const Atualizar = async () => {
    var userObj = { nome: nome, email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    try {
      let response = await fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: jsonBody,
      });
      let json = await response.json();
      navigation.goBack();
    } catch (err) {
      console.log("Erro ao atualizar usuário:", err);
    }
  };

  const Deletar = async () => {
    try {
      let response = await fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      });
      let json = await response.json();
      navigation.goBack();
    } catch (err) {
      console.log("Erro ao deletar usuário:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/LogoAdog.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
      />
      <TouchableOpacity onPress={Atualizar}>
        <Text style={styles.button}>Atualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Deletar}>
        <Text style={[styles.button, styles.deleteButton]}>Deletar</Text>
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
  deleteButton: {
    backgroundColor: '#FF6347',
  },
});

export default AtualizaUsuario;






