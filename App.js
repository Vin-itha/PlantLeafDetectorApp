// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { StatusBar, Platform } from 'react-native';

// // Screens
// import WelcomeScreen from './src/screens/WelcomeScreen';
// import CameraScreen from './src/screens/CameraScreen';
// import DetectionResultsScreen from './src/screens/DetectionResultsScreen';
// import PlantLibrary from './src/screens/PlantLibrary';
// import PlantDetailScreen from './src/screens/PlantDetailScreen';

// // Components
// import ErrorBoundary from './src/components/ErrorBoundary';

// // Theme
// import { colors } from './src/theme/colors';

// const Stack = createStackNavigator();

// // Material Design theme for react-native-paper
// const theme = {
//   colors: {
//     primary: colors.primary,
//     accent: colors.secondary,
//     background: colors.background,
//     surface: colors.surface,
//     error: colors.error,
//     text: colors.textPrimary,
//     onSurface: colors.textOnSurface,
//     disabled: colors.textHint,
//     placeholder: colors.textHint,
//     backdrop: colors.overlay,
//   },
// };

// const App = () => {
//   // Set status bar style for the entire app
//   React.useEffect(() => {
//     if (Platform.OS === 'android') {
//       StatusBar.setBackgroundColor(colors.primaryDark);
//       StatusBar.setBarStyle('light-content');
//     }
//   }, []);

//   return (
//     <ErrorBoundary>
//       <PaperProvider theme={theme}>
//         <StatusBar
//           backgroundColor={colors.primaryDark}
//           barStyle="light-content"
//           translucent={false}
//         />

//         <NavigationContainer>
//           <Stack.Navigator
//             initialRouteName="Welcome"
//             screenOptions={{
//               headerShown: false,
//               gestureEnabled: true,
//               cardStyleInterpolator: ({ current, layouts }) => {
//                 return {
//                   cardStyle: {
//                     transform: [
//                       {
//                         translateX: current.progress.interpolate({
//                           inputRange: [0, 1],
//                           outputRange: [layouts.screen.width, 0],
//                         }),
//                       },
//                     ],
//                   },
//                 };
//               },
//             }}
//           >
//             <Stack.Screen
//               name="Welcome"
//               component={WelcomeScreen}
//               options={{ title: 'Plant Leaf Detector' }}
//             />
//             <Stack.Screen
//               name="Camera"
//               component={CameraScreen}
//               options={{ title: 'Capture Leaf' }}
//             />
//             <Stack.Screen
//               name="DetectionResults"
//               component={DetectionResultsScreen}
//               options={{ title: 'Detection Results' }}
//             />
//             <Stack.Screen
//               name="PlantLibrary"
//               component={PlantLibrary}
//               options={{ title: 'Plant Library' }}
//             />
//             <Stack.Screen
//               name="PlantDetails"
//               component={PlantDetailScreen}
//               options={{ title: 'Plant Details' }}
//             />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </PaperProvider>
//     </ErrorBoundary>
//   );
// };

// export default App;




// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { StatusBar, Platform } from 'react-native';

// // Screens
// import WelcomeScreen from './src/screens/WelcomeScreen';
// import CameraScreen from './src/screens/CameraScreen';
// import DetectionResultsScreen from './src/screens/DetectionResultsScreen';
// import PlantLibrary from './src/screens/PlantLibrary';
// import PlantDetailScreen from './src/screens/PlantDetailScreen';
// import ChatbotScreen from './src/screens/ChatbotScreen';


// // Components
// import ErrorBoundary from './src/components/ErrorBoundary';

// // Theme
// import { colors } from './src/theme/colors';

// const Stack = createStackNavigator();

// // Material Design theme for react-native-paper
// const theme = {
//   colors: {
//     primary: colors.primary,
//     accent: colors.secondary,
//     background: colors.background,
//     surface: colors.surface,
//     error: colors.error,
//     text: colors.textPrimary,
//     onSurface: colors.textOnSurface,
//     disabled: colors.textHint,
//     placeholder: colors.textHint,
//     backdrop: colors.overlay,
//   },
// };

// const App = () => {
//   // Set status bar style for the entire app
//   React.useEffect(() => {
//     if (Platform.OS === 'android') {
//       StatusBar.setBackgroundColor(colors.primaryDark);
//       StatusBar.setBarStyle('light-content');
//     }
//   }, []);

