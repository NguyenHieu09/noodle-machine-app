// import React, { useState } from 'react';
// import { View, StyleSheet, Alert, ActivityIndicator, ImageBackground } from 'react-native';
// import UserScanner from '../../components/userScanner/UserScanner';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../navigation/RootNavigator';
// import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
// import { app } from '../../../firebaseConfig';
// import Error from '@/src/components/Error/Error';
// // import WelcomeSection from '@/src/components/WelcomeSection/WelcomeSection';
// // import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon component
// import WelcomeSection from '@/src/components/WelcomeSection/WelcomeSection';
// import { FontAwesome } from '@expo/vector-icons';

// const Home: React.FC = () => {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const [loading, setLoading] = useState(false);
//   const [hasError, setHasError] = useState(false); // State để quản lý trạng thái lỗi

//   const handleScanSuccess = async (data: string) => {
//     setLoading(true);
//     setHasError(false); // Reset trạng thái lỗi trước khi bắt đầu quét
//     try {
//       const qrData = JSON.parse(data);

//       // Lấy dữ liệu từ Firebase dựa trên thông tin từ QR code
//       const firestore = getFirestore(app);
//       const usersRef = collection(firestore, 'users');
//       const q = query(
//         usersRef,
//         where('fullName', '==', qrData.fullName),
//         where('birthday', '==', qrData.birthday),
//         where('gender', '==', qrData.gender),
//         where('department', '==', qrData.department)
//       );
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const userDoc = querySnapshot.docs[0];
//         const firebaseData = userDoc.data();

//         // So sánh dữ liệu
//         if (
//           qrData.fullName === firebaseData.fullName &&
//           qrData.birthday === firebaseData.birthday &&
//           qrData.gender === firebaseData.gender &&
//           qrData.department === firebaseData.department
//         ) {
//           // Kiểm tra nếu cupNoodles = 0
//           if (firebaseData.cupNoodles === 0) {
//             navigation.navigate('OutOfNoodlesScreen');
//           } else {
//             navigation.navigate('UserInfo', { userId: userDoc.id });
//           }
//         } else {
//           setHasError(true); // Cập nhật trạng thái lỗi
//         }
//       } else {
//         setHasError(true); // Cập nhật trạng thái lỗi
//       }
//     } catch (error) {
//       console.error('Error processing QR data:', error);
//       setHasError(true); // Cập nhật trạng thái lỗi
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../../../assets/image/bg.png')}
//       style={styles.container}
//       resizeMode="cover"
//     >
//       {hasError ? (
//         <Error /> // Hiển thị component Error nếu có lỗi
//       ) : (
//         <WelcomeSection /> // Hiển thị component WelcomeSection nếu không có lỗi
//       )}

//       <View style={styles.container}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : (
//           <View style={styles.scannerContainer}>
//             {/* <View style={styles.scanner}> */}
//             <UserScanner onScanSuccess={handleScanSuccess} hasError={hasError} />
//             {/* </View> */}
//             <FontAwesome name="angle-double-right" size={80} color="#fff" style={styles.icon} />
//           </View>
//         )}
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: '#fff',
//   },
//   scannerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center', // Căn giữa theo chiều ngang  
//     flex: 1, //
//   },
//   scanner: {
//     flex: 2,
//     // marginLeft: 10
//     backgroundColor: '#fff',
//   },
//   icon: {
//     flex: 1,
//     left: 30,
//   },
// });

// export default Home;


import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import UserScanner from '../../components/userScanner/UserScanner';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';
import Error from '@/src/components/Error/Error';
import WelcomeSection from '@/src/components/WelcomeSection/WelcomeSection';
import { FontAwesome } from '@expo/vector-icons';

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
  //         // Kiểm tra nếu cupNoodles = 0
  //         const currentDate = new Date();
  //         const currentMonth = currentDate.getMonth();
  //         const lastVisitDate = new Date(firebaseData.lastVisitDate || '');
  //         const lastVisitMonth = lastVisitDate.getMonth();

  //         if (firebaseData.cupNoodles === 0) {
  //           if (currentMonth !== lastVisitMonth) {
  //             // Cập nhật lastVisitDate trong Firebase
  //             await updateDoc(userDoc.ref, { lastVisitDate: currentDate.toISOString() });
  //             navigation.navigate('OutOfNoodlesScreen');
  //           } else {
  //             Alert.alert('Thông báo', 'Bạn đã hết mì trong tháng này. Vui lòng quay lại vào tháng sau.');
  //           }
  //         } else {
  //           navigation.navigate('UserInfo', { userId: userDoc.id });
  //         }
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
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();
          const lastVisitDate = new Date(firebaseData.lastVisitDate || '');
          const lastVisitMonth = lastVisitDate.getMonth();

          if (firebaseData.cupNoodles === 0) {
            if (currentMonth !== lastVisitMonth) {
              navigation.navigate('OutOfNoodlesScreen');
              await updateDoc(userDoc.ref, { lastVisitDate: currentDate.toISOString() });
            }
            else {
              navigation.navigate('UserInfo', { userId: userDoc.id });

            }
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
          <View style={styles.scannerContainer}>
            <UserScanner onScanSuccess={handleScanSuccess} hasError={hasError} />
            <FontAwesome name="angle-double-right" size={90} color="#fff" style={styles.icon} />
          </View>
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
  },
  scannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  scanner: {
    flex: 2,
    backgroundColor: '#fff',
  },
  icon: {
    flex: 1,
    left: 40,
  },
});

export default Home;