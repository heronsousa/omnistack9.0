import React, { useState, useEffect } from 'react';
import { 
    View, 
    AsyncStorage,
    KeyboardAvoidingView,
    Text, 
    Image, 
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native'; 

import logo from '../assets/logo.png';
import  api from '../services/api';

export default function Login({ navigation }) {

    useEffect(() => {
        AsyncStorage.getItem('user_id').then(user => {
            if(user){
                navigation.navigate('List');
            }
        })
    }, []);

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    async function handleSubmit(){

        const response = await api.post('sessions', {email});

        const { _id } = response.data;

        await AsyncStorage.setItem('user_id', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }

    return(
        <KeyboardAvoidingView 
            behavior='padding' 
            style={styles.container}
        >
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label} >SEU EMAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Seu e-mail'
                    placeholderTextColor='#999'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label} >TECNOLOGIAS *</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Tecnologias de interesse'
                    placeholderTextColor='#999'
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}    
                >
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    }, 

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 4
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});