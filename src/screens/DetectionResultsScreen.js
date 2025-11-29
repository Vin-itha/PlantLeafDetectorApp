// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   StatusBar,
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   Share,
// } from 'react-native';
// import { NativeModules } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { colors, spacing, borderRadius, fontSize, fontWeight } from '../theme/colors';
// import { getPlantById } from '../data/plantsData';

// const { PlantDetectionModule } = NativeModules;
// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// const DetectionResultsScreen = ({ route, navigation }) => {
//   const { imageUri, imagePath, fileName, fileSize } = route.params;
  
//   const [loading, setLoading] = useState(true);
//   const [detectionResults, setDetectionResults] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedTab, setSelectedTab] = useState('results'); // results, info, details

//   useEffect(() => {
//     StatusBar.setBarStyle('light-content');
//     StatusBar.setBackgroundColor(colors.primaryDark);
//     detectPlant();
//   }, []);

//   const detectPlant = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Simulate detection delay for user experience
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       if (PlantDetectionModule) {
//         const result = await PlantDetectionModule.detectPlant(imagePath);
        
//         if (result.success) {
//           setDetectionResults(result);
//         } else {
//           setError(result.error || 'Detection failed');
//         }
//       } else {
//         // Fallback mock data for development
//         const mockResult = generateMockResult();
//         setDetectionResults(mockResult);
//       }
//     } catch (err) {
//       console.error('Detection error:', err);
//       setError(err.message || 'An error occurred during detection');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateMockResult = () => {
//     // Mock data for development/testing
//     const plants = ['bael', 'betel', 'crown flower'];
//     const randomIndex = Math.floor(Math.random() * plants.length);
//     const detectedPlant = plants[randomIndex];
    
//     const predictions = plants.map((plant, index) => ({
//       label: plant,
//       displayName: plant.charAt(0).toUpperCase() + plant.slice(1).replace('_', ' '),
//       confidence: index === randomIndex ? 
//         Math.random() * 0.3 + 0.7 : // 70-100% for detected plant
//         Math.random() * 0.3 + 0.1   // 10-40% for others
//     }));

//     return {
//       success: true,
//       detectedPlant: detectedPlant.charAt(0).toUpperCase() + detectedPlant.slice(1).replace('_', ' '),
//       confidence: predictions[randomIndex].confidence,
//       predictedIndex: randomIndex,
//       predictions: predictions,
//       expectedAccuracy: randomIndex === 0 ? 85 : 90
//     };
//   };

//   const retryDetection = () => {
//     detectPlant();
//   };

//   const shareResults = async () => {
//     try {
//       const confidencePercent = Math.round((detectionResults?.confidence || 0) * 100);
//       const shareText = `Plant Leaf Detection Result:\n\nDetected: ${detectionResults?.detectedPlant || 'Unknown'}\nConfidence: ${confidencePercent}%\n\nIdentified using Plant Leaf Detector AI`;
      
//       await Share.share({
//         message: shareText,
//         title: 'Plant Detection Result',
//       });
//     } catch (error) {
//       console.error('Share error:', error);
//     }
//   };

//   const navigateToPlantDetails = (plantId) => {
//     navigation.navigate('PlantDetails', { plantId });
//   };

//   const getConfidenceColor = (confidence) => {
//     if (confidence >= 0.8) return colors.success;
//     if (confidence >= 0.6) return colors.warning;
//     return colors.error;
//   };

//   const getConfidenceText = (confidence) => {
//     if (confidence >= 0.8) return 'High Confidence';
//     if (confidence >= 0.6) return 'Medium Confidence';
//     return 'Low Confidence';
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
        
//         <LinearGradient
//           colors={[colors.primary, colors.primaryVariant]}
//           style={styles.header}
//         >
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}
//             activeOpacity={0.8}
//           >
//             <Icon name="arrow-back" size={24} color={colors.textOnPrimary} />
//           </TouchableOpacity>
          
//           <Text style={styles.headerTitle}>Analyzing...</Text>
          
//           <View style={styles.headerRight} />
//         </LinearGradient>
        
//         <View style={styles.loadingContainer}>
//           <Animatable.View
//             animation="pulse"
//             iterationCount="infinite"
//             style={styles.loadingImageContainer}
//           >
//             <Image source={{ uri: imageUri }} style={styles.loadingImage} />
//           </Animatable.View>
          
//           <ActivityIndicator 
//             size="large" 
//             color={colors.primary} 
//             style={styles.loadingSpinner}
//           />
          
//           <Text style={styles.loadingTitle}>Analyzing your leaf image...</Text>
//           <Text style={styles.loadingSubtitle}>
//             Our AI is processing the image to identify the plant species
//           </Text>
//         </View>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
        
//         <LinearGradient
//           colors={[colors.primary, colors.primaryVariant]}
//           style={styles.header}
//         >
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}
//             activeOpacity={0.8}
//           >
//             <Icon name="arrow-back" size={24} color={colors.textOnPrimary} />
//           </TouchableOpacity>
          
//           <Text style={styles.headerTitle}>Detection Failed</Text>
          
//           <View style={styles.headerRight} />
//         </LinearGradient>
        
//         <View style={styles.errorContainer}>
//           <Animatable.View
//             animation="fadeIn"
//             style={styles.errorContent}
//           >
//             <Icon name="error-outline" size={80} color={colors.error} />
            
//             <Text style={styles.errorTitle}>Detection Failed</Text>
//             <Text style={styles.errorMessage}>{error}</Text>
            
//             <TouchableOpacity
//               style={styles.retryButton}
//               onPress={retryDetection}
//               activeOpacity={0.8}
//             >
//               <LinearGradient
//                 colors={[colors.primary, colors.primaryVariant]}
//                 style={styles.retryButtonGradient}
//               >
//                 <Icon name="refresh" size={20} color={colors.textOnPrimary} />
//                 <Text style={styles.retryButtonText}>Try Again</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Animatable.View>
//         </View>
//       </View>
//     );
//   }

//   const plantData = detectionResults ? getPlantById(detectionResults.predictions[detectionResults.predictedIndex]?.label) : null;
//   const confidencePercent = Math.round((detectionResults?.confidence || 0) * 100);

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
      
//       {/* Header */}
//       <LinearGradient
//         colors={[colors.primary, colors.primaryVariant]}
//         style={styles.header}
//       >
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.8}
//         >
//           <Icon name="arrow-back" size={24} color={colors.textOnPrimary} />
//         </TouchableOpacity>
        
//         <Text style={styles.headerTitle}>Detection Results</Text>
        
//         <TouchableOpacity
//           style={styles.shareButton}
//           onPress={shareResults}
//           activeOpacity={0.8}
//         >
//           <Icon name="share" size={24} color={colors.textOnPrimary} />
//         </TouchableOpacity>
//       </LinearGradient>

//       <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//         {/* Image and Main Result */}
//         <Animatable.View
//           animation="fadeInUp"
//           delay={200}
//           style={styles.resultHeader}
//         >
//           <View style={styles.imageContainer}>
//             <Image source={{ uri: imageUri }} style={styles.resultImage} />
//             <View style={styles.confidenceBadge}>
//               <Text style={styles.confidenceText}>{confidencePercent}%</Text>
//             </View>
//           </View>
          
//           <View style={styles.mainResult}>
//             <Text style={styles.detectedPlantName}>
//               {detectionResults?.detectedPlant || 'Unknown'}
//             </Text>
            
//             <Text style={[
//               styles.confidenceStatus,
//               { color: getConfidenceColor(detectionResults?.confidence || 0) }
//             ]}>
//               {getConfidenceText(detectionResults?.confidence || 0)}
//             </Text>
            
//             {plantData && (
//               <Text style={styles.scientificName}>
//                 {plantData.scientificName}
//               </Text>
//             )}
//           </View>
//         </Animatable.View>

//         {/* Tab Navigation */}
//         <Animatable.View
//           animation="fadeInUp"
//           delay={400}
//           style={styles.tabContainer}
//         >
//           <TouchableOpacity
//             style={[styles.tab, selectedTab === 'results' && styles.activeTab]}
//             onPress={() => setSelectedTab('results')}
//             activeOpacity={0.8}
//           >
//             <Text style={[styles.tabText, selectedTab === 'results' && styles.activeTabText]}>
//               Results
//             </Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity
//             style={[styles.tab, selectedTab === 'info' && styles.activeTab]}
//             onPress={() => setSelectedTab('info')}
//             activeOpacity={0.8}
//           >
//             <Text style={[styles.tabText, selectedTab === 'info' && styles.activeTabText]}>
//               Plant Info
//             </Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity
//             style={[styles.tab, selectedTab === 'details' && styles.activeTab]}
//             onPress={() => setSelectedTab('details')}
//             activeOpacity={0.8}
//           >
//             <Text style={[styles.tabText, selectedTab === 'details' && styles.activeTabText]}>
//               Details
//             </Text>
//           </TouchableOpacity>
//         </Animatable.View>

//         {/* Tab Content */}
//         <Animatable.View
//           key={selectedTab}
//           animation="fadeIn"
//           style={styles.tabContent}
//         >
//           {selectedTab === 'results' && (
//             <View style={styles.resultsContent}>
//               <Text style={styles.sectionTitle}>All Predictions</Text>
              
//               {detectionResults?.predictions?.map((prediction, index) => (
//                 <View key={prediction.label} style={styles.predictionItem}>
//                   <View style={styles.predictionInfo}>
//                     <Text style={styles.predictionName}>
//                       {prediction.displayName}
//                     </Text>
//                     <Text style={styles.predictionConfidence}>
//                       {Math.round(prediction.confidence * 100)}%
//                     </Text>
//                   </View>
                  
//                   <View style={styles.progressBarContainer}>
//                     <View 
//                       style={[
//                         styles.progressBar,
//                         { 
//                           width: `${prediction.confidence * 100}%`,
//                           backgroundColor: index === detectionResults.predictedIndex ? 
//                             colors.primary : colors.borderLight
//                         }
//                       ]}
//                     />
//                   </View>
//                 </View>
//               ))}
              
//               <View style={styles.accuracyInfo}>
//                 <Text style={styles.accuracyTitle}>Model Accuracy</Text>
//                 <Text style={styles.accuracyText}>
//                   Expected accuracy for {detectionResults?.detectedPlant}: {detectionResults?.expectedAccuracy}%
//                 </Text>
//               </View>
//             </View>
//           )}

//           {selectedTab === 'info' && plantData && (
//             <View style={styles.infoContent}>
//               <Text style={styles.sectionTitle}>About {plantData.name}</Text>
              
//               <Text style={styles.plantDescription}>
//                 {plantData.description}
//               </Text>
              
//               <View style={styles.plantDetailsGrid}>
//                 <View style={styles.detailItem}>
//                   <Text style={styles.detailLabel}>Family:</Text>
//                   <Text style={styles.detailValue}>{plantData.family}</Text>
//                 </View>
                
//                 <View style={styles.detailItem}>
//                   <Text style={styles.detailLabel}>Common Names:</Text>
//                   <Text style={styles.detailValue}>
//                     {plantData.commonNames.join(', ')}
//                   </Text>
//                 </View>
                
