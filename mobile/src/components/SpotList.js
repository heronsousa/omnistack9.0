import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';

import api from '../services/api';

function SpotList({ tech, navigation }) {

    const [spots, setSpots] = useState([]);
    const [thumb, setThumb] = useState([]);

    useEffect(() => {
        async function loadSpots(){
            const response = await api.get('/spots', {
                params: {tech}
            })
            setSpots(response.data);

            setThumb(response.data[0].thumbnail_url);
        }

        loadSpots();
    }, []);

    function handleNavigation(id){
        navigation.navigate('Book', { id });
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.titleSpot}>{tech}</Text>:</Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listSpot}>
                        <Image
                            style={styles.spotImage}
                            source={{ uri: 'http://localhost:3333/files/unb-terra-1570738207957.jpg' }}
                        />
                        <Text style={styles.company}>{item.thumbnail_url}</Text>
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : "GRATUITO"}</Text>
                        <TouchableOpacity onPress={() => handleNavigation(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

export default withNavigation(SpotList);

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 20
    },

    titleSpot: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 20
    },
    
    listSpot: {
        marginRight: 15
    },

    spotImage: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 4
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }
});