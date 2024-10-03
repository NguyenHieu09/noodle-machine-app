
// src/components/WelcomeSection.tsx
import React from 'react';
import { View, Image, Text, StyleSheet, ImageBackground } from 'react-native';

const OutOfNoodlesScreen: React.FC = () => {
    return (
        // <View style={styles.container}>
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
            <Text style={styles.welcomeText}>out of noodles</Text>
            <Text style={styles.message}>
                There is <Text style={styles.number}>0</Text> cup of noodles left in the machine. Please fill in to continue.
            </Text>

            <Image
                source={require('../../../assets/image/Group 16.png')}
                style={styles.image}
                resizeMode="contain"

            />

        </ImageBackground>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        color: 'gray',
        fontWeight: '700',
        marginBottom: 20,

    },
    number: {
        color: '#FFFFFF', // White color for the number
    },
    logo: {
        marginTop: 50,
        width: 100,
        height: 100,
        marginBottom: 20,
    },

    image: {
        marginTop: 10,
        width: 250,
        height: 150,

    },
    playButton: {
        position: 'absolute',
        top: '30%',
        left: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 50,
        width: 60,
        height: 60,
    },
    welcomeText: {
        fontSize: 35, // Kích thước chữ  
        fontWeight: 'bold', // Chữ đậm  
        color: '#c0392b', // Màu chữ đỏ  
        textTransform: 'uppercase', // Chữ in hoa  
        marginBottom: 40, // Khoảng cách dưới cùng
    },
    scan: {
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 10,
        borderRadius: 5,
        marginTop: 40,
    },
    text: {
        fontSize: 18,
        color: '#980000',
        fontWeight: '800',
        marginLeft: 5,
    },
});

export default OutOfNoodlesScreen;