// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/home/Home';
import UserInfo from './src/screens/userInfo/UserInfo';
import store from './src/redux-toolkit/store';
import './firebaseConfig'; // Import cấu hình Firebase

export type RootStackParamList = {
  Home: undefined;
  UserInfo: { userId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;


// // import React from 'react';
// // import { View } from 'react-native';
// // import GenerateQRCode from './src/components/GenerateQRCode/GenerateQRCode';

// // const App = () => {
// //   return (
// //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //       <GenerateQRCode />
// //     </View>
// //   );
// // };

// // export default App;