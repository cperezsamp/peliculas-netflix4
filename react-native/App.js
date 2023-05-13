import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as  React from 'react';
import { db } from './config/config_bbdd';
import { collection, onSnapshot, query } from 'firebase/firestore';
import Navigation from './Navigation';



export default function App() {

  /*const [peliculas, setPeliculas]= React.useState([]);

  React.useEffect( () => {
    const collectionRef = collection(db, 'peliculas');
    const q = query(collectionRef);
    const unsuscribe= onSnapshot(q, querySnapshot => {
      setPeliculas(
        querySnapshot.docs.map(doc =>({
          id: doc.id,
          titulo: doc.data().titulo,
        }))
      )
    });
    console.log(peliculas);
    return unsuscribe;
  }, [])*/

  

  return (
    /*<View style={styles.container}>
      <Text>Listado de peliculas</Text>
      {peliculas.map(pelicula => <Text>{ pelicula.titulo }, { pelicula.id }</Text>)}
      <StatusBar style="auto" />
    </View>*/
    <Navigation />
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});*/