//                 <View style={styles.detailItem}>
//                   <Text style={styles.detailLabel}>Conservation:</Text>
//                   <Text style={styles.detailValue}>
//                     {plantData.conservationStatus}
//                   </Text>
//                 </View>
//               </View>

//               <TouchableOpacity
//                 style={styles.learnMoreButton}
//                 onPress={() => navigateToPlantDetails(plantData.id)}
//                 activeOpacity={0.8}
//               >
//                 <Text style={styles.learnMoreText}>Learn More About This Plant</Text>
//                 <Icon name="arrow-forward" size={20} color={colors.primary} />
//               </TouchableOpacity>
//             </View>
//           )}

//           {selectedTab === 'details' && (
//             <View style={styles.detailsContent}>
//               <Text style={styles.sectionTitle}>Image Information</Text>
              
//               <View style={styles.imageDetails}>
//                 <View style={styles.imageDetailItem}>
//                   <Text style={styles.imageDetailLabel}>File Name:</Text>
//                   <Text style={styles.imageDetailValue}>{fileName}</Text>
//                 </View>
                
//                 <View style={styles.imageDetailItem}>
//                   <Text style={styles.imageDetailLabel}>File Size:</Text>
//                   <Text style={styles.imageDetailValue}>
//                     {fileSize ? `${Math.round(fileSize / 1024)} KB` : 'Unknown'}
//                   </Text>
//                 </View>
                
//                 <View style={styles.imageDetailItem}>
//                   <Text style={styles.imageDetailLabel}>Processing Time:</Text>
//                   <Text style={styles.imageDetailValue}>~1.5 seconds</Text>
//                 </View>
//               </View>
              
//               <Text style={styles.sectionTitle}>Model Information</Text>
              
//               <View style={styles.modelInfo}>
//                 <View style={styles.modelInfoItem}>
//                   <Text style={styles.modelInfoLabel}>Model Type:</Text>
//                   <Text style={styles.modelInfoValue}>TensorFlow Lite</Text>
//                 </View>
                
//                 <View style={styles.modelInfoItem}>
//                   <Text style={styles.modelInfoLabel}>Input Size:</Text>
//                   <Text style={styles.modelInfoValue}>224x224 pixels</Text>
//                 </View>
                
//                 <View style={styles.modelInfoItem}>
//                   <Text style={styles.modelInfoLabel}>Classes:</Text>
//                   <Text style={styles.modelInfoValue}>3 plant species</Text>
//                 </View>
//               </View>
//             </View>
//           )}
//         </Animatable.View>
//       </ScrollView>

//       {/* Bottom Actions */}
//       <View style={styles.bottomActions}>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('Camera')}
//           activeOpacity={0.8}
//         >
//           <Icon name="camera-alt" size={20} color={colors.primary} />
//           <Text style={styles.actionButtonText}>Detect Another</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('PlantLibrary')}
//           activeOpacity={0.8}
//         >
//           <Icon name="library-books" size={20} color={colors.primary} />
//           <Text style={styles.actionButtonText}>Plant Library</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingTop: 50,
//     paddingBottom: spacing.lg,
//     paddingHorizontal: spacing.lg,
//     elevation: 4,
//     shadowColor: colors.shadowDark,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   backButton: {
//     padding: spacing.sm,
//     borderRadius: borderRadius.round,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   headerTitle: {
//     fontSize: fontSize.xl,
//     fontWeight: fontWeight.semiBold,
//     color: colors.textOnPrimary,
//   },
//   shareButton: {
//     padding: spacing.sm,
//     borderRadius: borderRadius.round,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   headerRight: {
//     width: 40,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: spacing.lg,
//   },
//   loadingImageContainer: {
//     marginBottom: spacing.xl,
//   },
//   loadingImage: {
//     width: 200,
//     height: 200,
//     borderRadius: borderRadius.lg,
//   },
//   loadingSpinner: {
//     marginBottom: spacing.lg,
//   },
//   loadingTitle: {
//     fontSize: fontSize.xl,
//     fontWeight: fontWeight.semiBold,
//     color: colors.textPrimary,
//     textAlign: 'center',
//     marginBottom: spacing.sm,
//   },
//   loadingSubtitle: {
//     fontSize: fontSize.md,
//     color: colors.textSecondary,
//     textAlign: 'center',
//     lineHeight: 24,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: spacing.lg,
//   },
//   errorContent: {
//     alignItems: 'center',
//   },
//   errorTitle: {
//     fontSize: fontSize.xl,
//     fontWeight: fontWeight.semiBold,
//     color: colors.textPrimary,
//     marginTop: spacing.lg,
//     marginBottom: spacing.sm,
//   },
//   errorMessage: {
//     fontSize: fontSize.md,
//     color: colors.textSecondary,
//     textAlign: 'center',
//     marginBottom: spacing.xl,
//     lineHeight: 24,
//   },
//   retryButton: {
//     borderRadius: borderRadius.lg,
//     overflow: 'hidden',
//   },
//   retryButtonGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: spacing.lg,
//     paddingHorizontal: spacing.xl,
//   },
//   retryButtonText: {
//     fontSize: fontSize.lg,
//     fontWeight: fontWeight.semiBold,
//     color: colors.textOnPrimary,
//     marginLeft: spacing.sm,
//   },
//   scrollContainer: {
//     flex: 1,
//   },
//   resultHeader: {
//     alignItems: 'center',
//     paddingVertical: spacing.xl,
//     paddingHorizontal: spacing.lg,
//   },
//   imageContainer: {
//     position: 'relative',
//     marginBottom: spacing.lg,
//   },
//   resultImage: {
//     width: 250,
//     height: 250,
//     borderRadius: borderRadius.lg,
//     elevation: 4,
//     shadowColor: colors.shadowDark,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   confidenceBadge: {
//     position: 'absolute',
//     top: spacing.sm,
//     right: spacing.sm,
//     backgroundColor: colors.primary,
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.sm,
//     borderRadius: borderRadius.lg,
//   },
//   confidenceText: {
//     fontSize: fontSize.sm,
//     fontWeight: fontWeight.semiBold,
//     color: colors.textOnPrimary,
//   },
//   mainResult: {
//     alignItems: 'center',
//   },
//   detectedPlantName: {
//     fontSize: fontSize.xxl,
//     fontWeight: fontWeight.bold,
//     color: colors.textPrimary,
//     marginBottom: spacing.xs,
//     textAlign: 'center',
//   },
//   confidenceStatus: {
//     fontSize: fontSize.lg,
//     fontWeight: fontWeight.medium,
//     marginBottom: spacing.sm,
//   },
//   scientificName: {
//     fontSize: fontSize.md,
//     fontStyle: 'italic',
//     color: colors.textSecondary,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: colors.surface,
//     marginHorizontal: spacing.lg,
//     borderRadius: borderRadius.lg,
//     padding: spacing.xs,
//     elevation: 2,
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: spacing.md,
//     paddingHorizontal: spacing.sm,
//     alignItems: 'center',
//     borderRadius: borderRadius.md,
//   },
//   activeTab: {
//     backgroundColor: colors.primary,
//   },
//   tabText: {
//     fontSize: fontSize.sm,
//     fontWeight: fontWeight.medium,
//     color: colors.textSecondary,
//   },
//   activeTabText: {
//     color: colors.textOnPrimary,
//     fontWeight: fontWeight.semiBold,
//   },
//   tabContent: {
//     paddingHorizontal: spacing.lg,
//     paddingVertical: spacing.lg,
//   },
//   sectionTitle: {
//     fontSize: fontSize.lg,
//     fontWeight: fontWeight.semiBold,
//     color: colors.textPrimary,
//     marginBottom: spacing.lg,
//   },
//   resultsContent: {},
//   predictionItem: {
//     backgroundColor: colors.surface,
//     borderRadius: borderRadius.md,
//     padding: spacing.lg,
//     marginBottom: spacing.md,
//     elevation: 1,
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 1,
//   },
//   predictionInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: spacing.sm,
//   },
//   predictionName: {
//     fontSize: fontSize.md,
//     fontWeight: fontWeight.medium,
//     color: colors.textPrimary,
//   },
//   predictionConfidence: {
//     fontSize: fontSize.md,
//     fontWeight: fontWeight.semiBold,
//     color: colors.primary,
//   },
//   progressBarContainer: {
//     height: 4,
//     backgroundColor: colors.borderLight,
//     borderRadius: 2,
//     overflow: 'hidden',
//   },
//   progressBar: {
//     height: '100%',
//     borderRadius: 2,
//   },
//   accuracyInfo: {
//     backgroundColor: colors.primaryLight,
//     borderRadius: borderRadius.md,
//     padding: spacing.lg,
//     marginTop: spacing.lg,
//   },
//   accuracyTitle: {
//     fontSize: fontSize.md,
//     fontWeight: fontWeight.semiBold,
//     color: colors.primaryDark,
//     marginBottom: spacing.xs,
//   },
//   accuracyText: {
//     fontSize: fontSize.sm,
//     color: colors.primaryDark,
//   },
//   infoContent: {},
//   plantDescription: {
//     fontSize: fontSize.md,
//     color: colors.textSecondary,
//     lineHeight: 24,
//     marginBottom: spacing.lg,
//   },
//   plantDetailsGrid: {
//     backgroundColor: colors.surface,
//     borderRadius: borderRadius.lg,
//     padding: spacing.lg,
//     marginBottom: spacing.lg,
//   },
//   detailItem: {
//     marginBottom: spacing.md,
//   },
//   detailLabel: {
//     fontSize: fontSize.sm,
//     fontWeight: fontWeight.semiBold,
//     color: colors.textSecondary,
//     marginBottom: spacing.xs,
//   },
//   detailValue: {
//     fontSize: fontSize.md,
//     color: colors.textPrimary,
//     lineHeight: 22,
//   },
//   learnMoreButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.primaryLight,
//     borderRadius: borderRadius.lg,
//     paddingVertical: spacing.lg,
//     paddingHorizontal: spacing.xl,
//   },
//   learnMoreText: {
//     fontSize: fontSize.md,
//     fontWeight: fontWeight.medium,
//     color: colors.primary,
//     marginRight: spacing.sm,
//   },
//   detailsContent: {},
//   imageDetails: {
//     backgroundColor: colors.surface,
//     borderRadius: borderRadius.lg,
//     padding: spacing.lg,
//     marginBottom: spacing.lg,
//   },
//   imageDetailItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: spacing.sm,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.borderLight,
//   },
//   imageDetailLabel: {
//     fontSize: fontSize.sm,
//     color: colors.textSecondary,
//     fontWeight: fontWeight.medium,
//   },
//   imageDetailValue: {
//     fontSize: fontSize.sm,
//     color: colors.textPrimary,
//     fontWeight: fontWeight.medium,
//   },
//   modelInfo: {
//     backgroundColor: colors.surface,
//     borderRadius: borderRadius.lg,
//     padding: spacing.lg,
//   },
//   modelInfoItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: spacing.sm,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.borderLight,
//   },
//   modelInfoLabel: {
//     fontSize: fontSize.sm,
//     color: colors.textSecondary,
//     fontWeight: fontWeight.medium,
//   },
//   modelInfoValue: {
//     fontSize: fontSize.sm,
//     color: colors.textPrimary,
//     fontWeight: fontWeight.medium,
//   },
//   bottomActions: {
//     flexDirection: 'row',
//     backgroundColor: colors.surface,
//     paddingHorizontal: spacing.lg,
//     paddingVertical: spacing.lg,
//     borderTopWidth: 1,
//     borderTopColor: colors.borderLight,
//     elevation: 8,
//     shadowColor: colors.shadowDark,
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   actionButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: spacing.lg,
//     marginHorizontal: spacing.sm,
//     backgroundColor: colors.primaryLight,
//     borderRadius: borderRadius.lg,
//   },
//   actionButtonText: {
//     fontSize: fontSize.md,
//     fontWeight: fontWeight.medium,
//     color: colors.primary,
//     marginLeft: spacing.sm,
//   },
// });

