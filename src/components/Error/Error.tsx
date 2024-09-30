import ScanIcon from '@/src/svg/ScanIcon';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Error: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/image/Group (1).png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.errorText}>ERROR</Text>
            <Text style={styles.message}>Cannot recognize your ID card.</Text>
            <View style={styles.button}>
                <Text style={styles.buttonText}>Please scan again.</Text>
            </View>
            <Image
                source={require('../../../assets/image/Frame.png')}
                style={styles.cardText}
                resizeMode="contain"
            />

            <View style={styles.scan}>
                <ScanIcon width={35} height={35} fill="#8B0000" />
                <Text style={styles.text}>Follow the arrow to scan card</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        marginTop: 50,
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    errorText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#c0392b',
        textTransform: 'uppercase',
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        color: '#980000',
        fontWeight: '800',
        marginBottom: 20,

    },
    instruction: {
        fontSize: 16,
        marginVertical: 5,
    },
    cardText: {
        width: 100,
        height: 150,
    },
    button: {
        backgroundColor: '#D86643', // Màu nền của nút  
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff', // Màu chữ  
        fontSize: 16,
        fontWeight: 'bold',
    },
    scan: {
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        color: '#980000',
        fontWeight: '800',
        marginLeft: 5,
    },
});

export default Error;