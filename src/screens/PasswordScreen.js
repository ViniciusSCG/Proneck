import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { BoxPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { Text, Icon, Input, Button, SocialIcon } from 'react-native-elements';
import logoInto from '../assets/logoInto.png'

import { Formik } from 'formik';
import * as yup from 'yup';
import * as firebase from 'firebase'

const SignupSchema = yup.object({
    password: yup.string()
      .required('Senha é obrigatória')
      .min(6, 'Senha deve ter entre 6 caracteres'),
    passwordConfirm: yup.string()
      .oneOf([yup.ref('password'), null], 'As senhas não são semelhantes')
      .required('É nescessário confirmar a senha'),
});

const MAX_LEN = 15,
  MIN_LEN = 6,
  PASS_LABELS = ["Too Short", "Weak", "Normal", "Strong", "Secure"];




export class PasswordInputScreen extends Component {
    signUp = (values, navigation) => {
        this.setState({loading: true});
        let email = this.props.navigation.getParam('email');
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, values.password)
          .then(user => {
            this.setState({user});
            alert('Registro efetuado com sucesso');
            navigation.navigate('Home');
          })
        };
     
    onChange = password => this.setState({ password });
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
                initialValues={{password: '', passwordConfirm: ''}}
                onSubmit={(values, {setSubmitting}) => {
                   this.signUp(values, this.props.navigation);
                   setSubmitting(false);
                }}
                validationSchema={SignupSchema}>
                 
                 {formikProps => (
                   <React.Fragment>
                     <View style={styles.headerContainer}>
                     <Image source={logoInto} style={{ alignSelf: "center", height: 130, width: 202 }} />
                       <Text h4 style={{textAlign: 'center'}}>
                            Agora vamos inserir uma senha
                       </Text>
                     </View>
                     <Input
                        leftIcon={
                        <Icon
                            name="lock"
                            color='#1a98d0'
                            size={25}
                        />
                        }
                        placeholder="Email"
                        inputContainerStyle={{
                        borderWidth: 1,
                        borderColor: 'white',
                        borderLeftWidth: 0,
                        height: 50,
                        backgroundColor: 'white',
                        marginBottom: 20,
                        }}
                        autoCapitalize="none"
                        placeholder="Digite sua senha"
                        secureTextEntry={true}
                        autoCorrect={false}
                        returnKeyType="next"
                        onChangeText={formikProps.handleChange('password')}
                    />
                    <Input
                        leftIcon={
                        <Icon
                            name="lock"
                            color='#1a98d0'
                            size={25}
                        />
                        }
                        placeholder="Confirme sua senha"
                        inputContainerStyle={{
                        borderWidth: 1,
                        borderColor: 'white',
                        borderLeftWidth: 0,
                        height: 50,
                        backgroundColor: 'white',
                        marginBottom: 20,
                        }}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        autoCorrect={false}
                        returnKeyType="next"
                        onChangeText={formikProps.handleChange('passwordConfirm')}
                    />
                    {formikProps.errors.password ? (
                        <Text style={{color: 'red'}}>
                        {formikProps.errors.password}
                        </Text>
                    ) : null}
                    {formikProps.errors.passwordConfirm ? (
                        <Text style={{color: 'red'}}>
                        {formikProps.errors.passwordConfirm}
                        </Text>
                    ) : null}
                    <BoxPasswordStrengthDisplay
                        password={formikProps.values.password}
                    />
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
                        containerStyle={{marginVertical: 10, height: 50, width: 300}}
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
export default PasswordInputScreen;