// export default DetectionResultsScreen;



























//src/screens/DetectionResultsScreen.js
//This implementation follows the original (commented) structure you had,
//but with the navigation names and a few small robustness fixes.

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   StatusBar,
//   ActivityIndicator,
//   Dimensions,
//   Share,
// } from "react-native";
// import { NativeModules } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import * as Animatable from "react-native-animatable";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { colors, spacing, borderRadius, fontSize, fontWeight } from "../theme/colors";
// import { getPlantById } from "../data/plantsData";

// const { PlantDetectionModule } = NativeModules || {};
// const { width: screenWidth } = Dimensions.get("window");

// const DetectionResultsScreen = ({ route, navigation }) => {
//   // Expect route.params to include imageUri, imagePath, fileName, fileSize
//   const { imageUri, imagePath, fileName, fileSize } = route.params || {};

//   const [loading, setLoading] = useState(true);
//   const [detectionResults, setDetectionResults] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedTab, setSelectedTab] = useState("results"); // 'results' | 'info' | 'details'

//   useEffect(() => {
//     StatusBar.setBarStyle("light-content");
//     StatusBar.setBackgroundColor(colors.primaryDark);
//     // If caller already passed detection results in route.params, use them
//     if (route.params?.detectionResults || route.params?.prediction) {
//       const incoming = route.params.detectionResults || route.params.prediction;
//       setDetectionResults(incoming);
//       setLoading(false);
//       return;
//     }
//     // Otherwise run detection here (older flow)
//     detectPlant();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const detectPlant = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // small UX delay
//       await new Promise((res) => setTimeout(res, 1000));

//       if (PlantDetectionModule && typeof PlantDetectionModule.detectPlant === "function") {
//         // native detection expected to return an object like your original code:
//         // { success: true, detectedPlant: 'Crown Flower', confidence: 0.9, predictions: [...], predictedIndex: 0, expectedAccuracy: 90 }
//         const result = await PlantDetectionModule.detectPlant(imagePath);
//         if (result && result.success) {
//           // some native modules may return result.payload or similar — adapt if needed
//           setDetectionResults(result);
//         } else if (result && !result.success && result.predictions) {
//           // sometimes module returns predictions without success flag
//           setDetectionResults(result);
//         } else {
//           setError(result?.error || "Detection failed");
//         }
//       } else {
//         // fallback/mock for dev
//         const mock = generateMockResult();
//         setDetectionResults(mock);
//       }
//     } catch (err) {
//       console.error("Detection error:", err);
//       setError(err?.message || "An error occurred during detection");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mock generator (keeps the same shape your app expects)
//   const generateMockResult = () => {
//     const plants = ["bael", "betel", "crown_flower"];
//     const randomIndex = Math.floor(Math.random() * plants.length);
//     const detectedPlantKey = plants[randomIndex];
//     const predictions = plants.map((plant, index) => ({
//       label: plant,
//       displayName: plant
//         .replace(/_/g, " ")
//         .split(" ")
//         .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//         .join(" "),
//       confidence:
//         index === randomIndex ? Math.random() * 0.25 + 0.75 : Math.random() * 0.4 + 0.05,
//     }));

//     return {
//       success: true,
//       detectedPlant: predictions[randomIndex].displayName,
//       confidence: predictions[randomIndex].confidence,
//       predictedIndex: randomIndex,
//       predictions,
//       expectedAccuracy:
//         detectedPlantKey === "bael" ? 85 : detectedPlantKey === "betel" ? 90 : 90,
//     };
//   };

//   const retryDetection = () => detectPlant();

//   const shareResults = async () => {
//     try {
//       const confidencePercent = Math.round((detectionResults?.confidence || 0) * 100);
//       const shareText = `Plant Leaf Detection Result:\n\nDetected: ${
//         detectionResults?.detectedPlant || "Unknown"
//       }\nConfidence: ${confidencePercent}%\n\nIdentified using Plant Leaf Detector AI`;

//       await Share.share({
//         message: shareText,
//         title: "Plant Detection Result",
//       });
//     } catch (err) {
//       console.error("Share error:", err);
//     }
//   };

//   // Navigation to Plant Detail screen (use the name registered in App.js)
//   const navigateToPlantDetails = (plantId) => {
//     if (!plantId) return;
//     navigation.navigate("PlantDetailScreen", { plantId });
//   };

//   // helper to map confidence to color/text
//   const getConfidenceColor = (confidence) => {
//     if (confidence >= 0.8) return colors.success;
//     if (confidence >= 0.6) return colors.warning;
//     return colors.error;
//   };
//   const getConfidenceText = (confidence) => {
//     if (confidence >= 0.8) return "High Confidence";
//     if (confidence >= 0.6) return "Medium Confidence";
//     return "Low Confidence";
//   };

//   // If still loading, show the analyzing screen
//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
//         <LinearGradient colors={[colors.primary, colors.primaryVariant]} style={styles.header}>
//           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//             <Icon name="arrow-back" size={24} color={colors.textOnPrimary} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Analyzing...</Text>
//           <View style={styles.headerRight} />
//         </LinearGradient>

//         <View style={styles.loadingContainer}>
//           <Animatable.View animation="pulse" iterationCount="infinite" style={styles.loadingImageContainer}>
//             {imageUri ? (
//               <Image source={{ uri: imageUri }} style={styles.loadingImage} />
//             ) : (
//               <View style={[styles.loadingImage, { backgroundColor: "#eee" }]} />
//             )}
//           </Animatable.View>

//           <ActivityIndicator size="large" color={colors.primary} style={styles.loadingSpinner} />

//           <Text style={styles.loadingTitle}>Analyzing your leaf image...</Text>
//           <Text style={styles.loadingSubtitle}>
//             Our AI is processing the image to identify the plant species
//           </Text>
//         </View>
//       </View>
//     );
//   }

//   // Error UI
//   if (error) {
//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
//         <LinearGradient colors={[colors.primary, colors.primaryVariant]} style={styles.header}>
//           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//             <Icon name="arrow-back" size={24} color={colors.textOnPrimary} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Detection Failed</Text>
//           <View style={styles.headerRight} />
//         </LinearGradient>

//         <View style={styles.errorContainer}>
//           <Animatable.View animation="fadeIn" style={styles.errorContent}>
//             <Icon name="error-outline" size={80} color={colors.error} />
//             <Text style={styles.errorTitle}>Detection Failed</Text>
//             <Text style={styles.errorMessage}>{error}</Text>

//             <TouchableOpacity style={styles.retryButton} onPress={retryDetection}>
//               <LinearGradient colors={[colors.primary, colors.primaryVariant]} style={styles.retryButtonGradient}>
//                 <Icon name="refresh" size={20} color={colors.textOnPrimary} />
//                 <Text style={styles.retryButtonText}>Try Again</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Animatable.View>
//         </View>
//       </View>
//     );
//   }

//   // At this point detectionResults exists (either from route.params or detectPlant)
//   // Ensure shape is normalized: if caller passed a simple prediction object, wrap it
//   const normalizedResults = (() => {
//     const r = detectionResults || route.params?.detectionResults || route.params?.prediction;
//     if (!r) return null;

//     // If the native/route provided a 'success' wrapper, keep it
//     if (r.predictions && Array.isArray(r.predictions)) return r;

//     // If r is an array of predictions:
//     if (Array.isArray(r)) {
//       return {
//         success: true,
//         predictions: r,
//         predictedIndex: 0,
//         confidence: r[0]?.confidence ?? r[0]?.score ?? null,
//         detectedPlant:
//           r[0]?.displayName ?? r[0]?.label ?? (typeof r[0] === "string" ? r[0] : "Unknown"),
//       };
//     }

//     // If r is a single prediction object
//     if (typeof r === "object" && (r.label || r.class || r.confidence)) {
//       return {
//         success: true,
//         predictions: [r],
//         predictedIndex: 0,
//         confidence: r.confidence ?? r.score ?? null,
//         detectedPlant: r.displayName ?? r.label ?? r.class ?? "Unknown",
//       };
//     }

//     return r;
//   })();

//   const res = normalizedResults || {};
//   const plantData = res ? getPlantById(res.predictions?.[res.predictedIndex]?.label) : null;
//   const confidencePercent = Math.round((res?.confidence || 0) * 100);

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

//       {/* Header */}
//       <LinearGradient colors={[colors.primary, colors.primaryVariant]} style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color={colors.textOnPrimary} />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Detection Results</Text>

//         <TouchableOpacity style={styles.shareButton} onPress={shareResults}>
//           <Icon name="share" size={24} color={colors.textOnPrimary} />
//         </TouchableOpacity>
//       </LinearGradient>

//       {/* <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}> */}
//       <ScrollView
//       style={styles.scrollContainer}
//       contentContainerStyle={{ paddingBottom: 140 }}
//       showsVerticalScrollIndicator={false}
//       >

//         {/* Image and Main Result */}
//         <Animatable.View animation="fadeInUp" delay={200} style={styles.resultHeader}>
//           <View style={styles.imageContainer}>
//             {imageUri ? (
//               <Image source={{ uri: imageUri }} style={styles.resultImage} />
//             ) : (
//               <View style={[styles.resultImage, { backgroundColor: "#eee" }]} />
//             )}
//             <View style={styles.confidenceBadge}>
//               <Text style={styles.confidenceText}>{confidencePercent}%</Text>
//             </View>
//           </View>

//           <View style={styles.mainResult}>
//             <Text style={styles.detectedPlantName}>
//               {res?.detectedPlant ?? "Unknown"}
//             </Text>

//             <Text
//               style={[
//                 styles.confidenceStatus,
//                 { color: getConfidenceColor(res?.confidence ?? 0) },
//               ]}
//             >
//               {getConfidenceText(res?.confidence ?? 0)}
//             </Text>

//             {plantData && <Text style={styles.scientificName}>{plantData.scientificName}</Text>}
//           </View>
//         </Animatable.View>

