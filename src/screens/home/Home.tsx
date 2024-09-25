// src/screens/home/Home.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Image,Text } from 'react-native';
import UserScanner from '../../components/userScanner/UserScanner';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';
import { ImageBackground } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const Home: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(false);

    const handleScanSuccess = async (data: string) => {
        setLoading(true);
        try {
            const qrData = JSON.parse(data);

            // Lấy dữ liệu từ Firebase dựa trên thông tin từ QR code
            const firestore = getFirestore(app);
            const usersRef = collection(firestore, 'users');
            const q = query(
                usersRef,
                where('fullName', '==', qrData.fullName),
                where('birthday', '==', qrData.birthday),
                where('gender', '==', qrData.gender),
                where('department', '==', qrData.department)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const firebaseData = userDoc.data();

                // So sánh dữ liệu
                if (
                    qrData.fullName === firebaseData.fullName &&
                    qrData.birthday === firebaseData.birthday &&
                    qrData.gender === firebaseData.gender &&
                    qrData.department === firebaseData.department
                ) {
                    navigation.navigate('UserInfo', { userId: userDoc.id });
                } else {
                    Alert.alert('Lỗi', 'Dữ liệu không khớp');
                }
            } else {
                Alert.alert('Lỗi', 'Không tìm thấy người dùng trong hệ thống');
            }
        } catch (error) {
            console.error('Error processing QR data:', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi xử lý dữ liệu');
        } finally {
            setLoading(false);
        }
    };

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
      <Text style={styles.welcomeText}>WELCOME</Text>  

      {/* <View style={styles.outerBorder}>  
        <View style={styles.innerBorder}>  
          <Image  
            source={require('../../../assets/image/image 1.png')} // Thay thế bằng URL hình ảnh hoặc video của bạn  
            style={styles.image}  
            resizeMode="contain"  
          />  
        </View>  
      </View>   */}
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
      <Text style={styles.scanText}>Follow the arrow to scan card</Text>  

        
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <UserScanner  onScanSuccess={handleScanSuccess} />
            )}
        </View>        
    </ImageBackground>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
      },
      logo: {
        marginTop: 50,
        width: 100,
        height: 100,
        marginBottom:20
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
      image: {  
        width:230, // Kích thước hình ảnh  
        height: 130, // Kích thước hình ảnh  
        resizeMode: 'cover',
        borderRadius: 10,
        

      },  
      videoContainer: {
        width:230, // Kích thước hình ảnh  
        height: 130, // Kích thước hình ảnh  
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        // marginBottom: 20,
      },
      video: {
        width:230, // Kích thước hình ảnh  
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
        marginBottom: 30, // Khoảng cách dưới cùng
        
      },  
      scanText:{
        marginTop:40,
        fontSize: 12, // Kích thước chữ  
        fontWeight: '900', // Chữ đậm  
        color: '#c0392b', // Màu chữ đỏ  
        textTransform: 'uppercase', // Chữ in hoa  
        marginBottom: 30, // Khoảng cách dưới cùng
      }
});

export default Home;