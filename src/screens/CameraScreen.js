import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../theme/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CameraScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(colors.primaryDark);
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const cameraPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        // For Android 13+ (API 33+), use READ_MEDIA_IMAGES instead of READ_EXTERNAL_STORAGE
        let storagePermission;
        if (Platform.Version >= 33) {
          storagePermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          );
        } else {
          storagePermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
          );
        }
        
        if (cameraPermission && storagePermission) {
          setHasPermission(true);
        } else {
          requestPermissions();
        }
      } else {
        // iOS permission handling
        const cameraResult = await check(PERMISSIONS.IOS.CAMERA);
        const photoResult = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
        
        if (cameraResult === RESULTS.GRANTED && photoResult === RESULTS.GRANTED) {
          setHasPermission(true);
        } else {
          requestPermissions();
        }
      }
    } catch (error) {
      console.error('Permission check error:', error);
    }
  };

  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        // For Android 13+ (API 33+), request different permissions
        let permissionsToRequest = [PermissionsAndroid.PERMISSIONS.CAMERA];
        
        if (Platform.Version >= 33) {
          permissionsToRequest.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
        } else {
          permissionsToRequest.push(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          );
        }
        
        const granted = await PermissionsAndroid.requestMultiple(permissionsToRequest);

        const allPermissionsGranted = Object.values(granted).every(
          (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
        );

        setHasPermission(allPermissionsGranted);
        
        if (!allPermissionsGranted) {
          Alert.alert(
            'Permissions Required',
            'Camera and storage permissions are required to use this feature.',
            [{ text: 'OK' }]
          );
        }
      } else {
        // iOS permission requests
        const cameraResult = await request(PERMISSIONS.IOS.CAMERA);
        const photoResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        
        const granted = cameraResult === RESULTS.GRANTED && photoResult === RESULTS.GRANTED;
        setHasPermission(granted);
        
        if (!granted) {
          Alert.alert(
            'Permissions Required',
            'Camera and photo library permissions are required to use this feature.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  };

  const handleImagePicked = (response) => {
    if (response.didCancel || response.error) {
      return;
    }

    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      
      // Navigate to detection results with the image
      navigation.navigate('DetectionResults', {
        imageUri: asset.uri,
        imagePath: asset.uri,
        fileName: asset.fileName || 'captured_leaf.jpg',
        fileSize: asset.fileSize,
        imageWidth: asset.width,
        imageHeight: asset.height,
      });
    }
  };

  const openCamera = () => {
    if (!hasPermission) {
      requestPermissions();
      return;
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
      quality: 0.8,
      saveToPhotos: true,
    };

    launchCamera(options, handleImagePicked);
  };

  const openImageLibrary = () => {
    if (!hasPermission) {
      requestPermissions();
      return;
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
      quality: 0.8,
      selectionLimit: 1,
    };

    launchImageLibrary(options, handleImagePicked);
  };

  const showImageSourceAlert = () => {
    Alert.alert(
      'Select Image Source',
      'Choose how you want to capture or select the leaf image',
      [
        {
          text: 'Camera',
          onPress: openCamera,
          style: 'default',
        },
        {
          text: 'Gallery',
          onPress: openImageLibrary,
          style: 'default',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryVariant]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Icon name="arrow-back" size={24} color={colors.textOnPrimary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Capture Leaf</Text>
        
        <View style={styles.headerRight} />
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.content}>
  {/* Instruction Section */}
  <Animatable.View 
    animation="fadeInUp"
    delay={300}
    duration={800}
    style={styles.instructionSection}
  >
    <View style={styles.instructionIcon}>
      <Icon name="camera-alt" size={48} color={colors.primary} />
    </View>
    
    <Text style={styles.instructionTitle}>
      🌿 Ready to Identify Your Plant Leaf?
    </Text>
    
    <Text style={styles.instructionText}>
      For the best results, please ensure your leaf image has:
    </Text>
    
    <View style={styles.tipsList}>
      <View style={styles.tipItem}>
        <Icon name="check-circle" size={20} color={colors.success} />
        <Text style={styles.tipText}>💡 Good lighting and clear visibility</Text>
      </View>
      
      <View style={styles.tipItem}>
        <Icon name="check-circle" size={20} color={colors.success} />
        <Text style={styles.tipText}>📸 Leaf fills most of the image frame</Text>
      </View>
      
      <View style={styles.tipItem}>
        <Icon name="check-circle" size={20} color={colors.success} />
        <Text style={styles.tipText}>🌱 Minimal background distractions</Text>
      </View>
      
      <View style={styles.tipItem}>
        <Icon name="check-circle" size={20} color={colors.success} />
        <Text style={styles.tipText}>🔍 Leaf is in focus and not blurry</Text>
      </View>
    </View>
  </Animatable.View>

  {/* Supported Plants Preview */}
  <Animatable.View
    animation="fadeInUp"
    delay={600}
    duration={800}
    style={styles.plantsPreview}
  >
    <Text style={styles.previewTitle}>🌱 Detectable Plants</Text>
    
    <View style={styles.plantsRow}>
      <View style={styles.plantPreviewCard}>
        <View style={[styles.plantPreviewIcon, { backgroundColor: colors.baelGreen }]}>
          <Text style={styles.plantPreviewEmoji}>🍃</Text>
        </View>
        <Text style={styles.plantPreviewName}>Bael</Text>
      </View>
      
      <View style={styles.plantPreviewCard}>
        <View style={[styles.plantPreviewIcon, { backgroundColor: colors.betelGreen }]}>
          <Text style={styles.plantPreviewEmoji}>💚</Text>
        </View>
        <Text style={styles.plantPreviewName}>Betel</Text>
      </View>
      
      <View style={styles.plantPreviewCard}>
        <View style={[styles.plantPreviewIcon, { backgroundColor: colors.crownFlower }]}>
          <Text style={styles.plantPreviewEmoji}>🌸</Text>
        </View>
        <Text style={styles.plantPreviewName}>Crown Flower</Text>
      </View>
    </View>
  </Animatable.View>
      </View>

      {/* Bottom Action Buttons */}
      <Animatable.View
        animation="slideInUp"
        delay={900}
        duration={600}
        style={styles.bottomActions}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={styles.primaryActionButton}
              onPress={openCamera}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryVariant]}
                style={styles.actionButtonGradient}
              >
                <Icon name="camera-alt" size={24} color={colors.textOnPrimary} />
                <Text style={styles.primaryActionText}>Take Photo</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.secondaryActionButton}
              onPress={openImageLibrary}
              activeOpacity={0.8}
            >
              <Icon name="photo-library" size={24} color={colors.primary} />
              <Text style={styles.secondaryActionText}>Choose from Gallery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => navigation.navigate('PlantLibrary')}
              activeOpacity={0.8}
            >
              <Icon name="help-outline" size={20} color={colors.secondary} />
              <Text style={styles.helpButtonText}>Need help identifying plants?</Text>
            </TouchableOpacity>
          </>
        )}
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    elevation: 4,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    color: colors.textOnPrimary,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  instructionSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  instructionIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  instructionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  instructionText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  tipsList: {
    alignSelf: 'stretch',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  tipText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    flex: 1,
    lineHeight: 20,
  },
  plantsPreview: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  previewTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  plantsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  plantPreviewCard: {
    alignItems: 'center',
    flex: 1,
  },
  plantPreviewIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  plantPreviewEmoji: {
    fontSize: fontSize.lg,
  },
  plantPreviewName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  plantPreviewAccuracy: {
    fontSize: fontSize.xs,
    color: colors.success,
    fontWeight: fontWeight.semiBold,
  },
  bottomActions: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    elevation: 8,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  loadingText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  primaryActionButton: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  primaryActionText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.textOnPrimary,
    marginLeft: spacing.sm,
  },
  secondaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  secondaryActionText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  helpButtonText: {
    fontSize: fontSize.sm,
    color: colors.secondary,
    marginLeft: spacing.xs,
    textDecorationLine: 'underline',
  },
});

export default CameraScreen;