//         {/* Tab Navigation */}
//         <Animatable.View animation="fadeInUp" delay={400} style={styles.tabContainer}>
//           <TouchableOpacity
//             style={[styles.tab, selectedTab === "results" && styles.activeTab]}
//             onPress={() => setSelectedTab("results")}
//           >
//             <Text style={[styles.tabText, selectedTab === "results" && styles.activeTabText]}>Results</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.tab, selectedTab === "info" && styles.activeTab]}
//             onPress={() => setSelectedTab("info")}
//           >
//             <Text style={[styles.tabText, selectedTab === "info" && styles.activeTabText]}>
//               Plant Info
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.tab, selectedTab === "details" && styles.activeTab]}
//             onPress={() => setSelectedTab("details")}
//           >
//             <Text style={[styles.tabText, selectedTab === "details" && styles.activeTabText]}>
//               Details
//             </Text>
//           </TouchableOpacity>
//         </Animatable.View>

//         {/* Tab Content */}
//         <Animatable.View key={selectedTab} animation="fadeIn" style={styles.tabContent}>
//           {selectedTab === "results" && (
//             <View style={styles.resultsContent}>
//               <Text style={styles.sectionTitle}>All Predictions</Text>

//               {(res?.predictions || []).map((prediction, index) => {
//                 const displayName =
//                   prediction.displayName ||
//                   (prediction.label ? prediction.label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : prediction.label);
//                 const conf = prediction.confidence ?? prediction.score ?? 0;
//                 return (
//                   <View key={`${prediction.label || index}`} style={styles.predictionItem}>
//                     <View style={styles.predictionInfo}>
//                       <Text style={styles.predictionName}>{displayName}</Text>
//                       <Text style={styles.predictionConfidence}>{Math.round(conf * 100)}%</Text>
//                     </View>

//                     <View style={styles.progressBarContainer}>
//                       <View
//                         style={[
//                           styles.progressBar,
//                           {
//                             width: `${(conf || 0) * 100}%`,
//                             backgroundColor:
//                               index === (res.predictedIndex ?? 0) ? colors.primary : colors.borderLight,
//                           },
//                         ]}
//                       />
//                     </View>
//                   </View>
//                 );
//               })}

//               {/* <View style={styles.accuracyInfo}>
//                 <Text style={styles.accuracyTitle}>Model Accuracy</Text>
//                 <Text style={styles.accuracyText}>
//                   Expected accuracy for {res?.detectedPlant ?? "this plant"}: {res?.expectedAccuracy ?? "—"}% 
//                   Expected accuracy for {plantData?.name}: {plantData?.accuracy ?? "—"}
//                 </Text>
//               </View> */}
//             </View>
//           )}

//           {selectedTab === "info" && plantData && (
//             <View style={{ flex: 1 }}>
//               <ScrollView
//               contentContainerStyle={{ paddingBottom: 24 }}
//               showsVerticalScrollIndicator={false}
//               >
//               <View style={styles.infoContent}>
//               <Text style={styles.sectionTitle}>About {plantData.name}</Text>
//               <Text style={styles.plantDescription}>{plantData.description}</Text>
//               <View style={styles.plantDetailsGrid}>
//               <View style={styles.detailItem}>
//               <Text style={styles.detailLabel}>Scientific Name:</Text>
//               <Text style={styles.detailValue}>{plantData.scientific ?? '-'}</Text>
//             </View>
//             <View style={styles.detailItem}>
//               <Text style={styles.detailLabel}>Typical Accuracy:</Text>
//               <Text style={styles.detailValue}>{plantData.accuracy ?? "—"}</Text>
//             </View>
//             {/* add any other detail rows you need here */}
//             </View>

//         {/* Render other fields: leaves, uses, warnings, etc. */}
//         {plantData.leaves && (
//           <View style={{ marginTop: 8 }}>
//             <Text style={styles.subTitle}>Leaves</Text>
//             {plantData.leaves.characteristics && (
//               <Text style={styles.paragraph}>• {plantData.leaves.characteristics.join("\n• ")}</Text>
//             )}
//             {plantData.leaves.identification && <Text style={styles.paragraph}>{plantData.leaves.identification}</Text>}
//           </View>
//         )}

//         {/* ensure final spacing so content doesn't butt against bottom */}
//         <View style={{ height: 36 }} />
//       </View>
//     </ScrollView>
//   </View>
// )}


//           {selectedTab === "details" && (
//             <View style={styles.detailsContent}>
//               <Text style={styles.sectionTitle}>Image Information</Text>

//               <View style={styles.imageDetails}>
//                 <View style={styles.imageDetailItem}>
//                   <Text style={styles.imageDetailLabel}>File Name:</Text>
//                   <Text style={styles.imageDetailValue}>{fileName ?? "Unknown"}</Text>
//                 </View>

//                 <View style={styles.imageDetailItem}>
//                   <Text style={styles.imageDetailLabel}>File Size:</Text>
//                   <Text style={styles.imageDetailValue}>
//                     {fileSize ? `${Math.round(fileSize / 1024)} KB` : "Unknown"}
//                   </Text>
//                 </View>

//                 <View style={styles.imageDetailItem}>
//                   <Text style={styles.imageDetailLabel}>Processing Time:</Text>
//                   <Text style={styles.imageDetailValue}>~1.5 seconds</Text>
//                 </View>
//               </View>

//               <Text style={styles.sectionTitle}>Model Information</Text>

//               <View style={styles.modelInfo}>
//                 <View style={styles.modelInfoItem}>
//                   <Text style={styles.modelInfoLabel}>Model Type:</Text>
//                   <Text style={styles.modelInfoValue}>TensorFlow Lite</Text>
//                 </View>

//                 <View style={styles.modelInfoItem}>
//                   <Text style={styles.modelInfoLabel}>Input Size:</Text>
//                   <Text style={styles.modelInfoValue}>224x224 pixels</Text>
//                 </View>

//                 <View style={styles.modelInfoItem}>
//                   <Text style={styles.modelInfoLabel}>Classes:</Text>
//                   <Text style={styles.modelInfoValue}>3 plant species</Text>
//                 </View>
//               </View>
//             </View>
//           )}
//         </Animatable.View>
//       </ScrollView>

//       {/* Bottom Actions */}
//       <View style={styles.bottomActions}>
//         <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("CameraScreen")}>
//           <Icon name="camera-alt" size={20} color={colors.primary} />
//           <Text style={styles.actionButtonText}>Detect Another</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default DetectionResultsScreen;

// /* --- Styles --- */
// /* These are largely re-used from your commented code. If you have
//    a shared theme (spacing, fontSize), these use those constants. */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingTop: 50,
//     paddingBottom: spacing.lg,
//     paddingHorizontal: spacing.lg,
//     elevation: 4,
//     shadowColor: colors.shadowDark,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   backButton: {
//     padding: spacing.sm,
//     borderRadius: borderRadius.round,
//     backgroundColor: "rgba(255,255,255,0.18)",
//   },
//   headerTitle: {
//     fontSize: fontSize.xl,
//     fontWeight: fontWeight.semiBold,
//     color: colors.textOnPrimary,
//   },
//   shareButton: {
//     padding: spacing.sm,
//     borderRadius: borderRadius.round,
//     backgroundColor: "rgba(255,255,255,0.18)",
//   },
//   headerRight: { width: 40 },

//   loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: spacing.lg },
//   loadingImageContainer: { marginBottom: spacing.xl },
//   loadingImage: { width: 200, height: 200, borderRadius: borderRadius.lg },
//   loadingSpinner: { marginBottom: spacing.lg },
//   loadingTitle: { fontSize: fontSize.xl, fontWeight: fontWeight.semiBold, color: colors.textPrimary, textAlign: "center", marginBottom: spacing.sm },
//   loadingSubtitle: { fontSize: fontSize.md, color: colors.textSecondary, textAlign: "center", lineHeight: 24 },

//   errorContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: spacing.lg },
//   errorContent: { alignItems: "center" },
//   errorTitle: { fontSize: fontSize.xl, fontWeight: fontWeight.semiBold, color: colors.textPrimary, marginTop: spacing.lg, marginBottom: spacing.sm },
//   errorMessage: { fontSize: fontSize.md, color: colors.textSecondary, textAlign: "center", marginBottom: spacing.xl, lineHeight: 24 },

//   retryButton: { borderRadius: borderRadius.lg, overflow: "hidden" },
//   retryButtonGradient: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.lg, paddingHorizontal: spacing.xl },
//   retryButtonText: { fontSize: fontSize.lg, fontWeight: fontWeight.semiBold, color: colors.textOnPrimary, marginLeft: spacing.sm },

//   scrollContainer: { flex: 1 },

//   resultHeader: { alignItems: "center", paddingVertical: spacing.xl, paddingHorizontal: spacing.lg },
//   imageContainer: { position: "relative", marginBottom: spacing.lg },
//   resultImage: { width: Math.min(screenWidth - 40, 320), height: Math.min(screenWidth - 40, 320), borderRadius: borderRadius.lg, elevation: 4 },
//   confidenceBadge: { position: "absolute", top: spacing.sm, right: spacing.sm, backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.lg },
//   confidenceText: { fontSize: fontSize.sm, fontWeight: fontWeight.semiBold, color: colors.textOnPrimary },

//   mainResult: { alignItems: "center" },
//   detectedPlantName: { fontSize: fontSize.xxl, fontWeight: fontWeight.bold, color: colors.textPrimary, marginBottom: spacing.xs, textAlign: "center" },
//   confidenceStatus: { fontSize: fontSize.lg, fontWeight: fontWeight.medium, marginBottom: spacing.sm },
//   scientificName: { fontSize: fontSize.md, fontStyle: "italic", color: colors.textSecondary },

//   tabContainer: { flexDirection: "row", backgroundColor: colors.surface, marginHorizontal: spacing.lg, borderRadius: borderRadius.lg, padding: spacing.xs, elevation: 2, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
//   tab: { flex: 1, paddingVertical: spacing.md, paddingHorizontal: spacing.sm, alignItems: "center", borderRadius: borderRadius.md },
//   activeTab: { backgroundColor: colors.primary },
//   tabText: { fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: colors.textSecondary },
//   activeTabText: { color: colors.textOnPrimary, fontWeight: fontWeight.semiBold },

//   tabContent: { paddingHorizontal: spacing.lg, paddingVertical: spacing.lg },

//   sectionTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.semiBold, color: colors.textPrimary, marginBottom: spacing.lg },
//   resultsContent: {},

//   predictionItem: { backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.lg, marginBottom: spacing.md, elevation: 1 },
//   predictionInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
//   predictionName: { fontSize: fontSize.md, fontWeight: fontWeight.medium, color: colors.textPrimary },
//   predictionConfidence: { fontSize: fontSize.md, fontWeight: fontWeight.semiBold, color: colors.primary },

//   progressBarContainer: { height: 4, backgroundColor: colors.borderLight, borderRadius: 2, overflow: "hidden" },
//   progressBar: { height: "100%", borderRadius: 2 },

//   accuracyInfo: { backgroundColor: colors.primaryLight, borderRadius: borderRadius.md, padding: spacing.lg, marginTop: spacing.lg },
//   accuracyTitle: { fontSize: fontSize.md, fontWeight: fontWeight.semiBold, color: colors.primaryDark, marginBottom: spacing.xs },
//   accuracyText: { fontSize: fontSize.sm, color: colors.primaryDark },

