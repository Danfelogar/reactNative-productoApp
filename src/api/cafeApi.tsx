import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// desarrollo
const baseURL = 'http://192.168.1.15:8080/api';

const cafeApi = axios.create({ baseURL });

//esto es un middleware de axios( para esta cituasion cada vez que pasa por esta peticion quiero que pase por este codigo de abajo )
cafeApi.interceptors.request.use(

    async( config: any ) => {
        const token = await AsyncStorage.getItem('token');
        if( token ){
            config.headers['x-token'] = token;
        }

        return config;
    }

)

export default cafeApi;