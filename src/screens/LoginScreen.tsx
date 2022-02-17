import React, { useContext, useEffect } from 'react'
import { Platform, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';

import { Backgrpund } from '../components/Backgrpund';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForn';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {

    const { signIn, errorMessage, removeError } = useContext( AuthContext )

    const { email, password, onChange } = useForm({
        email:'',
        password:'',
    });

    useEffect(() => {

        if( errorMessage.length === 0 ) return;

        Alert.alert( 'Login incorrecto', errorMessage, [{ text: 'OK', onPress: removeError }] );

    }, [errorMessage])

    const onLogin = () => {
        console.log({ email, password });
        // para ocultar el tecldo al mandar
        Keyboard.dismiss();
        signIn({ correo: email, password })
    }

  return (
    <>
        {/* Background */}
        <Backgrpund/>

        <KeyboardAvoidingView
            style={{ flex: 1, }}
            behavior={( Platform.OS === 'ios' ) ? 'padding' : 'height' }
        >

            {/* keyboard avoid view */}
            <View style={ loginStyles.formContainer }>

                <WhiteLogo />

                <Text style={ loginStyles.title }>Login</Text>

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
                    onSubmitEditing={ onLogin }

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
                    onSubmitEditing={ onLogin }

                    autoCapitalize='none'
                    autoCorrect={ false }
                />

                {/* btn login */}
                <View style={ loginStyles.buttonContainer }>
                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        style={ loginStyles.button }
                        onPress={ onLogin }
                    >
                        <Text style={ loginStyles.buttonText }>Login</Text>
                    </TouchableOpacity>
                </View>

                {/* create new user */}
                <View
                    style={ loginStyles.newUserContainer }
                >
                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        // si quiero escucar errores de la autentificacione es mejor destruir/reemplazar la pantalla anterior para solo tener register
                        onPress={ () => navigation.replace('RegisterScreen') }
                    >
                        <Text style={ loginStyles.buttonText }>Nueva cuenta </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    </>
  )
}
