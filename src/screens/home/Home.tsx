// src/screens/home/Home.tsx
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import UserScanner from '../../components/userScanner/UserScanner';
import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../../App';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';

const Home: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleScanSuccess = async (data: string) => {
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
        }
    };

    return (
        <View style={styles.container}>
            <UserScanner onScanSuccess={handleScanSuccess} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default Home;