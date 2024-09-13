import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Header from './components/Header';

const PetList = () => {
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    try {
      const response = await fetch('http://localhost:3000/pets'); 
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error('Erro ao buscar pet:', error);
      Alert.alert('Erro', 'Não foi possível buscar a lista de pets.');
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>Nome: {item.nomePet}</Text>
      <Text>Tipo: {item.tipoPet}</Text>
      <Text>Raça: {item.raca}</Text>
      <Text>Sexo: {item.sexo}</Text>
      <Text>Porte: {item.porte}</Text>
      <Text>Data de Nascimento: {item.dataNascimento}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={pets}
        keyExtractor={(item) => item.idPet.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PetList;