//   infoContent: {},
//   plantDescription: { fontSize: fontSize.md, color: colors.textSecondary, lineHeight: 24, marginBottom: spacing.lg },
//   plantDetailsGrid: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg },

//   detailItem: { marginBottom: spacing.md },
//   detailLabel: { fontSize: fontSize.sm, fontWeight: fontWeight.semiBold, color: colors.textSecondary, marginBottom: spacing.xs },
//   detailValue: { fontSize: fontSize.md, color: colors.textPrimary, lineHeight: 22 },

//   learnMoreButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryLight, borderRadius: borderRadius.lg, paddingVertical: spacing.lg, paddingHorizontal: spacing.xl },
//   learnMoreText: { fontSize: fontSize.md, fontWeight: fontWeight.medium, color: colors.primary, marginRight: spacing.sm },

//   detailsContent: {},
//   imageDetails: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg },
//   imageDetailItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
//   imageDetailLabel: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: fontWeight.medium },
//   imageDetailValue: { fontSize: fontSize.sm, color: colors.textPrimary, fontWeight: fontWeight.medium },

//   modelInfo: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.lg },
//   modelInfoItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
//   modelInfoLabel: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: fontWeight.medium },
//   modelInfoValue: { fontSize: fontSize.sm, color: colors.textPrimary, fontWeight: fontWeight.medium },

//   bottomActions: { flexDirection: "row", backgroundColor: colors.surface, paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, borderTopWidth: 1, borderTopColor: colors.borderLight, elevation: 8 },
//   actionButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: spacing.lg, marginHorizontal: spacing.sm, backgroundColor: colors.primaryLight, borderRadius: borderRadius.lg },
//   actionButtonText: { fontSize: fontSize.md, fontWeight: fontWeight.medium, color: colors.primary, marginLeft: spacing.sm },
// });














// src/screens/DetectionResultsScreen.js
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   StatusBar,
//   ActivityIndicator,
//   Dimensions,
//   Share,
// } from "react-native";
// import { NativeModules } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import * as Animatable from "react-native-animatable";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { colors, spacing, borderRadius, fontSize, fontWeight } from "../theme/colors";
// import { getPlantById } from "../data/plantsData";

// const { PlantDetectionModule } = NativeModules || {};
// const { width: screenWidth } = Dimensions.get("window");

// const DetectionResultsScreen = ({ route, navigation }) => {
//   // Expect route.params to include imageUri, imagePath, fileName, fileSize
//   const { imageUri, imagePath, fileName, fileSize } = route.params || {};

//   const [loading, setLoading] = useState(true);
//   const [detectionResults, setDetectionResults] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedTab, setSelectedTab] = useState("results"); // 'results' | 'info' | 'details'

//   useEffect(() => {
//     StatusBar.setBarStyle("light-content");
//     StatusBar.setBackgroundColor(colors.primaryDark);
//     // If caller already passed detection results in route.params, use them
//     if (route.params?.detectionResults || route.params?.prediction) {
//       const incoming = route.params.detectionResults || route.params.prediction;
//       setDetectionResults(incoming);
//       setLoading(false);
//       return;
//     }
//     // Otherwise run detection here (older flow)
//     detectPlant();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const detectPlant = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // small UX delay
//       await new Promise((res) => setTimeout(res, 1000));

//       if (PlantDetectionModule && typeof PlantDetectionModule.detectPlant === "function") {
//         // native detection expected to return an object like your original code:
//         // { success: true, detectedPlant: 'Crown Flower', confidence: 0.9, predictions: [...], predictedIndex: 0, expectedAccuracy: 90 }
//         const result = await PlantDetectionModule.detectPlant(imagePath);
//         if (result && result.success) {
//           // some native modules may return result.payload or similar — adapt if needed
//           setDetectionResults(result);
//         } else if (result && !result.success && result.predictions) {
//           // sometimes module returns predictions without success flag
//           setDetectionResults(result);
//         } else {
//           setError(result?.error || "Detection failed");
//         }
//       } else {
//         // fallback/mock for dev
//         const mock = generateMockResult();
//         setDetectionResults(mock);
//       }
//     } catch (err) {
//       console.error("Detection error:", err);
//       setError(err?.message || "An error occurred during detection");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mock generator (keeps the same shape your app expects)
//   const generateMockResult = () => {
//     const plants = ["bael", "betel", "crown_flower"];
//     const randomIndex = Math.floor(Math.random() * plants.length);
//     const detectedPlantKey = plants[randomIndex];
//     const predictions = plants.map((plant, index) => ({
//       label: plant,
//       displayName: plant
//         .replace(/_/g, " ")
//         .split(" ")
//         .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//         .join(" "),
//       confidence:
//         index === randomIndex ? Math.random() * 0.25 + 0.75 : Math.random() * 0.4 + 0.05,
//     }));

//     return {
//       success: true,
//       detectedPlant: predictions[randomIndex].displayName,
//       confidence: predictions[randomIndex].confidence,
//       predictedIndex: randomIndex,
//       predictions,
//       expectedAccuracy:
//         detectedPlantKey === "bael" ? 85 : detectedPlantKey === "betel" ? 90 : 90,
//     };
//   };

//   const retryDetection = () => detectPlant();

//   const shareResults = async () => {
//     try {
//       const confidencePercent = Math.round((detectionResults?.confidence || 0) * 100);
//       const shareText = `Plant Leaf Detection Result:\n\nDetected: ${
//         detectionResults?.detectedPlant || "Unknown"
//       }\nConfidence: ${confidencePercent}%\n\nIdentified using Plant Leaf Detector AI`;

//       await Share.share({
//         message: shareText,
//         title: "Plant Detection Result",
//       });
//     } catch (err) {
//       console.error("Share error:", err);
//     }
//   };

//   // Navigation to Plant Detail screen (use the name registered in App.js)
//   const navigateToPlantDetails = (plantId) => {
//     if (!plantId) return;
//     navigation.navigate("PlantDetailScreen", { plantId });
//   };

//   // helper to map confidence to color/text
//   const getConfidenceColor = (confidence) => {
//     if (confidence >= 0.8) return colors.success;
//     if (confidence >= 0.6) return colors.warning;
//     return colors.error;
//   };
//   const getConfidenceText = (confidence) => {
//     if (confidence >= 0.8) return "High Confidence";
//     if (confidence >= 0.6) return "Medium Confidence";
//     return "Low Confidence";
//   };

//   // If still loading, show the analyzing screen
//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
//         <LinearGradient colors={[colors.primary, colors.primaryVariant]} style={styles.header}>
//           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//             <Icon name="arrow-back" size={24} color={colors.textOnPrimary} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Analyzing...</Text>
//           <View style={styles.headerRight} />
//         </LinearGradient>

//         <View style={styles.loadingContainer}>
//           <Animatable.View animation="pulse" iterationCount="infinite" style={styles.loadingImageContainer}>
//             {imageUri ? (
//               <Image source={{ uri: imageUri }} style={styles.loadingImage} />
//             ) : (
//               <View style={[styles.loadingImage, { backgroundColor: "#eee" }]} />
//             )}
//           </Animatable.View>

//           <ActivityIndicator size="large" color={colors.primary} style={styles.loadingSpinner} />

//           <Text style={styles.loadingTitle}>Analyzing your leaf image...</Text>
//           <Text style={styles.loadingSubtitle}>
//             Our AI is processing the image to identify the plant species
//           </Text>
//         </View>
//       </View>
//     );
//   }

//   // Error UI
//   if (error) {
//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
//         <LinearGradient colors={[colors.primary, colors.primaryVariant]} style={styles.header}>
//           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//             <Icon name="arrow-back" size={24} color={colors.textOnPrimary} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Detection Failed</Text>
//           <View style={styles.headerRight} />
//         </LinearGradient>

//         <View style={styles.errorContainer}>
//           <Animatable.View animation="fadeIn" style={styles.errorContent}>
//             <Icon name="error-outline" size={80} color={colors.error} />
//             <Text style={styles.errorTitle}>Detection Failed</Text>
//             <Text style={styles.errorMessage}>{error}</Text>

//             <TouchableOpacity style={styles.retryButton} onPress={retryDetection}>
//               <LinearGradient colors={[colors.primary, colors.primaryVariant]} style={styles.retryButtonGradient}>
//                 <Icon name="refresh" size={20} color={colors.textOnPrimary} />
//                 <Text style={styles.retryButtonText}>Try Again</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Animatable.View>
//         </View>
//       </View>
//     );
//   }

//   // At this point detectionResults exists (either from route.params or detectPlant)
//   // Ensure shape is normalized: if caller passed a simple prediction object, wrap it
//   const normalizedResults = (() => {
//     const r = detectionResults || route.params?.detectionResults || route.params?.prediction;
//     if (!r) return null;

//     // If the native/route provided a 'success' wrapper, keep it
//     if (r.predictions && Array.isArray(r.predictions)) return r;

//     // If r is an array of predictions:
//     if (Array.isArray(r)) {
//       return {
//         success: true,
//         predictions: r,
//         predictedIndex: 0,
//         confidence: r[0]?.confidence ?? r[0]?.score ?? null,
//         detectedPlant:
//           r[0]?.displayName ?? r[0]?.label ?? (typeof r[0] === "string" ? r[0] : "Unknown"),
//       };
//     }

//     // If r is a single prediction object
//     if (typeof r === "object" && (r.label || r.class || r.confidence)) {
//       return {
//         success: true,
//         predictions: [r],
//         predictedIndex: 0,
//         confidence: r.confidence ?? r.score ?? null,
//         detectedPlant: r.displayName ?? r.label ?? r.class ?? "Unknown",
//       };
//     }

//     return r;
//   })();

//   const res = normalizedResults || {};
//   const plantData = res ? getPlantById(res.predictions?.[res.predictedIndex]?.label) : null;
//   const confidencePercent = Math.round((res?.confidence || 0) * 100);

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

//       {/* Header */}
//       <LinearGradient colors={[colors.primary, colors.primaryVariant]} style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color={colors.textOnPrimary} />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Detection Results</Text>

//         <TouchableOpacity style={styles.shareButton} onPress={shareResults}>
//           <Icon name="share" size={24} color={colors.textOnPrimary} />
//         </TouchableOpacity>
//       </LinearGradient>

//       <ScrollView
//         style={styles.scrollContainer}
//         contentContainerStyle={{ paddingBottom: 140 }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Image and Main Result */}
//         <Animatable.View animation="fadeInUp" delay={200} style={styles.resultHeader}>
//           <View style={styles.imageContainer}>
//             {imageUri ? (
//               <Image source={{ uri: imageUri }} style={styles.resultImage} />
//             ) : (
//               <View style={[styles.resultImage, { backgroundColor: "#eee" }]} />
//             )}
//             <View style={styles.confidenceBadge}>
//               <Text style={styles.confidenceText}>{confidencePercent}%</Text>
//             </View>
//           </View>

