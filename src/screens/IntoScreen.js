import React from 'react'

import {
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { Text, Icon, Image, Button } from 'react-native-elements';
import logoInto from '../assets/logoInto.png'




export default class IntoScreen extends React.Component {
    render() {
        return (
            
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Image source={logoInto} style={{alignSelf: "center",  height: 130, width: 202}} />
                    <Text h4 style={{color: "#1a98d0"}} >Bem vido ao Proneck</Text>
                    <Text h5 style={{ textAlign: 'center' }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    </Text>
                    <Image
                        source={require('../assets/onboard.jpg')}
                        style={{ width: 350, height: 180 }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>
                <View style={styles.contentView}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register2')}
                        title="Vamos começar"
                        loading={false}
                        loadingProps={{ size: 'small', color: 'white' }}
                        buttonStyle={{
                            backgroundColor: '#1a98d0',
                            borderRadius: 5,
                        }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                        containerStyle={{ marginVertical: 10, height: 50, width: 300 }}
                        underlayColor="transparent"
                    />
                    <Text h4 style={{ textAlign: 'center', color: 'grey' }}>
                        Ja está registrado ?
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login2')}>
                        <Text h4 style={{ textAlign: 'center', color: '#1a98d0' }}>
                            Fazer Login
                         </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F4F6FA',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      },
      heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
      },
      contentView: {
        justifyContent: 'center',
        alignItems: 'center',
      },
  });
  