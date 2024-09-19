// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux-toolkit/store';
import './firebaseConfig'; // Import cấu hình Firebase
import RootNavigator from './src/navigation/RootNavigator';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
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