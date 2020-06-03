import React, { useState, useEffect } from 'react';
import { Alert, View, SafeAreaView, ScrollView, Text, Image, StyleSheet, AsyncStorage } from 'react-native';
import logoInto from '../assets/logoInto.png'
import axios from 'axios'
import ListScreen from '../screens/ListScreen';

export default function Exercise() {
    
    axios.get('http://192.168.56.1:3000/posts')
        .then(function (response) {
            // handle success
            console.log(response.data);
        })
        .catch(function (error) {
            console.log('deu ruim',error);
        })

        componentDidMount() 
            BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack('Home'));
        
        componentWillUnmount() 
            BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack('Home'));
        
        
      

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logoInto} />
            
            <ListScreen />
           
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 30
    }
});