# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Development Commands

### Project Setup
```bash
npm install
```

### Running the Application
```bash
# Start Metro bundler
npm run start
# or
npx react-native start

# Run on Android (in separate terminal)
npm run android
# or
npx react-native run-android

# Run on iOS (macOS only)
npm run ios
# or  
npx react-native run-ios
```

### Development & Testing
```bash
# Run linting
npm run lint

# Run tests
npm run test
# or
npx jest

# Run specific test file
npx jest __tests__/App.test.tsx

# Clear Metro cache (useful for troubleshooting)
npx react-native start --reset-cache
```

### Android Development
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..

# Build debug APK
cd android && ./gradlew assembleDebug && cd ..

# Build release APK
cd android && ./gradlew assembleRelease && cd ..

# Build App Bundle (for Play Store)
cd android && ./gradlew bundleRelease && cd ..
```

### iOS Development (macOS only)
```bash
# Install iOS dependencies
cd ios && pod install && cd ..

# Clean iOS build
cd ios && xcodebuild clean && cd ..
```

## Project Architecture

### Technology Stack
- **Frontend Framework**: React Native 0.81.4 with TypeScript
- **Navigation**: React Navigation 7.x (Stack Navigation)
- **UI Components**: React Native Paper (Material Design)
- **State Management**: React Hooks (local state)
- **Image Processing**: React Native Image Picker + Camera
- **AI/ML Backend**: TensorFlow Lite (Android native module)
- **Animations**: React Native Animatable
- **Icons**: React Native Vector Icons (Material Icons)

### Core Architecture Pattern
This is a **hybrid React Native + Native Android ML** application with the following key architectural components:

1. **React Native Frontend Layer**: Handles UI, navigation, and user interactions
2. **Native Android ML Module**: Processes TensorFlow Lite model inference
3. **Bridge Communication**: React Native NativeModules bridge for JS-to-Kotlin communication
4. **Data Layer**: Static plant information database with structured botanical data

### Directory Structure
```
src/
├── components/          # Reusable UI components
│   └── ErrorBoundary.js # Global error handling
├── data/               # Static data and plant information
│   └── plantsData.js   # Comprehensive plant database (3 species)
├── screens/            # Main application screens
│   ├── WelcomeScreen.js
│   ├── CameraScreen.js
│   └── DetectionResultsScreen.js
├── theme/              # Design system and styling
│   └── colors.js       # Colors, spacing, typography constants
└── utils/              # Utility functions

android/app/src/main/
├── assets/             # TensorFlow Lite model (.tflite file)
└── java/com/plantleafdetectorapp/
    ├── PlantDetectionModule.kt    # ML inference native module
    └── PlantDetectionPackage.kt   # React Native bridge
```

### Key Application Flow
1. **Welcome Screen** → **Camera Screen** → **Detection Results Screen**
2. Camera Screen handles image capture/selection with permissions
3. DetectionResultsScreen calls native Android module for ML inference
4. Results screen displays confidence scores and plant information
5. Plant data is retrieved from static database in `plantsData.js`

### Native Module Integration
- **PlantDetectionModule**: Kotlin module that loads TensorFlow Lite model
- **Bridge Communication**: Uses React Native NativeModules API
- **Image Processing**: Android Bitmap API with EXIF handling
- **Model Requirements**: 224x224x3 RGB input, 3-class softmax output
- **Supported Plants**: Bael (85% accuracy), Betel (90%), Crown Flower (90%)

### Design System
- **Material Design 3.0** principles
- **Green nature-inspired color palette** (`src/theme/colors.js`)
- **Consistent spacing system** (4px base unit)
- **Typography scale** with defined font weights
- **Plant-specific color coding** for different species

### State Management Pattern
- **Local React hooks** for component state
- **Screen-level state management** (no global state)
- **Navigation params** for data passing between screens
- **Static data imports** for plant information

### Permission Handling
- **Android**: Camera, READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE
- **iOS**: Camera, Photo Library access
- **Cross-platform permission checks** with react-native-permissions

## Development Notes

### TensorFlow Lite Integration
- Model file must be placed in `android/app/src/main/assets/plant_detection_model.tflite`
- Native module expects specific input format: 224x224x3 RGB
- Mock detection results are used when native module is unavailable (development mode)

### Image Processing Pipeline
1. Image selection via camera/gallery
2. Image path passed to native module
3. Native module handles resizing and preprocessing
4. TensorFlow Lite inference on preprocessed image
5. Results returned to React Native via bridge

### Plant Database Structure
- Each plant has comprehensive botanical information
- Includes medicinal uses, cultural significance, habitat data
- Chemical composition and warnings included
- Model accuracy metadata for each species

### Styling Approach
- Centralized design tokens in `src/theme/colors.js`
- Material Design color palette with nature theme
- Responsive design using Dimensions API
- Gradient backgrounds and shadows for depth

### Error Handling
- ErrorBoundary component for React error catching
- Try-catch blocks around native module calls
- Fallback mock data for development
- User-friendly error messages and retry mechanisms

### Testing Strategy
- Jest configuration for unit tests
- React Native testing setup
- Mock data available for testing without ML model
- Test files in `__tests__/` directory

## Platform-Specific Considerations

### Android
- Minimum SDK version: 21 (Android 5.0)
- TensorFlow Lite GPU acceleration available
- Native Kotlin module for ML processing
- EXIF orientation handling for images
- Material Design components

### iOS
- iOS 11+ support
- CocoaPods dependency management
- Would require separate iOS ML module implementation
- Camera and photo library permissions

### Development Environment
- Node.js 20+ required
- React Native CLI setup
- Android Studio for Android development
- Xcode for iOS development (macOS only)
- Proper Android SDK and environment variables setup