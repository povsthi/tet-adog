import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Button,
} from 'react-native';
import Header from './components/Header';

export function PetList({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchList() {
      fetch('http://localhost:3000/pets', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          setData(resJson);
        })
        .catch((e) => console.log(e));
    }
    fetchList();
  }, []);

  const Excluir = (idPet) => {
    return Alert.alert('Confirmar', 'Deseja Excluir?', [
      {
        text: 'Sim',
        onPress: () => {
          var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
          };

          fetch('http://localhost:3000/pets/' + idPet, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
        },
      },
      {
        text: 'Não',
      },
    ]);
  };

  const Editar = ({ route, navigation }) => {
    const id = route.params.idPet;
    const [nomePet, setNomePet] = React.useState(route.params.nomePet);

    return (
      <View>
        Nome:
        <TextInput
          style={styles.input}
          onChangeText={setNomePet}
          value={nomePet}
        />
        <Button
          title="Confirmar"
          onPress={() =>
            console.log(
              'Implementar a requisição PUT para atualizar os dados.'
            )
          }
        />
      </View>
    );
  };

  const renderItemComponent = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemTitle}>Nome: {item.nomePet}</Text>
        <Text>Raça: {item.raca}</Text>
        <Text>Sexo: {item.sexo}</Text>
        <Text>Comportamento: {item.comportamento}</Text>
      </View>
      <TouchableOpacity
        style={styles.listItemButton}
        onPress={() => {
          Editar(item.idPet, item.nomePet, item.tipoPet, item.raca, item.sexo, item.porte, item.dataNascimento);
        }}>
        <Text style={{ color: 'green' }}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listItemButton}
        onPress={() => {
          Excluir(item.idPet);
        }}>
        <Text style={{ color: 'red' }}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  const ItemSeparator = () => <View style={styles.listItemSeparator} />;

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={data}
        renderItem={renderItemComponent}
        keyExtractor={(item) => item.idPet.toString()}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop: 60,
  },
  listItemView: { alignItems: 'center', flex: 1 },
  listItemTitle: { fontWeight: 'bold' },
  listItemButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemSeparator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginLeft: 5,
    marginRight: 5,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    width: '80%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
});
