import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import cafeApi from "../api/cafeApi";
import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from "./AuthReducer";

type AuthContextProps= {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
}

export const AuthContext = createContext( {} as AuthContextProps );

export const AuthProvider = ({ children }: any) =>{

    const [state, dispatch] = useReducer(authReducer, authInicialState);

    useEffect(() => {
        // se llama la peticion en el then esperarias para leer el token tenga o no le token dentro el catch es para anunciar en este caso que el no se puede ejecutar al accion de leer,  el catch es ta realcionado a que la lectura fue denegada, razones puede que el dispositivo no tenga espacio en memoria para almacenar informacion
        // AsyncStorage.getItem('token')
        // .then( token =>{
        //     console.log({ token })
        // }). catch ( err =>{
        //     console.log({ err })
        // })
        checkToken();
    }, []);

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');
        //No hay token
        if( !token ) return dispatch({ type: 'notAuthenticated' });
        //Hay token
        const resp= await cafeApi.get('/auth')

        if( resp.status !== 200 ) {
            return dispatch({ type: 'notAuthenticated' })
        }
        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        })
    }


    const signIn = async({ correo, password }: LoginData )=> {
        try {
            const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password })

            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            })

            await AsyncStorage.setItem('token', data.token );

        } catch (error: any) {
            dispatch({ type: 'addError', payload: error.response.data.msg || 'Informacion incorrecta' })
        }
    };

    const signUp = async({ nombre, correo, password }: RegisterData) => {
        try {
            const { data } = await cafeApi.post<LoginResponse>('/usuarios', { correo, password, nombre })

            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            })

            await AsyncStorage.setItem('token', data.token );

        } catch (error: any) {
            console.log(error.response.data)
            dispatch({ type: 'addError', payload: error.response.data.errors[0].msg || 'Revise la informacion' })
        }

    };
    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' })
        // fisicamente no podemos regresar a la pantalla anterior porque no existe
    };

    const removeError = () => {
        dispatch({ type: 'removeError' })
    };

    return(
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )
}