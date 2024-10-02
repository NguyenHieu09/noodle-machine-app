// src/screens/home/Home.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import UserScanner from '../../components/userScanner/UserScanner';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';
import Error from '@/src/components/Error/Error';
import WelcomeSection from '@/src/components/WelcomeSection/WelcomeSection';

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false); // State để quản lý trạng thái lỗi

  // const handleScanSuccess = async (data: string) => {
  //   setLoading(true);
  //   setHasError(false); // Reset trạng thái lỗi trước khi bắt đầu quét
  //   try {
  //     const qrData = JSON.parse(data);

  //     // Lấy dữ liệu từ Firebase dựa trên thông tin từ QR code
  //     const firestore = getFirestore(app);
  //     const usersRef = collection(firestore, 'users');
  //     const q = query(
  //       usersRef,
  //       where('fullName', '==', qrData.fullName),
  //       where('birthday', '==', qrData.birthday),
  //       where('gender', '==', qrData.gender),
  //       where('department', '==', qrData.department)
  //     );
  //     const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //       const userDoc = querySnapshot.docs[0];
  //       const firebaseData = userDoc.data();

  //       // So sánh dữ liệu
  //       if (
  //         qrData.fullName === firebaseData.fullName &&
  //         qrData.birthday === firebaseData.birthday &&
  //         qrData.gender === firebaseData.gender &&
  //         qrData.department === firebaseData.department
  //       ) {
  //         navigation.navigate('UserInfo', { userId: userDoc.id });
  //       } else {
  //         setHasError(true); // Cập nhật trạng thái lỗi
  //       }
  //     } else {
  //       setHasError(true); // Cập nhật trạng thái lỗi
  //     }
  //   } catch (error) {
  //     console.error('Error processing QR data:', error);
  //     setHasError(true); // Cập nhật trạng thái lỗi
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleScanSuccess = async (data: string) => {
    setLoading(true);
    setHasError(false); // Reset trạng thái lỗi trước khi bắt đầu quét
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
          // Kiểm tra nếu cupNoodles = 0
          if (firebaseData.cupNoodles === 0) {
            navigation.navigate('OutOfNoodlesScreen');
          } else {
            navigation.navigate('UserInfo', { userId: userDoc.id });
          }
        } else {
          setHasError(true); // Cập nhật trạng thái lỗi
        }
      } else {
        setHasError(true); // Cập nhật trạng thái lỗi
      }
    } catch (error) {
      console.error('Error processing QR data:', error);
      setHasError(true); // Cập nhật trạng thái lỗi
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
      {hasError ? (
        <Error /> // Hiển thị component Error nếu có lỗi
      ) : (
        <WelcomeSection /> // Hiển thị component WelcomeSection nếu không có lỗi
      )}

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <UserScanner onScanSuccess={handleScanSuccess} hasError={hasError} />
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
});

export default Home;