//           <View style={styles.mainResult}>
//             <Text style={styles.detectedPlantName}>
//               {res?.detectedPlant ?? "Unknown"}
//             </Text>

//             <Text
//               style={[
//                 styles.confidenceStatus,
//                 { color: getConfidenceColor(res?.confidence ?? 0) },
//               ]}
//             >
//               {getConfidenceText(res?.confidence ?? 0)}
//             </Text>

//             {plantData && <Text style={styles.scientificName}>{plantData.scientificName}</Text>}
//           </View>
//         </Animatable.View>

//         {/* Tab Navigation */}
//         <Animatable.View animation="fadeInUp" delay={400} style={styles.tabContainer}>
//           <TouchableOpacity
//             style={[styles.tab, selectedTab === "results" && styles.activeTab]}
//             onPress={() => setSelectedTab("results")}
//           >
//             <Text style={[styles.tabText, selectedTab === "results" && styles.activeTabText]}>Results</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.tab, selectedTab === "info" && styles.activeTab]}
//             onPress={() => setSelectedTab("info")}
//           >
//             <Text style={[styles.tabText, selectedTab === "info" && styles.activeTabText]}>
//               Plant Info
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.tab, selectedTab === "details" && styles.activeTab]}
//             onPress={() => setSelectedTab("details")}
//           >
//             <Text style={[styles.tabText, selectedTab === "details" && styles.activeTabText]}>
//               Details
//             </Text>
//           </TouchableOpacity>
//         </Animatable.View>

//         {/* Tab Content */}
//         <Animatable.View key={selectedTab} animation="fadeIn" style={styles.tabContent}>
//           {selectedTab === "results" && (
//             <View style={styles.resultsContent}>
//               <Text style={styles.sectionTitle}>All Predictions</Text>

//               {(res?.predictions || []).map((prediction, index) => {
//                 const displayName =
//                   prediction.displayName ||
//                   (prediction.label ? prediction.label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : prediction.label);
//                 const conf = prediction.confidence ?? prediction.score ?? 0;
//                 return (
//                   <View key={`${prediction.label || index}`} style={styles.predictionItem}>
//                     <View style={styles.predictionInfo}>
//                       <Text style={styles.predictionName}>{displayName}</Text>
//                       <Text style={styles.predictionConfidence}>{Math.round(conf * 100)}%</Text>
//                     </View>

//                     <View style={styles.progressBarContainer}>
//                       <View
//                         style={[
//                           styles.progressBar,
//                           {
//                             width: `${(conf || 0) * 100}%`,
//                             backgroundColor:
//                               index === (res.predictedIndex ?? 0) ? colors.primary : colors.borderLight,
//                           },
//                         ]}
//                       />
//                     </View>
//                   </View>
//                 );
//               })}

//               {/* Model accuracy card intentionally removed per your preference */}
//             </View>
//           )}

//           {selectedTab === "info" && plantData && (
//             <View style={{ flex: 1 }}>
//               <ScrollView
//                 contentContainerStyle={{ paddingBottom: 24 }}
//                 showsVerticalScrollIndicator={false}
//               >
//                 <View style={styles.infoContent}>
//                   <Text style={styles.sectionTitle}>About {plantData.name}</Text>

//                   <Text style={styles.plantDescription}>
//                     {plantData.detailedDescription || plantData.description}
//                   </Text>

//                   <View style={styles.plantDetailsGrid}>
//                     <View style={styles.detailItem}>
//                       <Text style={styles.detailLabel}>Scientific Name:</Text>
//                       <Text style={styles.detailValue}>{plantData.scientificName ?? "-"}</Text>
//                     </View>

//                     <View style={styles.detailItem}>
//                       <Text style={styles.detailLabel}>Typical Accuracy:</Text>
//                       <Text style={styles.detailValue}>
//                         {typeof plantData.modelAccuracy === "number"
//                           ? `${plantData.modelAccuracy}%`
//                           : (plantData.modelAccuracy ?? "—")}
//                       </Text>
//                     </View>
//                   </View>

//                   {/* Render other fields: leaves, uses, warnings, etc. */}
//                   {plantData.leaves && (
//                     <View style={{ marginTop: 8 }}>
//                       <Text style={styles.subTitle}>Leaves</Text>
//                       {plantData.leaves.characteristics && (
//                         <Text style={styles.paragraph}>• {plantData.leaves.characteristics.join("\n• ")}</Text>
//                       )}
//                       {plantData.leaves.identification && <Text style={styles.paragraph}>{plantData.leaves.identification}</Text>}
//                     </View>
//                   )}

//                   {plantData.uses && (
//                     <View style={{ marginTop: 10 }}>
//                       <Text style={styles.subTitle}>Uses</Text>
//                       {plantData.uses.medicinal && <Text style={styles.paragraph}><Text style={{ fontWeight: "700" }}>Medicinal:</Text> {plantData.uses.medicinal.join(", ")}</Text>}
//                     </View>
//                   )}

//                   {plantData.warnings && (
//                     <View style={{ marginTop: 10 }}>
//                       <Text style={styles.subTitle}>Warnings</Text>
//                       <Text style={styles.paragraph}>{plantData.warnings.join(", ")}</Text>
//                     </View>
//                   )}

//                   {/* ensure final spacing so content doesn't butt against bottom */}
//                   <View style={{ height: 36 }} />
//                 </View>
//               </ScrollView>
//             </View>
//           )}

//           {selectedTab === "details" && (
//             <View style={styles.detailsContent}>
//               <Text style={styles.sectionTitle}>Image Information</Text>

//               <View style={styles.imageDetails}>
//                 <View style={styles.imageDetailItem}>
//                   <Text style={styles.imageDetailLabel}>File Name:</Text>
//                   <Text style={styles.imageDetailValue}>{fileName ?? "Unknown"}</Text>
//                 </View>

//                 <View style={styles.imageDetailItem}>
//                   <Text style={styles.imageDetailLabel}>File Size:</Text>
//                   <Text style={styles.imageDetailValue}>
//                     {fileSize ? `${Math.round(fileSize / 1024)} KB` : "Unknown"}
//                   </Text>
//                 </View>

//                 <View style={styles.imageDetailItem}>
//                   <Text style={styles.imageDetailLabel}>Processing Time:</Text>
//                   <Text style={styles.imageDetailValue}>~1.5 seconds</Text>
//                 </View>
//               </View>

//               <Text style={styles.sectionTitle}>Model Information</Text>

//               <View style={styles.modelInfo}>
//                 <View style={styles.modelInfoItem}>
//                   <Text style={styles.modelInfoLabel}>Model Type:</Text>
//                   <Text style={styles.modelInfoValue}>TensorFlow Lite</Text>
//                 </View>

//                 <View style={styles.modelInfoItem}>
//                   <Text style={styles.modelInfoLabel}>Input Size:</Text>
//                   <Text style={styles.modelInfoValue}>224x224 pixels</Text>
//                 </View>

//                 <View style={styles.modelInfoItem}>
//                   <Text style={styles.modelInfoLabel}>Classes:</Text>
//                   <Text style={styles.modelInfoValue}>3 plant species</Text>
//                 </View>
//               </View>
//             </View>
//           )}
//         </Animatable.View>
//       </ScrollView>

//       {/* Bottom Actions */}
//       {/* <View style={styles.bottomActions}>
//         <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("CameraScreen")}>
//           <Icon name="camera-alt" size={20} color={colors.primary} />
//           <Text style={styles.actionButtonText}>Detect Another</Text>
//         </TouchableOpacity>
//       </View> */}
//       <View style={styles.bottomActions}>

//   {/* Detect Another */}
//   <TouchableOpacity
//     style={styles.actionButton}
//     onPress={() => navigation.navigate("CameraScreen")}
//   >
//     <Icon name="camera-alt" size={20} color={colors.primary} />
//     <Text style={styles.actionButtonText}>Detect Another</Text>
//   </TouchableOpacity>

//   {/* Chatbot */}
//   <TouchableOpacity
//     style={styles.actionButton}
//     onPress={() => navigation.navigate("ChatbotScreen", { plant: plantData })}
//   >
//     <Icon name="chat" size={20} color={colors.primary} />
//     <Text style={styles.actionButtonText}>Chatbot</Text>
//   </TouchableOpacity>
// </View>

//     </View>
//   );
// };

// export default DetectionResultsScreen;

// /* --- Styles --- */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingTop: 50,
//     paddingBottom: spacing.lg,
//     paddingHorizontal: spacing.lg,
//     elevation: 4,
//     shadowColor: colors.shadowDark,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   backButton: {
//     padding: spacing.sm,
//     borderRadius: borderRadius.round,
//     backgroundColor: "rgba(255,255,255,0.18)",
//   },
//   headerTitle: {
//     fontSize: fontSize.xl,
//     fontWeight: fontWeight.semiBold,
//     color: colors.textOnPrimary,
//   },
//   shareButton: {
//     padding: spacing.sm,
//     borderRadius: borderRadius.round,
//     backgroundColor: "rgba(255,255,255,0.18)",
//   },
//   headerRight: { width: 40 },

//   loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: spacing.lg },
//   loadingImageContainer: { marginBottom: spacing.xl },
//   loadingImage: { width: 200, height: 200, borderRadius: borderRadius.lg },
//   loadingSpinner: { marginBottom: spacing.lg },
//   loadingTitle: { fontSize: fontSize.xl, fontWeight: fontWeight.semiBold, color: colors.textPrimary, textAlign: "center", marginBottom: spacing.sm },
//   loadingSubtitle: { fontSize: fontSize.md, color: colors.textSecondary, textAlign: "center", lineHeight: 24 },

//   errorContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: spacing.lg },
//   errorContent: { alignItems: "center" },
//   errorTitle: { fontSize: fontSize.xl, fontWeight: fontWeight.semiBold, color: colors.textPrimary, marginTop: spacing.lg, marginBottom: spacing.sm },
//   errorMessage: { fontSize: fontSize.md, color: colors.textSecondary, textAlign: "center", marginBottom: spacing.xl, lineHeight: 24 },

//   retryButton: { borderRadius: borderRadius.lg, overflow: "hidden" },
//   retryButtonGradient: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.lg, paddingHorizontal: spacing.xl },
//   retryButtonText: { fontSize: fontSize.lg, fontWeight: fontWeight.semiBold, color: colors.textOnPrimary, marginLeft: spacing.sm },

//   scrollContainer: { flex: 1 },

//   resultHeader: { alignItems: "center", paddingVertical: spacing.xl, paddingHorizontal: spacing.lg },
//   imageContainer: { position: "relative", marginBottom: spacing.lg },
//   resultImage: { width: Math.min(screenWidth - 40, 320), height: Math.min(screenWidth - 40, 320), borderRadius: borderRadius.lg, elevation: 4 },
//   confidenceBadge: { position: "absolute", top: spacing.sm, right: spacing.sm, backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.lg },
//   confidenceText: { fontSize: fontSize.sm, fontWeight: fontWeight.semiBold, color: colors.textOnPrimary },

