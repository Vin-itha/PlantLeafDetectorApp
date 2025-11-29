// import React from "react";
// import { ScrollView, Text, StyleSheet, View } from "react-native";
// import { getPlantById } from "../data/plantsData";

// export default function PlantDetailScreen({ route }) {
//   const { plantId } = route.params;
//   const plant = getPlantById(plantId);

//   if (!plant) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>⚠️ Plant not found</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={{ paddingBottom: 40 }} // 👈 prevents cropping
//     >
//       <Text style={styles.title}>🌿 {plant.name}</Text>
//       <Text style={styles.scientificName}>🧪 {plant.scientificName}</Text>
//       <Text style={styles.description}>{plant.description}</Text>

//       <Text style={styles.sectionTitle}>🍃 Leaf Characteristics</Text>
//       {plant.leaves.characteristics.map((c, idx) => (
//         <Text key={idx} style={styles.listItem}>• {c}</Text>
//       ))}
//       <Text style={styles.subNote}>{plant.leaves.identification}</Text>

//       <Text style={styles.sectionTitle}>💊 Medicinal Uses</Text>
//       {plant.uses.medicinal.map((u, idx) => (
//         <Text key={idx} style={styles.listItem}>• {u}</Text>
//       ))}

//       <Text style={styles.sectionTitle}>⚠️ Warnings</Text>
//       {plant.warnings.map((w, idx) => (
//         <Text key={idx} style={styles.warningItem}>• {w}</Text>
//       ))}

//       <Text style={styles.sectionTitle}>🌏 Cultural Significance</Text>
//       <Text style={styles.subNote}>{plant.culturalSignificance}</Text>

//       <Text style={styles.sectionTitle}>✅ Model Accuracy</Text>
//       <Text style={styles.accuracy}>{plant.modelAccuracy}%</Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: "#fff", 
//     padding: 16 
//   },
//   title: { 
//     fontSize: 28, 
//     fontWeight: "bold", 
//     color: "#27ae60", 
//     marginBottom: 8,
//     fontFamily: 'System',
//   },
//   scientificName: { 
//     fontSize: 16, 
//     fontStyle: "italic", 
//     color: "#34495e", 
//     marginBottom: 12,
//     fontFamily: 'System',
//   },
//   description: { 
//     fontSize: 15, 
//     color: "#2c3e50", 
//     marginBottom: 16,
//     fontFamily: 'System',
//   },
//   sectionTitle: { 
//     fontSize: 18, 
//     fontWeight: "600", 
//     marginTop: 16, 
//     marginBottom: 6, 
//     color: "#2980b9",
//     fontFamily: 'System',
//   },
//   listItem: { 
//     fontSize: 15, 
//     marginBottom: 4, 
//     color: "#2c3e50",
//     fontFamily: 'System',
//   },
//   subNote: { 
//     fontSize: 14, 
//     color: "#7f8c8d", 
//     marginBottom: 12,
//     fontFamily: 'System',
//   },
//   warningItem: { 
//     fontSize: 15, 
//     marginBottom: 4, 
//     color: "#c0392b",
//     fontFamily: 'System',
//   },
//   accuracy: { 
//     fontSize: 16, 
//     fontWeight: "600", 
//     color: "#27ae60", 
//     marginBottom: 20,
//     fontFamily: 'System',
//   },
//   errorText: { 
//     fontSize: 18, 
//     color: "#c0392b", 
//     textAlign: "center",
//     fontFamily: 'System',
//   },
// });




// src/screens/PlantDetailScreen.js
// import React from "react";
// import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
// import { getPlantById } from "../data/plantsData";

// const PlantDetailScreen = ({ route, navigation }) => {
//   const { plantId } = route.params || {};
//   const plant = getPlantById(plantId);

//   if (!plant) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.notFound}>Plant information not found.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
//       <View style={styles.header}>
//         {plant.image ? (
//           <Image source={plant.image} style={styles.headerImage} resizeMode="cover" />
//         ) : (
//           <View style={[styles.headerImage, { backgroundColor: "#f4f4f4" }]} />
//         )}
//       </View>

//       <View style={styles.body}>
//         <Text style={styles.title}>{plant.name}</Text>
//         <Text style={styles.scientific}>{plant.scientific}</Text>
//         <View style={styles.metaRow}>
//           <Text style={styles.metaLabel}>Accuracy:</Text>
//           <Text style={styles.metaValue}>{plant.accuracy}</Text>
//         </View>

