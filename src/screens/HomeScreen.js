import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, BackHandler, Alert, ImageBackground } from 'react-native';
import * as firebase from "firebase";
import logoInto from '../assets/logoInto.png'
import imageDay from '../assets/imageDay.jpg'
import imageDay2 from '../assets/imageDay2.jpg'
import { Ionicons } from '@expo/vector-icons'; 
import * as Font from 'expo-font';
export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: ""
    };



    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    singOutUser = () => {
        firebase.auth().signOut();
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        Alert.alert(
            'Sair do Proneck',
            'Você realmente quer sair ?',
            [
                { text: 'Não', onPress: () => console.log() },
                { text: 'Sim', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false });
        return true;
    }

    


    render() {
        return (
            <View style={styles.container}>
                <Image source={logoInto} style={{ top: 40, width: 160, height: 150, resizeMode: 'contain', alignSelf: "center" }} />



                <View style={styles.headerText}>
                    <View style={styles.statsBox}>
                        <Text style={styles.text}>2</Text>
                        <Text style={styles.subText}>Dias restantes</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={styles.text}>2</Text>
                        <Text style={styles.subText}>Dias concluidos</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={styles.text}>1</Text>
                        <Text style={styles.subText}>Min</Text>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.lista}>
                        <Text style={{ marginBottom: 10 }}>SEMANA 1</Text>
                        <ImageBackground source={imageDay} imageStyle={{ borderRadius: 2, }} style={{ width: '100%', height: 90, flex: 1 }}>
                            <View style={styles.imgText}>
                                <View style={styles.statsBoxImg}>
                                    <Text style={[styles.textImg, {left:10 ,bottom: 30}]}>Segunda-feira</Text>
                                </View>
                                <View style={styles.statsBoxImg}>
                                    <Text style={[styles.textImg, {right: 75}]}>2 Min</Text>
                                </View>
                                <View style={[styles.statsBoxImg, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1, right: 75 }]}>
                                    <Text style={[styles.textImg, ]}>2 kCal</Text>
                                </View>
                                <View style={styles.statsBoxImg}>
                                    <Text style={[styles.textImg, {right: 75}]}>12 Exercicio</Text>
                                </View>
                                <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Lista')}>
                                   <Ionicons style={{ bottom: 20, right: 20}} name="ios-play-circle" size={37} color='#1a98d0' />
                                </TouchableOpacity>
                            </View>
                            
                           
                        </ImageBackground>

                        <ImageBackground source={imageDay2} imageStyle={{ borderRadius: 2, }} style={{ marginTop: 10, width: '100%', height: 90, flex: 1 }}>
                            <View style={styles.imgText}>
                                <View style={styles.statsBoxImg}>
                                    <Text style={[styles.textImg, {bottom: 30}]}>Terça-feira</Text>
                                </View>
                                <View style={styles.statsBoxImg}>
                                    <Text style={[styles.textImg, {right: 75}]}>2 Min</Text>
                                </View>
                                <View style={[styles.statsBoxImg, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1, right: 75 }]}>
                                    <Text style={[styles.textImg, ]}>2 kCal</Text>
                                </View>
                                <View style={styles.statsBoxImg}>
                                    <Text style={[styles.textImg, {right: 75}]}>12 Exercicio</Text>
                                </View>
                                <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Listt')}>
                                   <Ionicons style={{ bottom: 20, right: 20}} name="ios-play-circle" size={37} color='#1a98d0' />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>

                        <ImageBackground source={imageDay} imageStyle={{ borderRadius: 2, }} style={{ marginTop: 10, width: '100%', height: 90, flex: 1 }}>
                            <View style={styles.imgText}>
                                <View style={styles.statsBoxImg}>
                                    <Text style={[styles.textImg, {bottom: 30}]}>Quarta-feira</Text>
                                </View>
                                <View style={styles.statsBoxImg}>
                                    <Text style={[styles.textImg, {right: 75}]}>2 Min</Text>
                                </View>
                                <View style={[styles.statsBoxImg, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1, right: 75 }]}>
                                    <Text style={[styles.textImg, ]}>2 kCal</Text>
                                </View>
                                <View style={styles.statsBoxImg}>
                                    <Text style={[styles.textImg, {right: 75}]}>12 Exercicio</Text>
                                </View>
                                <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('List')}>
                                   <Ionicons style={{ bottom: 20, right: 20}} name="ios-play-circle" size={37} color='#1a98d0' />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 0.2, marginTop: 45, }} />
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6FAF7'
    },
    text: {
        fontSize: 17,
    },
    textImg: {
        fontSize: 12,
        color: 'white'
    },
    subText: {
        fontSize: 14,
        textTransform: "uppercase",
        fontWeight: "500"
    },
    imgText: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 52

    },
    headerText: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 32

    },
    statsBoxImg: {
        alignItems: 'center',
        flex: 1
    },
    statsBox: {
        alignItems: 'center',
        flex: 1
    },
    lista: {
        alignSelf: 'stretch',
        paddingHorizontal: 5,
        marginTop: 30,
    },

    button: {
        marginTop: 5,
        height: 42,
        backgroundColor: '#f7f8fa',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonAlt: {
        marginTop: 5,
        height: 42,
        borderWidth: 1,
        borderColor: '#dfe1e6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
})

/*<
Text style={{textAlign: 'center'}}>Olá {this.state.email} !</Text>

<TouchableOpacity style={{marginTop: 32}} onPress={this.singOutUser}>
<Text>Logout</Text>
</TouchableOpacity>
*/