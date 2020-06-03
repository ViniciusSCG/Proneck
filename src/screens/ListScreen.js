import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, BackHandler, FlatList} from 'react-native';
import * as firebase from "firebase";
import logoInto from '../assets/logoInto.png'
import exer1 from '../assets/1.png'
import exer2 from '../assets/2.png'
import exer3 from '../assets/3.png'
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { withNavigation } from 'react-navigation';

import api from '../services/api';

function SpotList({ exercise, navigation }){

    const [posts, setExercise] = useState([])

    useEffect(()=>{
        async function loadExercise()
    {
        const response = await api.get('/posts', {
            params: { exercise }
        })
        setExercise(response.data);
    }

        loadExercise();
        

    }, [])
        return (
            <View style={styles.container}>
                <Image source={logoInto} style={{ top: 40, width: 160, height: 150, resizeMode: 'contain', alignSelf: "center" }} />

                <View style={styles.header}>
                    <Text style={{ fontSize: 26, }}>Dia 1</Text>
                </View>

                <View style={styles.headerIcon}>
                    <AntDesign style={{paddingHorizontal: 2}} name="clockcircleo" size={20} color="black" />
                    <Text style={{paddingHorizontal: 5,fontSize: 16, color: 'black'}}>1 minuto</Text>
                </View>
                
                <View style={styles.headerIcon}>
                    <MaterialCommunityIcons  name="notebook-outline" size={20} color="black" />
                    <Text style={{paddingHorizontal: 5,fontSize: 16, color: 'black'}}>12 exercícios</Text>
                </View>


                <View style={{ borderBottomColor: 'black', borderBottomWidth: 0.2, marginTop: 15, }} />
               
                <FlatList
                style={styles.list}
                data={posts}
                keyExtractor={PostExercise => PostExercise._id}
                vertical
                showsVerticalScrollIndicator={false}
                renderItem={({ item })=>(
                <View style={styles.lista}>
                        <Text style={{ marginBottom: 10 }}>Lista de Exercicios</Text>
                        <TouchableOpacity style={styles.button} 
                        onPress={() => navigation.navigate("Exercise")}
                        >
                            <Image style={styles.image} source={{uri: item.url}}/>
                            <Text style={styles.TextStyle}>{item.name}</Text>
                            
                        </TouchableOpacity>

                        
                </View>
                )}          
                    />
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 0.2, marginTop: 45, }} />
         

            </View>
        )
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6FAF7',


    },
    header: {
        paddingHorizontal: 32,
        paddingVertical: 12,

    },
    headerIcon:{
        paddingVertical: 12, 
        paddingHorizontal: 32, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center'     
    },
    lista: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    button: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dfe1e6',
        height: 100,
        
    },
    image: {
        margin: 10,
        width: 90,
        height: 85,
        resizeMode: 'stretch'
    },
    TextStyle:{
        marginBottom:4,
        marginRight: 20,
        fontSize: 20
    },
    buttonAlt: {
        marginTop: 10,
        height: 42,
        borderWidth: 1,
        borderColor: '#dfe1e6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
})
export default withNavigation(SpotList);