//         <Text style={styles.description}>{plant.description}</Text>
//       </View>
//     </ScrollView>
//   );
// };

// export default PlantDetailScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { height: 260, backgroundColor: "#f6f7f7", alignItems: "center", justifyContent: "center" },
//   headerImage: { width: "86%", height: "86%", borderRadius: 16 },
//   body: { padding: 18 },
//   title: { fontSize: 26, fontWeight: "800", marginBottom: 6 },
//   scientific: { fontSize: 15, fontStyle: "italic", color: "#666", marginBottom: 10 },
//   metaRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
//   metaLabel: { fontSize: 14, color: "#444", marginRight: 8 },
//   metaValue: { fontSize: 14, color: "#2e7d32", fontWeight: "700" },
//   description: { fontSize: 16, lineHeight: 24, color: "#444" },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   notFound: { fontSize: 18, color: "#777" },
// });























// src/screens/PlantDetailScreen.js
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import PLANTS_DATA, { getPlantById } from '../data/plantsData';

const tryNormalize = (str = '') => String(str).trim().toLowerCase().replace(/\s+/g, '_').replace(/\.jpg|\.jpeg|\.png$/i, '');

const findPlantFlexible = (param) => {
  if (!param) return null;

  // 1) Try existing helper first
  const byHelper = getPlantById(param);
  if (byHelper) return byHelper;

  // 2) Normalize and try direct key
  const key = tryNormalize(param);
  if (PLANTS_DATA[key]) return PLANTS_DATA[key];

  // 3) Search by many fields (name, scientificName, commonNames, id)
  const term = String(param).trim().toLowerCase();
  const list = Object.values(PLANTS_DATA);
  for (const p of list) {
    if (!p) continue;
    if ((p.id && p.id.toLowerCase() === term) ||
        (p.name && p.name.toLowerCase() === term) ||
        (p.scientificName && p.scientificName.toLowerCase() === term) ||
        (p.scientific && p.scientific.toLowerCase() === term) ||
        (p.modelAccuracy && String(p.modelAccuracy).toLowerCase() === term)) {
      return p;
    }
    if (Array.isArray(p.commonNames)) {
      for (const cn of p.commonNames) {
        if (cn.toLowerCase() === term) return p;
      }
    }
    // partial match
    if (p.name && p.name.toLowerCase().includes(term)) return p;
    if (p.scientificName && p.scientificName.toLowerCase().includes(term)) return p;
  }

  // 4) Try normalized partial matches (strip extension)
  const short = tryNormalize(param);
  for (const p of list) {
    if (tryNormalize(p.id) === short || tryNormalize(p.name) === short) return p;
  }

  return null;
};

