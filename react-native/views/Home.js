import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Pressable, Modal, TouchableWithoutFeedback, } from 'react-native';
import { db } from '../config/config_bbdd';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native-web';

const Item = ({ actor, navigation }) => (
  <TouchableWithoutFeedback onPress={() =>
    navigation.navigate('Detail', { nombre: actor.nombre })
  }>
    <View style={styles.item}>
      <Text style={styles.title}>{actor.nombre}</Text>
      <Image
        style={styles.image}
        source={{ uri: actor.imagen }}
      />
    </View>
  </TouchableWithoutFeedback>
);


const Home = ({ navigation }) => {

  const [actores, setActores] = useState([]);
  const [pelicula, setPelicula] = useState([]);
  const [peliculaIsLoaded, setPeliculaIsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSetPelicula = (obj) => {
    setPelicula(obj[0])
    setPeliculaIsLoaded(true)
  }

  useEffect(() => {
    const collectionRef = collection(db, 'peliculas');
    const q = query(collectionRef, where('id', "==", "DOlybUabp06JoqDpj7jp"));
    const unsuscribe = onSnapshot(q, querySnapshot => {
      handleSetPelicula(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          anyo: doc.data().anyo,
          argumento: doc.data().argumento,
          duracionHoras: doc.data().duracionHoras,
          duracionMinutos: doc.data().duracionMinutos,
          image: doc.data().image,
          titulo: doc.data().titulo,
        }))
      )
    });
    return unsuscribe;

  }, [])


  useEffect(() => {
    const collectionRef = collection(db, 'actores');
    const q = query(collectionRef, where('idPelicula', "==", "DOlybUabp06JoqDpj7jp"));
    const unsuscribe = onSnapshot(q, querySnapshot => {
      setActores(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          nombre: doc.data().nombre,
          clip: doc.data().clip,
          edad: doc.data().edad,
          imagen: doc.data().imagen,
          nacionalidad: doc.data().nacionalidad,
          vivo: doc.data().vivo,
        }))
      )
    });
    return unsuscribe;

  }, [])




  return (
    
    !peliculaIsLoaded ? <Text>Loading app....</Text> :
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}> {pelicula.titulo} - {pelicula.anyo}</Text>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.imageFilm}
            source={{ uri: pelicula.image }}
          />
        </View>
        <View style={styles.centeredView}>
          <Pressable
            style={[styles.button, styles.buttonClose,]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.buttonText}>Ver Detalles</Text>
          </Pressable>
        </View>
        <View style={styles.centeredView}>

          <Text style={styles.title}> ACTORES </Text>
        </View>

        <View style={styles.centeredView}>
          <FlatList
            style={{
              overflow: "hidden", backgroundColor: "#1F1F1F", width: "100%"
            }}
            contentContainerStyle={styles.contentContainer}
            numColumns={2}
            data={actores}
            renderItem={({ item }) => <Item actor={item} navigation={navigation} />}
            keyExtractor={item => item.id}
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <Text style={styles.modalText}>Título: {pelicula.titulo} </Text>
              <Text style={styles.modalText}>Duración: {pelicula.duracionHoras}horas {pelicula.duracionHoras} minutos </Text>
              <Text style={styles.modalText}>Argumento: {pelicula.argumento} </Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
      
  );
};



const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "center",
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist: {
    backgroundColor: "#1F1F1F",
    width: "100%"
  },
  imageWrapper: {
    width: "100%",
    height: "20%",
    padding: 10
  },
  imageFilm: {
    width: "100%",
    height: "100%",
  },
  flatlist: {
    flexDirection: 'column',
  },
  item: {
    padding: 5,
    margin: 5,
    marginBottom: 35,
    width: 180,
    height: 250
  },

  title: {
    fontSize: 17,
    color: "#E1E1E1",
    marginTop: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    marginTop: 10,
  },
  button: {
    width: 100,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',

  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
  }
});

export default Home;