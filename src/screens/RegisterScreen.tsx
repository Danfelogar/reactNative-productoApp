import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForn';
import { WhiteLogo } from '../components/WhiteLogo';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({ navigation }: Props) => {

  const { signUp, errorMessage, removeError, } = useContext( AuthContext );

  const { email, password, onChange, name, } = useForm({
    email:'',
    password:'',
    name: '',
  });

  useEffect(() => {

    if( errorMessage.length === 0 ) return;

    Alert.alert( 'Registro incorrecto', errorMessage, [{ text: 'OK', onPress: removeError }] );

  }, [errorMessage])

const onRegister = () => {
    console.log({ email, password, name });
    // para ocultar el tecldo al mandar
    Keyboard.dismiss();
    signUp({ nombre: name, correo: email, password, });
}

  return (
    <>
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#5856D6' }}
            behavior={( Platform.OS === 'ios' ) ? 'padding' : 'height' }
        >

            {/* keyboard avoid view */}
            <View style={ loginStyles.formContainer }>

                <WhiteLogo />

                <Text style={ loginStyles.title }>Registro</Text>

                <Text style={ loginStyles.label }>Nombre:</Text>
                <TextInput
                    placeholder='Ingrese su nombre:'
                    placeholderTextColor='rgba(255,255,255,0.4)'
                    underlineColorAndroid='white'
                    style={[ loginStyles.inputField,
                    ( Platform.OS === 'ios') && loginStyles.inputFieldOS ]}
                    selectionColor='white'

                    onChangeText={ (value) => onChange(value, 'name')}
                    value={ name }
                    onSubmitEditing={ onRegister }

                    autoCapitalize='words'
                    autoCorrect={ false }
                />

                <Text style={ loginStyles.label }>Email:</Text>
                <TextInput
                    placeholder='Ingrese su email:'
                    placeholderTextColor='rgba(255,255,255,0.4)'
                    keyboardType='email-address'
                    underlineColorAndroid='white'
                    style={[ loginStyles.inputField,
                    ( Platform.OS === 'ios') && loginStyles.inputFieldOS ]}
                    selectionColor='white'

                    onChangeText={ (value) => onChange(value, 'email')}
                    value={ email }
                    onSubmitEditing={ onRegister }

                    autoCapitalize='none'
                    autoCorrect={ false }
                />

                <Text style={ loginStyles.label }>Contraseña:</Text>
                <TextInput
                    placeholder='*********'
                    placeholderTextColor='rgba(255,255,255,0.4)'
                    underlineColorAndroid='white'
                    secureTextEntry
                    style={[ loginStyles.inputField,
                    ( Platform.OS === 'ios') && loginStyles.inputFieldOS ]}
                    selectionColor='white'

                    onChangeText={ (value) => onChange(value, 'password')}
                    value={ password }
                    onSubmitEditing={ onRegister }

                    autoCapitalize='none'
                    autoCorrect={ false }
                />

                {/* btn login */}
                <View style={ loginStyles.buttonContainer }>
                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        style={ loginStyles.button }
                        onPress={ onRegister }
                    >
                        <Text style={ loginStyles.buttonText }>Crear cuenta</Text>
                    </TouchableOpacity>
                </View>

                {/* create new user */}
                <TouchableOpacity
                  onPress={ ()=> navigation.replace('LoginScreen') }
                  activeOpacity={ 0.8 }
                  style={ loginStyles.buttonReturn }
                >
                  <Text style={ loginStyles.buttonText }>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </>
  )
}