//   mainResult: { alignItems: "center" },
//   detectedPlantName: { fontSize: fontSize.xxl, fontWeight: fontWeight.bold, color: colors.textPrimary, marginBottom: spacing.xs, textAlign: "center" },
//   confidenceStatus: { fontSize: fontSize.lg, fontWeight: fontWeight.medium, marginBottom: spacing.sm },
//   scientificName: { fontSize: fontSize.md, fontStyle: "italic", color: colors.textSecondary },

//   tabContainer: { flexDirection: "row", backgroundColor: colors.surface, marginHorizontal: spacing.lg, borderRadius: borderRadius.lg, padding: spacing.xs, elevation: 2, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
//   tab: { flex: 1, paddingVertical: spacing.md, paddingHorizontal: spacing.sm, alignItems: "center", borderRadius: borderRadius.md },
//   activeTab: { backgroundColor: colors.primary },
//   tabText: { fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: colors.textSecondary },
//   activeTabText: { color: colors.textOnPrimary, fontWeight: fontWeight.semiBold },

//   tabContent: { paddingHorizontal: spacing.lg, paddingVertical: spacing.lg },

//   sectionTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.semiBold, color: colors.textPrimary, marginBottom: spacing.lg },
//   resultsContent: {},

//   predictionItem: { backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.lg, marginBottom: spacing.md, elevation: 1 },
//   predictionInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
//   predictionName: { fontSize: fontSize.md, fontWeight: fontWeight.medium, color: colors.textPrimary },
//   predictionConfidence: { fontSize: fontSize.md, fontWeight: fontWeight.semiBold, color: colors.primary },

//   progressBarContainer: { height: 4, backgroundColor: colors.borderLight, borderRadius: 2, overflow: "hidden" },
//   progressBar: { height: "100%", borderRadius: 2 },

//   infoContent: {},
//   plantDescription: { fontSize: fontSize.md, color: colors.textSecondary, lineHeight: 24, marginBottom: spacing.lg },
//   plantDetailsGrid: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg },

//   detailItem: { marginBottom: spacing.md },
//   detailLabel: { fontSize: fontSize.sm, fontWeight: fontWeight.semiBold, color: colors.textSecondary, marginBottom: spacing.xs },
//   detailValue: { fontSize: fontSize.md, color: colors.textPrimary, lineHeight: 22 },

//   subTitle: { fontSize: fontSize.md, fontWeight: fontWeight.semiBold, marginBottom: 6, color: colors.textPrimary },
//   paragraph: { fontSize: fontSize.md, color: colors.textSecondary, lineHeight: 22 },

//   detailsContent: {},
//   imageDetails: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg },
//   imageDetailItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
//   imageDetailLabel: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: fontWeight.medium },
//   imageDetailValue: { fontSize: fontSize.sm, color: colors.textPrimary, fontWeight: fontWeight.medium },

//   modelInfo: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.lg },
//   modelInfoItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
//   modelInfoLabel: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: fontWeight.medium },
//   modelInfoValue: { fontSize: fontSize.sm, color: colors.textPrimary, fontWeight: fontWeight.medium },

//   bottomActions: { flexDirection: "row", backgroundColor: colors.surface, paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, borderTopWidth: 1, borderTopColor: colors.borderLight, elevation: 8 },
//   actionButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: spacing.lg, marginHorizontal: spacing.sm, backgroundColor: colors.primaryLight, borderRadius: borderRadius.lg },
//   actionButtonText: { fontSize: fontSize.md, fontWeight: fontWeight.medium, color: colors.primary, marginLeft: spacing.sm },
// });






// src/screens/DetectionResultsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  Share,
} from "react-native";
import { NativeModules } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors, spacing, borderRadius, fontSize, fontWeight } from "../theme/colors";
import { getPlantById } from "../data/plantsData";

const { PlantDetectionModule } = NativeModules || {};
const { width: screenWidth } = Dimensions.get("window");

const DetectionResultsScreen = ({ route, navigation }) => {
  const { imageUri, imagePath, fileName, fileSize } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [detectionResults, setDetectionResults] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("results"); // 'results' | 'info' | 'details'

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor(colors.primaryDark);
    if (route.params?.detectionResults || route.params?.prediction) {
      const incoming = route.params.detectionResults || route.params.prediction;
      setDetectionResults(incoming);
      setLoading(false);
      return;
    }
    detectPlant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detectPlant = async () => {
    try {
      setLoading(true);
      setError(null);

      // small UX delay
      await new Promise((res) => setTimeout(res, 1000));

      if (PlantDetectionModule && typeof PlantDetectionModule.detectPlant === "function") {
        // native detection expected to return an object like:
        // { success: true, detectedPlant: 'Crown Flower', confidence: 0.9, predictions: [...], predictedIndex: 0 }
        const result = await PlantDetectionModule.detectPlant(imagePath);
        if (result && result.success) {
          setDetectionResults(result);
        } else if (result && !result.success && result.predictions) {
          setDetectionResults(result);
        } else {
          setError(result?.error || "Detection failed");
        }
      } else {
        // fallback/mock for dev
        const mock = generateMockResult();
        setDetectionResults(mock);
      }
    } catch (err) {
      console.error("Detection error:", err);
      setError(err?.message || "An error occurred during detection");
    } finally {
      setLoading(false);
    }
  };

  const generateMockResult = () => {
    const plants = ["bael", "betel", "crown_flower"];
    const randomIndex = Math.floor(Math.random() * plants.length);
    const predictedIndex = randomIndex;
    const predictions = plants.map((plant, index) => ({
      label: plant,
      displayName: plant
        .replace(/_/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      confidence:
        index === randomIndex ? Math.random() * 0.25 + 0.75 : Math.random() * 0.4 + 0.05,
    }));

    return {
      success: true,
      detectedPlant: predictions[predictedIndex].displayName,
      confidence: predictions[predictedIndex].confidence,
      predictedIndex,
      predictions,
      expectedAccuracy: predictedIndex === 0 ? 85 : predictedIndex === 1 ? 90 : 90,
    };
  };

  const retryDetection = () => detectPlant();

  const shareResults = async () => {
    try {
      const confidencePercent = Math.round((detectionResults?.confidence || 0) * 100);
      const shareText = `Plant Leaf Detection Result:\n\nDetected: ${
        detectionResults?.detectedPlant || "Unknown"
      }\nConfidence: ${confidencePercent}%\n\nIdentified using Plant Leaf Detector AI`;

      await Share.share({
        message: shareText,
        title: "Plant Detection Result",
      });
    } catch (err) {
      console.error("Share error:", err);
    }
  };

  const navigateToPlantDetails = (plantId) => {
    if (!plantId) return;
    navigation.navigate("PlantDetailScreen", { plantId });
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return colors.success;
    if (confidence >= 0.6) return colors.warning;
    return colors.error;
  };
  const getConfidenceText = (confidence) => {
    if (confidence >= 0.8) return "High Confidence";
    if (confidence >= 0.6) return "Medium Confidence";
    return "Low Confidence";
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
        <LinearGradient colors={[colors.primary, colors.primaryVariant]} style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={colors.textOnPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Analyzing...</Text>
          <View style={styles.headerRight} />
        </LinearGradient>

        <View style={styles.loadingContainer}>
          <Animatable.View animation="pulse" iterationCount="infinite" style={styles.loadingImageContainer}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.loadingImage} />
            ) : (
              <View style={[styles.loadingImage, { backgroundColor: "#eee" }]} />
            )}
          </Animatable.View>

          <ActivityIndicator size="large" color={colors.primary} style={styles.loadingSpinner} />

          <Text style={styles.loadingTitle}>Analyzing your leaf image...</Text>
          <Text style={styles.loadingSubtitle}>
            Our AI is processing the image to identify the plant species
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
        <LinearGradient colors={[colors.primary, colors.primaryVariant]} style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={colors.textOnPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detection Failed</Text>
          <View style={styles.headerRight} />
        </LinearGradient>

        <View style={styles.errorContainer}>
          <Animatable.View animation="fadeIn" style={styles.errorContent}>
            <Icon name="error-outline" size={80} color={colors.error} />
            <Text style={styles.errorTitle}>Detection Failed</Text>
            <Text style={styles.errorMessage}>{error}</Text>

            <TouchableOpacity style={styles.retryButton} onPress={retryDetection}>
              <LinearGradient colors={[colors.primary, colors.primaryVariant]} style={styles.retryButtonGradient}>
                <Icon name="refresh" size={20} color={colors.textOnPrimary} />
                <Text style={styles.retryButtonText}>Try Again</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </View>
    );
  }

  // Normalize result shapes
  const normalizedResults = (() => {
    const r = detectionResults || route.params?.detectionResults || route.params?.prediction;
    if (!r) return null;
    if (r.predictions && Array.isArray(r.predictions)) return r;
    if (Array.isArray(r)) {
      return {
        success: true,
        predictions: r,
        predictedIndex: 0,
        confidence: r[0]?.confidence ?? r[0]?.score ?? null,
        detectedPlant:
          r[0]?.displayName ?? r[0]?.label ?? (typeof r[0] === "string" ? r[0] : "Unknown"),
      };
    }
    if (typeof r === "object" && (r.label || r.class || r.confidence)) {
      return {
        success: true,
        predictions: [r],
        predictedIndex: 0,
        confidence: r.confidence ?? r.score ?? null,
        detectedPlant: r.displayName ?? r.label ?? r.class ?? "Unknown",
      };
    }
    return r;
  })();

  const res = normalizedResults || {};
  const plantData = res ? getPlantById(res.predictions?.[res.predictedIndex]?.label) : null;
  const confidencePercent = Math.round((res?.confidence || 0) * 100);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

      {/* Header */}
      <LinearGradient colors={[colors.primary, colors.primaryVariant]} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textOnPrimary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detection Results</Text>

        <TouchableOpacity style={styles.shareButton} onPress={shareResults}>
          <Icon name="share" size={24} color={colors.textOnPrimary} />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Image and Main Result */}
        <Animatable.View animation="fadeInUp" delay={200} style={styles.resultHeader}>
          <View style={styles.imageContainer}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.resultImage} />
            ) : (
              <View style={[styles.resultImage, { backgroundColor: "#eee" }]} />
            )}
            <View style={styles.confidenceBadge}>
              <Text style={styles.confidenceText}>{confidencePercent}%</Text>
            </View>
          </View>

          <View style={styles.mainResult}>
            <Text style={styles.detectedPlantName}>
              {res?.detectedPlant ?? "Unknown"}
            </Text>

            <Text
              style={[
                styles.confidenceStatus,
                { color: getConfidenceColor(res?.confidence ?? 0) },
              ]}
            >
              {getConfidenceText(res?.confidence ?? 0)}
            </Text>

            {plantData && <Text style={styles.scientificName}>{plantData.scientificName}</Text>}
          </View>
        </Animatable.View>

        {/* Tab Navigation */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "results" && styles.activeTab]}
            onPress={() => setSelectedTab("results")}
          >
            <Text style={[styles.tabText, selectedTab === "results" && styles.activeTabText]}>Results</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === "info" && styles.activeTab]}
            onPress={() => setSelectedTab("info")}
          >
            <Text style={[styles.tabText, selectedTab === "info" && styles.activeTabText]}>
              Plant Info
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === "details" && styles.activeTab]}
            onPress={() => setSelectedTab("details")}
          >
            <Text style={[styles.tabText, selectedTab === "details" && styles.activeTabText]}>
              Details
            </Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Tab Content */}
        <Animatable.View key={selectedTab} animation="fadeIn" style={styles.tabContent}>
          {selectedTab === "results" && (
            <View style={styles.resultsContent}>
              <Text style={styles.sectionTitle}>All Predictions</Text>

              {(res?.predictions || []).map((prediction, index) => {
                const displayName =
                  prediction.displayName ||
                  (prediction.label ? prediction.label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : prediction.label);
                const conf = prediction.confidence ?? prediction.score ?? 0;
                return (
                  <View key={`${prediction.label || index}`} style={styles.predictionItem}>
                    <View style={styles.predictionInfo}>
                      <Text style={styles.predictionName}>{displayName}</Text>
                      <Text style={styles.predictionConfidence}>{Math.round(conf * 100)}%</Text>
                    </View>

                    <View style={styles.progressBarContainer}>
                      <View
                        style={[
                          styles.progressBar,
                          {
                            width: `${(conf || 0) * 100}%`,
                            backgroundColor:
                              index === (res.predictedIndex ?? 0) ? colors.primary : colors.borderLight,
                          },
                        ]}
                      />
                    </View>
                  </View>
                );
              })}

              {/* Model accuracy card intentionally removed per your preference */}
            </View>
          )}

          {selectedTab === "info" && plantData && (
            <View style={{ flex: 1 }}>
              <ScrollView
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.infoContent}>
                  <Text style={styles.sectionTitle}>About {plantData.name}</Text>

                  <Text style={styles.plantDescription}>
                    {plantData.detailedDescription || plantData.description}
                  </Text>

                  <View style={styles.plantDetailsGrid}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Scientific Name:</Text>
                      <Text style={styles.detailValue}>{plantData.scientificName ?? "-"}</Text>
                    </View>

                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Typical Accuracy:</Text>
                      <Text style={styles.detailValue}>
                        {typeof plantData.modelAccuracy === "number"
                          ? `${plantData.modelAccuracy}%`
                          : (plantData.modelAccuracy ?? "—")}
                      </Text>
                    </View>
                  </View>

                  {/* Render other fields: leaves, uses, warnings, etc. */}
                  {plantData.leaves && (
                    <View style={{ marginTop: 8 }}>
                      <Text style={styles.subTitle}>Leaves</Text>
                      {plantData.leaves.characteristics && (
                        <Text style={styles.paragraph}>• {plantData.leaves.characteristics.join("\n• ")}</Text>
                      )}
                      {plantData.leaves.identification && <Text style={styles.paragraph}>{plantData.leaves.identification}</Text>}
                    </View>
                  )}

                  {plantData.uses && (
                    <View style={{ marginTop: 10 }}>
                      <Text style={styles.subTitle}>Uses</Text>
                      {plantData.uses.medicinal && <Text style={styles.paragraph}><Text style={{ fontWeight: "700" }}>Medicinal:</Text> {plantData.uses.medicinal.join(", ")}</Text>}
                    </View>
                  )}

                  {plantData.warnings && (
                    <View style={{ marginTop: 10 }}>
                      <Text style={styles.subTitle}>Warnings</Text>
                      <Text style={styles.paragraph}>{plantData.warnings.join(", ")}</Text>
                    </View>
                  )}

                  {/* ensure final spacing so content doesn't butt against bottom */}
                  <View style={{ height: 36 }} />
                </View>
              </ScrollView>
            </View>
          )}

          {selectedTab === "details" && (
            <View style={styles.detailsContent}>
              <Text style={styles.sectionTitle}>Image Information</Text>

              <View style={styles.imageDetails}>
                <View style={styles.imageDetailItem}>
                  <Text style={styles.imageDetailLabel}>File Name:</Text>
                  <Text style={styles.imageDetailValue}>{fileName ?? "Unknown"}</Text>
                </View>

                <View style={styles.imageDetailItem}>
                  <Text style={styles.imageDetailLabel}>File Size:</Text>
                  <Text style={styles.imageDetailValue}>
                    {fileSize ? `${Math.round(fileSize / 1024)} KB` : "Unknown"}
                  </Text>
                </View>

                <View style={styles.imageDetailItem}>
                  <Text style={styles.imageDetailLabel}>Processing Time:</Text>
                  <Text style={styles.imageDetailValue}>~1.5 seconds</Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Model Information</Text>

              <View style={styles.modelInfo}>
                <View style={styles.modelInfoItem}>
                  <Text style={styles.modelInfoLabel}>Model Type:</Text>
                  <Text style={styles.modelInfoValue}>TensorFlow Lite</Text>
                </View>

                <View style={styles.modelInfoItem}>
                  <Text style={styles.modelInfoLabel}>Input Size:</Text>
                  <Text style={styles.modelInfoValue}>224x224 pixels</Text>
                </View>

                <View style={styles.modelInfoItem}>
                  <Text style={styles.modelInfoLabel}>Classes:</Text>
                  <Text style={styles.modelInfoValue}>3 plant species</Text>
                </View>
              </View>
            </View>
          )}
        </Animatable.View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("CameraScreen")}>
          <Icon name="camera-alt" size={20} color={colors.primary} />
          <Text style={styles.actionButtonText}>Detect Another</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("ChatbotScreen", { plant: plantData })}>
          <Icon name="chat" size={20} color={colors.primary} />
          <Text style={styles.actionButtonText}>Chatbot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetectionResultsScreen;

