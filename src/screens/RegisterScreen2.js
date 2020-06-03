import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Text, Icon, Input, Button, SocialIcon} from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as firebase from 'firebase'


import logoInto from '../assets/logoInto.png'

const RegisterSchema = yup.object().shape({
    email: yup.string()
      .email('Email invalido')
      .required('Email é necessario'),
  });

 


export class EmailInputScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  
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
           initialValues={{email: ''}}
           onSubmit={values => {
            this.props.navigation.navigate('Password',{email: values.email});
           }}
           validationSchema={RegisterSchema}>
           
           {formikProps => (
             <React.Fragment>
               <View style={styles.headerContainer}>
               <Image source={logoInto} style={{ alignSelf: "center", height: 130, width: 202 }} />
                 <Text h4 style={{textAlign: 'center'}}>
                   Qual seu endereço de E-mail ?
                 </Text>
               </View>
               <Input
                 leftIcon={
                   <Icon
                     name="mail-outline"
                     color='#1a98d0'
                     size={25}
                   />
                 }
                 placeholder="insira seu Email"
                 inputContainerStyle={{
                   borderWidth: 1,
                   borderColor: 'white',
                   borderLeftWidth: 0,
                   height: 50,
                   backgroundColor: 'white',
                   marginBottom: 20,
                 }}
                 placeholderTextColor="grey"
                 autoCapitalize="none"
                 autoCorrect={false}
                 keyboardType="email-address"
                 returnKeyType="next"
                 onChangeText={formikProps.handleChange('email')}
               />
               {formikProps.errors.email ? (
                 <Text style={{color: 'red'}}>{formikProps.errors.email}</Text>
                ) : null}
               <View style={styles.btnWrapper}>
                 <Button
                   disabled={!(formikProps.isValid && formikProps.dirty)}
                   title="Continuar"
                   loading={false}
                   loadingProps={{size: 'small', color: 'white'}}
                   buttonStyle={{
                     backgroundColor: '#1a98d0',
                     borderRadius: 15,
                   }}
                   titleStyle={{fontWeight: 'bold', fontSize: 23}}
                   containerStyle={{
                     marginVertical: 10,
                     height: 50,
                     width: 300,
                   }}
                   onPress={formikProps.handleSubmit}
                   underlayColor="transparent"
                 />
               </View>
             </React.Fragment>
           )}  
         </Formik>  
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6FA',
    height: '100%',
  },
  headerContainer: {
    top: 30,
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
  btnWrapper: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialLogin: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentView: {
    // marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainerStyle: {
    marginTop: 16,
    width: '90%',
  },
  keyboardAvoidingView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
export default EmailInputScreen;