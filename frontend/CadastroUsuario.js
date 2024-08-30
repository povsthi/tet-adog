import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CustomTextInput from './components/CustomTextInput';

const CadastroUsuario = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [data, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const Cadastrar = () => {
    if (!nome || !email || !senha || !confirmarSenha || !cpf || !estado || !cidade || !rua || !numero) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro!", "Senhas diferentes");
      return;
    }

    var userObj = { nome: nome, email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);
    fetch('http://localhost:3000/usuarios', {
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
      <ScrollView>
        <CustomTextInput label="Nome" placeholder="Digite seu nome" value={nome} onChangeText={setNome} />
        <CustomTextInput label="E-mail" placeholder="Digite seu e-mail" value={email} onChangeText={setEmail} />
        <CustomTextInput label="Data de Nascimento" placeholder="Digite sua data de nascimento" value={data} onChangeText={setDataNascimento} />
        <CustomTextInput label="CPF" placeholder="Digite seu CPF" value={cpf} onChangeText={setCpf} />
        <CustomTextInput label="Estado" placeholder="Digite seu estado" value={estado} onChangeText={setEstado} />
        <CustomTextInput label="Cidade" placeholder="Digite sua cidade" value={cidade} onChangeText={setCidade} />
        <CustomTextInput label="Rua" placeholder="Digite sua rua" value={rua} onChangeText={setRua} />
        <CustomTextInput label="Número" placeholder="Digite o número" value={numero} onChangeText={setNumero} keyboardType="numeric" />
        <CustomTextInput label="Senha" placeholder="Digite sua senha" value={senha} onChangeText={setSenha} secureTextEntry />
        <CustomTextInput label="Confirmar Senha" placeholder="Confirme sua senha" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry />
        <TouchableOpacity onPress={Cadastrar}>
          <Text style={styles.button}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>  
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