//   return (
//     <ErrorBoundary>
//       <PaperProvider theme={theme}>
//         <StatusBar
//           backgroundColor={colors.primaryDark}
//           barStyle="light-content"
//           translucent={false}
//         />

//         <NavigationContainer>
//           <Stack.Navigator
//             initialRouteName="Welcome"
//             screenOptions={{
//               headerShown: false,
//               gestureEnabled: true,
//               cardStyleInterpolator: ({ current, layouts }) => {
//                 return {
//                   cardStyle: {
//                     transform: [
//                       {
//                         translateX: current.progress.interpolate({
//                           inputRange: [0, 1],
//                           outputRange: [layouts.screen.width, 0],
//                         }),
//                       },
//                     ],
//                   },
//                 };
//               },
//             }}
//           >
//             <Stack.Screen
//               name="Welcome"
//               component={WelcomeScreen}
//               options={{ title: 'Plant Leaf Detector' }}
//             />
//             {/* Register using the same name other files call: "CameraScreen" */}
//             <Stack.Screen
//               name="CameraScreen"
//               component={CameraScreen}
//               options={{ title: 'Capture Leaf' }}
//             />
//             <Stack.Screen
//               name="DetectionResults"
//               component={DetectionResultsScreen}
//               options={{ title: 'Detection Results' }}
//             />
//             <Stack.Screen
//               name="PlantLibrary"
//               component={PlantLibrary}
//               options={{ title: 'Plant Library' }}
//             />
//             {/* Register detail screen with the name used by navigation calls */}
//             <Stack.Screen
//               name="PlantDetailScreen"
//               component={PlantDetailScreen}
//               options={{ title: 'Plant Details' }}
//             />
//             <Stack.Screen
//             name="ChatbotScreen"
//             component={ChatbotScreen}
//             options={{ title: 'Chatbot' }}/>

//           </Stack.Navigator>
//         </NavigationContainer>
//       </PaperProvider>
//     </ErrorBoundary>
//   );
// };

// export default App;








// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar, Platform } from 'react-native';

// Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import DetectionResultsScreen from './src/screens/DetectionResultsScreen';
import PlantLibrary from './src/screens/PlantLibrary';
import PlantDetailScreen from './src/screens/PlantDetailScreen';
import ChatbotScreen from './src/screens/ChatbotScreen';   // ✅ NEW

// Components
import ErrorBoundary from './src/components/ErrorBoundary';

// Theme
import { colors } from './src/theme/colors';

const Stack = createStackNavigator();

const theme = {
  colors: {
    primary: colors.primary,
    accent: colors.secondary,
    background: colors.background,
    surface: colors.surface,
    error: colors.error,
    text: colors.textPrimary,
    onSurface: colors.textOnSurface,
    disabled: colors.textHint,
    placeholder: colors.textHint,
    backdrop: colors.overlay,
  },
};

const App = () => {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.primaryDark);
      StatusBar.setBarStyle('light-content');
    }
  }, []);

  return (
    <ErrorBoundary>
      <PaperProvider theme={theme}>
        <StatusBar
          backgroundColor={colors.primaryDark}
          barStyle="light-content"
          translucent={false}
        />

        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              cardStyleInterpolator: ({ current, layouts }) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        translateX: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [layouts.screen.width, 0],
                        }),
                      },
                    ],
                  },
                };
              },
            }}
          >
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ title: 'Plant Leaf Detector' }}
            />

            <Stack.Screen
              name="CameraScreen"
              component={CameraScreen}
              options={{ title: 'Capture Leaf' }}
            />

            <Stack.Screen
              name="DetectionResults"
              component={DetectionResultsScreen}
              options={{ title: 'Detection Results' }}
            />

            <Stack.Screen
              name="ChatbotScreen"            // ✅ Added
              component={ChatbotScreen}
              options={{ title: 'Chatbot' }}
            />

            <Stack.Screen
              name="PlantLibrary"
              component={PlantLibrary}
              options={{ title: 'Plant Library' }}
            />

            <Stack.Screen
              name="PlantDetailScreen"
              component={PlantDetailScreen}
              options={{ title: 'Plant Details' }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ErrorBoundary>
  );
};

export default App;
