// src/screens/OutOfNoodlesScreen.tsx  
import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

const OutOfNoodlesScreen: React.FC = () => {
    return (
        <ImageBackground
            source={require('../../../assets/image/bg.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <Text style={styles.title}>OUT OF NOODLES</Text>
            <Text style={styles.message}>
                There is 0 cup of noodles left in the machine. Please fill in to continue.
            </Text>
            <Image
                source={require('../../../assets/image/image 1.png')} // Thay đổi đường dẫn đến hình ảnh của bạn  
                style={styles.image}
                resizeMode="contain"
            />
        </ImageBackground>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFD700', // Màu nền vàng  
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#c0392b', // Màu chữ đỏ  
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        color: '#333', // Màu chữ tối  
        textAlign: 'center',
        marginBottom: 30,
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default OutOfNoodlesScreen;