/* --- Styles --- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    color: colors.textOnPrimary,
  },
  shareButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.round,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  headerRight: { width: 40 },

  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: spacing.lg },
  loadingImageContainer: { marginBottom: spacing.xl },
  loadingImage: { width: 200, height: 200, borderRadius: borderRadius.lg },
  loadingSpinner: { marginBottom: spacing.lg },
  loadingTitle: { fontSize: fontSize.xl, fontWeight: fontWeight.semiBold, color: colors.textPrimary, textAlign: "center", marginBottom: spacing.sm },
  loadingSubtitle: { fontSize: fontSize.md, color: colors.textSecondary, textAlign: "center", lineHeight: 24 },

  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: spacing.lg },
  errorContent: { alignItems: "center" },
  errorTitle: { fontSize: fontSize.xl, fontWeight: fontWeight.semiBold, color: colors.textPrimary, marginTop: spacing.lg, marginBottom: spacing.sm },
  errorMessage: { fontSize: fontSize.md, color: colors.textSecondary, textAlign: "center", marginBottom: spacing.xl, lineHeight: 24 },

  retryButton: { borderRadius: borderRadius.lg, overflow: "hidden" },
  retryButtonGradient: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.lg, paddingHorizontal: spacing.xl },
  retryButtonText: { fontSize: fontSize.lg, fontWeight: fontWeight.semiBold, color: colors.textOnPrimary, marginLeft: spacing.sm },

  scrollContainer: { flex: 1 },

  resultHeader: { alignItems: "center", paddingVertical: spacing.xl, paddingHorizontal: spacing.lg },
  imageContainer: { position: "relative", marginBottom: spacing.lg },
  resultImage: { width: Math.min(screenWidth - 40, 320), height: Math.min(screenWidth - 40, 320), borderRadius: borderRadius.lg, elevation: 4 },
  confidenceBadge: { position: "absolute", top: spacing.sm, right: spacing.sm, backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.lg },
  confidenceText: { fontSize: fontSize.sm, fontWeight: fontWeight.semiBold, color: colors.textOnPrimary },

  mainResult: { alignItems: "center" },
  detectedPlantName: { fontSize: fontSize.xxl, fontWeight: fontWeight.bold, color: colors.textPrimary, marginBottom: spacing.xs, textAlign: "center" },
  confidenceStatus: { fontSize: fontSize.lg, fontWeight: fontWeight.medium, marginBottom: spacing.sm },
  scientificName: { fontSize: fontSize.md, fontStyle: "italic", color: colors.textSecondary },

  tabContainer: { flexDirection: "row", backgroundColor: colors.surface, marginHorizontal: spacing.lg, borderRadius: borderRadius.lg, padding: spacing.xs, elevation: 2, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  tab: { flex: 1, paddingVertical: spacing.md, paddingHorizontal: spacing.sm, alignItems: "center", borderRadius: borderRadius.md },
  activeTab: { backgroundColor: colors.primary },
  tabText: { fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: colors.textSecondary },
  activeTabText: { color: colors.textOnPrimary, fontWeight: fontWeight.semiBold },

  tabContent: { paddingHorizontal: spacing.lg, paddingVertical: spacing.lg },

  sectionTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.semiBold, color: colors.textPrimary, marginBottom: spacing.lg },
  resultsContent: {},

  predictionItem: { backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.lg, marginBottom: spacing.md, elevation: 1 },
  predictionInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
  predictionName: { fontSize: fontSize.md, fontWeight: fontWeight.medium, color: colors.textPrimary },
  predictionConfidence: { fontSize: fontSize.md, fontWeight: fontWeight.semiBold, color: colors.primary },

  progressBarContainer: { height: 4, backgroundColor: colors.borderLight, borderRadius: 2, overflow: "hidden" },
  progressBar: { height: "100%", borderRadius: 2 },

  infoContent: {},
  plantDescription: { fontSize: fontSize.md, color: colors.textSecondary, lineHeight: 24, marginBottom: spacing.lg },
  plantDetailsGrid: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg },

  detailItem: { marginBottom: spacing.md },
  detailLabel: { fontSize: fontSize.sm, fontWeight: fontWeight.semiBold, color: colors.textSecondary, marginBottom: spacing.xs },
  detailValue: { fontSize: fontSize.md, color: colors.textPrimary, lineHeight: 22 },

  subTitle: { fontSize: fontSize.md, fontWeight: fontWeight.semiBold, marginBottom: 6, color: colors.textPrimary },
  paragraph: { fontSize: fontSize.md, color: colors.textSecondary, lineHeight: 22 },

  detailsContent: {},
  imageDetails: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg },
  imageDetailItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  imageDetailLabel: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: fontWeight.medium },
  imageDetailValue: { fontSize: fontSize.sm, color: colors.textPrimary, fontWeight: fontWeight.medium },

  modelInfo: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.lg },
  modelInfoItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  modelInfoLabel: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: fontWeight.medium },
  modelInfoValue: { fontSize: fontSize.sm, color: colors.textPrimary, fontWeight: fontWeight.medium },

  bottomActions: { flexDirection: "row", backgroundColor: colors.surface, paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, borderTopWidth: 1, borderTopColor: colors.borderLight, elevation: 8 },
  actionButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: spacing.lg, marginHorizontal: spacing.sm, backgroundColor: colors.primaryLight, borderRadius: borderRadius.lg },
  actionButtonText: { fontSize: fontSize.md, fontWeight: fontWeight.medium, color: colors.primary, marginLeft: spacing.sm },
});
