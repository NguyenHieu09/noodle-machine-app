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
import { View, Text, TextInput, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig';

// Define a type for user information
interface UserInfo {
    fullName: string;
    birthday: string;
    gender: string;
    department: string;
}

const GenerateQRCode = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        fullName: '',
        birthday: '',
        gender: '',
        department: ''
    });
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);

    const handleInputChange = (field: keyof UserInfo, value: string) => {
        setUserInfo({ ...userInfo, [field]: value });
    };

    const saveUserInfo = async (userInfo: UserInfo) => {
        try {
            const docRef = await addDoc(collection(firestore, 'users'), userInfo);
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const generateQRCode = () => {
        const data = JSON.stringify(userInfo);
        setQrCodeData(data);
        saveUserInfo(userInfo);
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Full Name:</Text>
            <TextInput
                value={userInfo.fullName}
                placeholder="Nhập văn bản"
                onChangeText={(text) => handleInputChange('fullName', text)}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Text>Birthday:</Text>
            <TextInput
                value={userInfo.birthday}
                onChangeText={(text) => handleInputChange('birthday', text)}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Text>Gender:</Text>
            <TextInput
                value={userInfo.gender}
                onChangeText={(text) => handleInputChange('gender', text)}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Text>Department:</Text>
            <TextInput
                value={userInfo.department}
                onChangeText={(text) => handleInputChange('department', text)}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Generate QR Code" onPress={generateQRCode} />
            {qrCodeData && (
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                    <Text>QR Code:</Text>
                    <QRCode value={qrCodeData} size={200} />
                </View>
            )}
        </View>
    );
};

export default GenerateQRCode;