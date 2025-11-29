import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../theme/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(colors.primaryDark);
  }, []);

  const handleGetStarted = () => {
    navigation.navigate("CameraScreen")
  };

  const handleLearnMore = () => {
    navigation.navigate('PlantLibrary');
  };

  const plants = [
    {
      name: 'Bael',
      accuracy: '85%',
      description: 'Sacred leaves with trifoliate structure',
      color: colors.baelGreen,
      emoji: '🍃'
    },
    {
      name: 'Betel',
      accuracy: '90%',
      description: 'Heart-shaped aromatic leaves',
      color: colors.betelGreen,
      emoji: '💚'
    },
    {
      name: 'Crown Flower',
      accuracy: '90%',
      description: 'Large waxy leaves with white veins',
      color: colors.crownFlower,
      emoji: '🌸'
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
      
      {/* Header Section */}
      <LinearGradient
        colors={[colors.primary, colors.primaryVariant]}
        style={styles.headerGradient}
      >
        <Animatable.View 
          animation="fadeInDown" 
          duration={1000}
          style={styles.headerContent}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>🌿</Text>
            </View>
          </View>
          
          <Text style={styles.appTitle}>Plant Leaf Detector</Text>
          <Text style={styles.appSubtitle}>AI-Powered Plant Identification</Text>
          
          <View style={styles.featureHighlight}>
            <Text style={styles.highlightText}>
              Identify Bael, Betel & Crown Flower leaves with 85-90% accuracy
            </Text>
          </View>
        </Animatable.View>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Supported Plants */}
        <Animatable.View 
          animation="fadeInUp" 
          delay={300}
          duration={800}
          style={styles.featuresSection}
        >
          <Text style={styles.sectionTitle}>Supported Plants</Text>
          <Text style={styles.sectionSubtitle}>
            Our AI model can accurately identify these three medicinal plants
          </Text>
          
          <View style={styles.plantsGrid}>
            {plants.map((plant, index) => (
              <Animatable.View
                key={plant.name}
                animation="fadeInUp"
                delay={500 + (index * 200)}
                duration={600}
                style={styles.plantCard}
              >
                <View style={[styles.plantImageContainer, { backgroundColor: plant.color + '20' }]}>
                  <View style={[styles.plantImageCircle, { backgroundColor: plant.color }]}>
                    <Text style={styles.plantEmoji}>{plant.emoji}</Text>
                  </View>
                </View>
                
                <View style={styles.plantInfo}>
                  <Text style={styles.plantName}>{plant.name}</Text>
                  <Text style={styles.plantDescription}>{plant.description}</Text>
                  
                  <View style={styles.accuracyBadge}>
                    <Text style={styles.accuracyText}>Accuracy: {plant.accuracy}</Text>
                  </View>
                </View>
              </Animatable.View>
            ))}
          </View>
        </Animatable.View>

        {/* How it Works */}
        <Animatable.View 
          animation="fadeInUp" 
          delay={800}
          duration={800}
          style={styles.howItWorksSection}
        >
          <Text style={styles.sectionTitle}>How It Works</Text>
          
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View style={[styles.stepIcon, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepIconText}>📷</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>1. Capture or Upload</Text>
                <Text style={styles.stepDescription}>
                  Take a photo of the leaf or upload from your gallery
                </Text>
              </View>
            </View>
            
            <View style={styles.step}>
              <View style={[styles.stepIcon, { backgroundColor: colors.secondary }]}>
                <Text style={styles.stepIconText}>🤖</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>2. AI Analysis</Text>
                <Text style={styles.stepDescription}>
                  Our TensorFlow Lite model processes the image
                </Text>
              </View>
            </View>
            
            <View style={styles.step}>
              <View style={[styles.stepIcon, { backgroundColor: colors.accent }]}>
                <Text style={styles.stepIconText}>📊</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>3. Get Results</Text>
                <Text style={styles.stepDescription}>
                  Receive detailed plant information and confidence score
                </Text>
              </View>
            </View>
          </View>
        </Animatable.View>

        {/* Model Info */}
        <Animatable.View 
          animation="fadeInUp" 
          delay={1000}
          duration={800}
          style={styles.modelInfoSection}
        >
          <Text style={styles.sectionTitle}>About Our AI Model</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Model Type:</Text>
              <Text style={styles.infoValue}>TensorFlow Lite</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Input Size:</Text>
              <Text style={styles.infoValue}>224x224 pixels</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Classes:</Text>
              <Text style={styles.infoValue}>3 plant species</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Average Accuracy:</Text>
              <Text style={styles.infoValue}>88.3%</Text>
            </View>
          </View>
        </Animatable.View>

        {/* Action Buttons moved inside scrollable area */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryVariant]}
              style={styles.buttonGradient}
            >
              <Text style={styles.primaryButtonText}>Start Detection</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleLearnMore}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Learn About Plants</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  headerContent: { alignItems: 'center' },
  logoContainer: { marginBottom: spacing.md },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoText: { fontSize: fontSize.xxxl },
  appTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textOnPrimary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    color: colors.primaryLight,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  featureHighlight: {
    backgroundColor: colors.overlayLight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  highlightText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.primaryDark,
    textAlign: 'center',
  },
  scrollContainer: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 40, // prevents cutoff
  },
  featuresSection: { marginTop: spacing.xl },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  plantsGrid: { gap: spacing.md },
  plantCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  plantImageContainer: {
    marginRight: spacing.lg,
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  plantImageCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantEmoji: { fontSize: fontSize.xl },
  plantInfo: { flex: 1 },
  plantName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  plantDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  accuracyBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  accuracyText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.primaryDark,
  },
  howItWorksSection: { marginTop: spacing.xl },
  stepsContainer: { gap: spacing.lg },
  step: { flexDirection: 'row', alignItems: 'center' },
  stepIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  stepIconText: { fontSize: fontSize.lg },
  stepContent: { flex: 1 },
  stepTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  stepDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  modelInfoSection: { marginTop: spacing.xl, marginBottom: spacing.lg },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  infoLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  infoValue: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    fontWeight: fontWeight.semiBold,
  },
  bottomActions: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  primaryButton: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.textOnPrimary,
  },
  secondaryButton: {
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.primary,
  },
});

export default WelcomeScreen;