export default function PlantDetailScreen({ route, navigation }) {
  // Accept many possible param keys that other screens might send
  const params = route?.params || {};
  const candidateParam = params.plantId ?? params.id ?? params.label ?? params.name ?? params.prediction ?? params.result ?? params.detected;

  // Memoize find
  const plant = useMemo(() => findPlantFlexible(candidateParam), [candidateParam]);

  // Debug: If you still see "Plant not found" log params in console to inspect keys
  if (!plant) {
    console.log('PlantDetailScreen: route.params =', route?.params);
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Plant not found</Text>
        <Text style={styles.hint}>Sent params: {JSON.stringify(route?.params || {})}</Text>
      </View>
    );
  }

  // Image loader: support require(...) or uri string
  const renderImage = () => {
    if (!plant.image) return null;
    // if image is number (require returns a number or object depending on bundler), pass directly
    if (typeof plant.image === 'number' || (typeof plant.image === 'object' && (plant.image.uri || plant.image.uri === ''))) {
      return <Image source={plant.image} style={styles.headerImage} resizeMode="cover" />;
    }
    if (typeof plant.image === 'string') {
      return <Image source={{ uri: plant.image }} style={styles.headerImage} resizeMode="cover" />;
    }
    // fallback
    try {
      return <Image source={plant.image} style={styles.headerImage} resizeMode="cover" />;
    } catch (e) {
      return null;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        {renderImage() || <View style={[styles.headerImage, { backgroundColor: '#f4f4f4' }]} />}
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{plant.name}</Text>
        {plant.scientificName ? <Text style={styles.scientific}>{plant.scientificName}</Text> : null}
        {typeof plant.modelAccuracy !== 'undefined' && (
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Accuracy:</Text>
            <Text style={styles.metaValue}>{plant.modelAccuracy}%</Text>
          </View>
        )}

        {plant.description ? <Text style={styles.description}>{plant.description}</Text> : null}
        {plant.detailedDescription ? <Text style={styles.long}>{plant.detailedDescription}</Text> : null}

        {plant.commonNames?.length ? (
          <Section title="Common names" content={plant.commonNames.join(', ')} />
        ) : null}

        {plant.family ? <Section title="Family" content={plant.family} /> : null}

        {plant.leaves && (plant.leaves.characteristics?.length || plant.leaves.identification) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Leaves</Text>
            {plant.leaves.characteristics?.length ? (
              <Text style={styles.paragraph}>• {plant.leaves.characteristics.join('\n• ')}</Text>
            ) : null}
            {plant.leaves.identification ? <Text style={styles.paragraph}>{plant.leaves.identification}</Text> : null}
          </View>
        ) : null}

        {plant.uses && (plant.uses.medicinal || plant.uses.religious || plant.uses.culinary || plant.uses.other) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Uses</Text>
            {plant.uses.medicinal?.length ? <Text style={styles.sub}>Medicinal: {plant.uses.medicinal.join(', ')}</Text> : null}
            {plant.uses.religious?.length ? <Text style={styles.sub}>Religious: {plant.uses.religious.join(', ')}</Text> : null}
            {plant.uses.culinary?.length ? <Text style={styles.sub}>Culinary: {plant.uses.culinary.join(', ')}</Text> : null}
            {plant.uses.other?.length ? <Text style={styles.sub}>Other: {plant.uses.other.join(', ')}</Text> : null}
          </View>
        ) : null}

        {plant.habitat ? (
          <Section title="Habitat" content={formatObject(plant.habitat)} />
        ) : null}

        {plant.cultivation ? (
          <Section title="Cultivation" content={formatObject(plant.cultivation)} />
        ) : null}

        {plant.chemicalComposition?.length ? (
          <Section title="Chemical composition" content={plant.chemicalComposition.join(', ')} />
        ) : null}

        {plant.warnings?.length ? (
          <Section title="Warnings" content={plant.warnings.join('\n')} />
        ) : null}

        {plant.culturalSignificance ? (
          <Section title="Cultural significance" content={plant.culturalSignificance} />
        ) : null}

        {plant.conservationStatus ? <Section title="Conservation" content={plant.conservationStatus} /> : null}
      </View>
    </ScrollView>
  );
}

// small helper components
const Section = ({ title, content }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.paragraph}>{content}</Text>
  </View>
);

const formatObject = (obj) => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return Object.entries(obj)
    .map(([k, v]) => `${capitalize(k)}: ${Array.isArray(v) ? v.join(', ') : v}`)
    .join('\n');
};

const capitalize = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { paddingBottom: 40 },
  header: { height: 260, backgroundColor: '#f6f7f7', alignItems: 'center', justifyContent: 'center' },
  headerImage: { width: '86%', height: '86%', borderRadius: 16 },
  body: { padding: 18 },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 6 },
  scientific: { fontSize: 15, fontStyle: 'italic', color: '#666', marginBottom: 10 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  metaLabel: { fontSize: 14, color: '#444', marginRight: 8 },
  metaValue: { fontSize: 14, color: '#2e7d32', fontWeight: '700' },
  description: { fontSize: 16, lineHeight: 24, color: '#444', marginBottom: 10 },
  long: { fontSize: 14, lineHeight: 20, color: '#333', marginBottom: 12 },
  section: { marginBottom: 12 },
  sectionTitle: { fontWeight: '700', marginBottom: 6, fontSize: 16 },
  paragraph: { marginBottom: 6, lineHeight: 20, color: '#222' },
  sub: { marginBottom: 6 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40 },
  notFound: { fontSize: 18, color: '#777' },
  hint: { marginTop: 8, color: '#999', fontSize: 12, paddingHorizontal: 12, textAlign: 'center' }
});
