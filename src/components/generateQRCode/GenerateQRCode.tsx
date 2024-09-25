// import React, { useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';
// import { collection, addDoc } from 'firebase/firestore';

// const GenerateQRCode = () => {
//     const [userInfo, setUserInfo] = useState({
//         fullName: '',
//         birthday: '',
//         gender: '',
//         department: ''
//     });
//     const [qrCodeData, setQrCodeData] = useState<string | null>(null);

//     const handleInputChange = (field: string, value: string) => {
//         setUserInfo({ ...userInfo, [field]: value });
//     };

//     const saveUserInfo = async (userInfo: typeof userInfo) => {
//         try {
//             const docRef = await addDoc(collection(firestore, 'users'), userInfo);
//             console.log('Document written with ID: ', docRef.id);
//         } catch (e) {
//             console.error('Error adding document: ', e);
//         }
//     };

//     const generateQRCode = () => {
//         const data = JSON.stringify(userInfo);
//         setQrCodeData(data);
//         saveUserInfo(userInfo);
//     };

//     return (
//         <View style={{ padding: 20 }}>
//             <Text>Full Name:</Text>
//             <TextInput
//                 value={userInfo.fullName}
//                 placeholder="Nhập văn bản"
//                 onChangeText={(text) => handleInputChange('fullName', text)}
//                 style={{ borderWidth: 1, marginBottom: 10 }}
//             />
//             <Text>Birthday:</Text>
//             <TextInput
//                 value={userInfo.birthday}
//                 onChangeText={(text) => handleInputChange('birthday', text)}
//                 style={{ borderWidth: 1, marginBottom: 10 }}
//             />
//             <Text>Gender:</Text>
//             <TextInput
//                 value={userInfo.gender}
//                 onChangeText={(text) => handleInputChange('gender', text)}
//                 style={{ borderWidth: 1, marginBottom: 10 }}
//             />
//             <Text>Department:</Text>
//             <TextInput
//                 value={userInfo.department}
//                 onChangeText={(text) => handleInputChange('department', text)}
//                 style={{ borderWidth: 1, marginBottom: 10 }}
//             />
//             <Button title="Generate QR Code" onPress={generateQRCode} />
//             {qrCodeData && (
//                 <View style={{ marginTop: 20, alignItems: 'center' }}>
//                     <Text>QR Code:</Text>
//                     <QRCode value={qrCodeData} size={200} />
//                 </View>
//             )}
//         </View>
//     );
// };

// export default GenerateQRCode;
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = () => {
    const [userId, setUserId] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);

    const handleGenerateQR = () => {
        if (userId.trim() !== '') {
            setShowQRCode(true);  // Hiển thị mã QR khi người dùng nhập ID
        }
    };

    const handleReset = () => {
        setUserId('');          // Xóa giá trị của userId
        setShowQRCode(false);   // Ẩn mã QR
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nhập ID để tạo mã QR</Text>

            <TextInput
                style={styles.input}
                placeholder="Nhập ID"
                value={userId}
                onChangeText={setUserId}
            />

            <View style={styles.buttonContainer}>
                <Button title="Tạo mã QR" onPress={handleGenerateQR} />
                <Button title="Làm mới" onPress={handleReset} color="red" />
            </View>

            {showQRCode && (
                <View style={styles.qrContainer}>
                    <QRCode value={userId} size={200} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
    },
    qrContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default QRCodeGenerator;

