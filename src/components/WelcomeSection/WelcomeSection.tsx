// src/components/WelcomeSection.tsx
import ScanIcon from '@/src/svg/ScanIcon';
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const WelcomeSection: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/image/Group (1).png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.welcomeText}>WELCOME</Text>

            <View style={styles.outerBorder}>
                <View style={styles.innerBorder}>
                    <View style={styles.videoContainer}>
                        <Image
                            source={require('../../../assets/image/image 1.png')}
                            style={styles.video}
                        />
                        <View style={styles.playButton}>
                            <MaterialIcons name="play-arrow" size={40} color="white" />
                        </View>
                    </View>
                </View>
            </View>
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
    outerBorder: {
        borderWidth: 10, // Độ dày viền ngoài  
        borderColor: '#ffffff', // Màu viền trắng  
        borderRadius: 10,
    },
    innerBorder: {
        borderWidth: 10, // Độ dày viền trong  
        borderColor: '#FFD700', // Màu viền vàng  
        borderRadius: 15, // Bo góc  
        // padding: 5, // Khoảng cách giữa viền vàng và hình ảnh  
    },
    videoContainer: {
        width: 230, // Kích thước hình ảnh  
        height: 130, // Kích thước hình ảnh  
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        // marginBottom: 20,
    },
    video: {
        width: 230, // Kích thước hình ảnh  
        height: 130, // Kích thước hình ảnh  
        resizeMode: 'cover',
        borderRadius: 10,
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

export default WelcomeSection;