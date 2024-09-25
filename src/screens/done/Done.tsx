import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

type DoneNavigationProp = NavigationProp<RootStackParamList, 'Done'>;

interface DoneProps {
    navigation: DoneNavigationProp;
}

const Done: React.FC<DoneProps> = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../../../assets/image/bg.png')}
            style={styles.container}
            resizeMode="cover"
        >
                <Image
                    source={require('../../../assets/image/Group (1).png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.welcomeText}>done</Text>
                <Image
                    source={require('../../../assets/image/like.png')}
                    style={styles.like}
                    resizeMode="contain"
                />
                <View style={styles.enjoyContainer}>
                <Text style={styles.enjoyText}>
                    Enjoy your noodles <Icon name="heart" size={20} color="#FD4755" /> {/* Thêm biểu tượng trái tim */}
                </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <LinearGradient
                    colors={['#FFB706', '#FF7506']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>Back to Home</Text>
                </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.getThem}>Get them below</Text>

        {/* </View> */}
        </ImageBackground>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    message: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        marginTop: 20,
        shadowColor: '#000', // Màu của bóng đổ
        shadowOffset: { width: 0, height: 2 }, // Độ lệch của bóng đổ
        shadowOpacity: 0.25, // Độ mờ của bóng đổ
        shadowRadius: 3.84, // Bán kính của bóng đổ
        elevation: 5, // Độ cao của bóng đổ (chỉ dành cho Android)
    },
    gradient: {
        padding: 10,
        paddingHorizontal: 40,
        borderRadius: 56,
    },
    buttonText: {
        color: '#A31616',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700',
    },
    logo: {
        marginTop: 50,
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    like: {
        marginTop: 50,
        width: 200,
        height: 200,
        // marginBottom: 10,
    },
    welcomeText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#c0392b',
        textTransform: 'uppercase',
    },
    enjoyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    enjoyText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#c0392b',
    },
    getThem:{
        fontSize: 20,
        fontWeight: '900',
        color: '#F8C135',
        marginTop: 20,
    }
});

export default Done;