import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { Text, Icon, Input, Button, SocialIcon } from 'react-native-elements';
import logoInto from '../assets/logoInto.png'

import { Formik } from 'formik';
import * as yup from 'yup';
import * as firebase from 'firebase'
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';



const LoginSchema = yup.object().shape({
  email: yup.string()
    .email('Email invalido')
    .required('Email é obrigatório'),
  password: yup.string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter entre 6 caracteres'),
});

//const IOS_CLIENT_ID =
//"your-ios-client-id";
const ANDROID_CLIENT_ID = '298742641713-s6frmtud7cj1odghthlrkh9mo1e811ad.apps.googleusercontent.com';

export default class LoginScreen2 extends React.Component {

  Login = (values, navigation) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(response => {
        let { user } = response;
        this.setState({ user });
        setTimeout(() => {
          navigation.navigate('Home');
        }, 0);
      })
      .catch(err => {
        Alert.alert('Erro', 'Email ou senha invalido');
      });
  };

  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        //iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(res => {
            this.props.navigation.navigate('Home')
          })
          .catch(error => {
            console.log("firebase cred err:", error);
          });
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

    loginWithFacebook = async() => {
    await Facebook.initializeAsync(
      '235487284376992',
    );

    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      { permissions: ['public_profile',] }
    );

    if (type === 'success') {
     
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
      .auth().signInWithCredential(credential).catch(error => {
       console.log(error);
      });
      this.props.navigation.navigate('Home')
      
    }
  }


  render() {
    return (
      <KeyboardAvoidingView

        style={styles.keyboardAvoidingView}
        enabled={Platform.OS === 'ios'}
        behavior={'padding'}
      >
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled">
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              this.Login(values, this.props.navigation);
              setSubmitting(false);
            }}
            validationSchema={LoginSchema}>
            {formikProps => (
              <React.Fragment>
                <View style={styles.headerContainer}>
                  <Image source={logoInto} style={{ alignSelf: "center", height: 130, width: 202 }} />
                </View>
                <View style={styles.wrapper}>
                  <Input
                    leftIcon={
                      <Icon
                        name="md-mail"
                        type="ionicon"
                        color='#1a98d0'
                        size={25}
                      />
                    }
                    onChangeText={formikProps.handleChange('email')}
                    placeholder="Email"
                    inputContainerStyle={styles.input}
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                  />
                  {formikProps.errors.email ? (
                    <Text style={{ color: 'red' }}>
                      {formikProps.errors.email}
                    </Text>
                  ) : null}
                  <Input
                    leftIcon={
                      <Icon
                        name="lock"
                        color='#1a98d0'
                        size={25}
                      />
                    }
                    onChangeText={formikProps.handleChange('password')}
                    inputContainerStyle={styles.input}
                    placeholderTextColor="grey"
                    placeholder="Senha"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                  />
                  {formikProps.errors.password ? (
                    <Text style={{ color: 'red' }}>
                      {formikProps.errors.password}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.socialIcons}>
                  <Text style={styles.signinwith}>Entrar com</Text>
                  <View style={styles.socialLogin}>
                    <TouchableOpacity onPress={() => this.loginWithFacebook()} >
                      <SocialIcon type="facebook" light />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.signInWithGoogle}>
                      <SocialIcon type="google" light />
                    </TouchableOpacity>

                    <SocialIcon type="twitter" light />
                  </View>
                  <Button
                    title="Login"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={{
                      backgroundColor: '#1a98d0',
                      borderRadius: 15,
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                    containerStyle={{
                      marginVertical: 10,
                      height: 50,
                      width: 300,
                    }}
                    onPress={formikProps.handleSubmit}
                    disabled={!(formikProps.isValid && formikProps.dirty)}
                    underlayColor="transparent"
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ForgotPasswordScreen')
                    }>
                    <Text h5 style={{ textAlign: 'center', color: '#1a98d0' }}>
                      Esqueceu sua senha ?
                 </Text>
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )}
          </Formik>

        </ScrollView>
      </KeyboardAvoidingView>

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
  icons: {
  },
  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderLeftWidth: 0,
    height: 50,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  socialIcons: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialLogin: {
    flexDirection: 'row',
    marginTop: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})