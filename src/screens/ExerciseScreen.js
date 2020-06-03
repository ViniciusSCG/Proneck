import React from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, ScrollView, BackHandler, Modal} from 'react-native';
import * as firebase from "firebase";
import logoInto from '../assets/logoInto.png'
import exer1 from '../assets/1.png'
import axios from 'axios'
import CountdownCircle from 'react-native-countdown-circle'
import api from '../services/api';

export default class ExerciseScreen extends React.Component {
    
  componentDidMount() {
      this.getapiData()
      BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }
  async getapiData(){
    let resp=await axios.get('http://192.168.56.1:3000/posts')
    console.log(resp.data)
    this.setState({data:resp.data})
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

	constructor(props){
    super(props);
    this.state = {
      isVisible: false,
      data: []
    };
  }
    
    render() {
        return (
            <View style={styles.container}>
              <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.isVisible}
                onRequestClose={() =>{
                  this.setState({isVisible: false});
                }}
              >
                <View style={styles.headerContainer}>
                  <Image source={exer1}  style={{ alignSelf: "center", height: 170, width: 220 }}/>
        
                </View> 
                <View style={styles.modal}>  
                  <CountdownCircle
                    seconds={120}
                    radius={30}
                    borderWidth={8}
                    color='#1a98d0'
                    bgColor="#fff"
                    textStyle={{ fontSize: 20 }}
                    onTimeElapsed={() => this.setState({isVisible: false})}
                  />     
                  
                </View>
                <TouchableOpacity 
                    style={[styles.button,{ bottom: 190}]}
                    onPress={() =>{
                      this.setState({isVisible: false});
                    }}
                  >
                    <Text style={{ color: "#FFF", fontWeight: "500"}}>Finalizar</Text>
                  </TouchableOpacity>

              </Modal>
                
                <View style={styles.headerContainer}>
                  <Image source={logoInto} style={{ alignSelf: "center", height: 130, width: 202 }} />
                  {this.state.data.map((item)=>
                        <Image source={{uri: item.url}}  style={{ alignSelf: "center", height: 170, width: 220 }}/>)
                        
                      } 
                    {/* <Image source={exer1}  style={{ alignSelf: "center", height: 170, width: 220 }}/> */}
                </View>

                
                <View>
                      {this.state.data.map((item)=>
                        <Text style={{alignSelf: "center", fontSize: 18}}>
                          {item.name}
                        </Text>)
                        
                      } 
                </View>
                <View>
                    
                    <Text style={{paddingHorizontal: 15, fontSize: 18}}>Sente-se corretamente na cadeira com os pés apoiados no chão, gire sua cabeça para lateral, levando o queixo em direção ao ombro. Realizar o movimento para os dois lados.</Text>
                </View>
                <TouchableOpacity style={styles.button} 
                onPress={() =>{
                  this.setState({isVisible: true});
                }}>
                
                  <Text style={{ color: "#FFF", fontWeight: "500"}}>Iniciar</Text>
                </TouchableOpacity> 
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#E6FAF7',
      height: '100%',
    },
    headerContainer: {
      top: 30,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    button:{
      marginTop: 30,
      marginHorizontal: 30,
      backgroundColor: "#1a98d0",
      borderRadius: 4,
      height: 52,
      alignItems: "center",
      justifyContent: "center"
    },
    modal:{
      flex: 1,
      alignItems: 'center',
      padding: 50,
    }

    
  })