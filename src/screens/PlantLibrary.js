// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import { getAllPlants } from "../data/plantsData";

// export default function PlantLibrary({ navigation }) {
//   const plants = getAllPlants();

//   const renderPlantItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate("PlantDetailScreen", { plantId: item.id })}
//     >
//       <Text style={styles.plantName}>🌿 {item.name}</Text>
//       <Text style={styles.scientificName}>🧪 {item.scientificName}</Text>
//       <Text style={styles.accuracy}>✅ Accuracy: {item.modelAccuracy}%</Text>
//       <Text style={styles.description} numberOfLines={3}>
//         {item.description}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>📚 Plant Library</Text>
//       <FlatList
//         data={plants}
//         renderItem={renderPlantItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: "#fff" },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//     color: "#2c3e50",
//   },
//   list: { paddingBottom: 20 },
//   card: {
//     backgroundColor: "#ecf0f1",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   plantName: { fontSize: 20, fontWeight: "600", color: "#27ae60" },
//   scientificName: { fontSize: 14, fontStyle: "italic", color: "#34495e" },
//   accuracy: { fontSize: 14, color: "#2980b9", marginVertical: 4 },
//   description: { fontSize: 14, color: "#2c3e50" },
// });




// src/screens/PlantLibrary.js
import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { getAllPlants } from "../data/plantsData";

const PlantLibrary = ({ navigation }) => {
  const plants = getAllPlants();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation.navigate("PlantDetailScreen", { plantId: item.id })}
    >
      <View style={styles.row}>
        {item.image ? (
          <Image source={item.image} style={styles.icon} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderIcon} />
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.scientific}>{item.scientific}</Text>
          {/* KEEP truncated preview in the list for compactness.
              Remove numberOfLines prop if you want the full text here. */}
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Accuracy: {item.modelAccuracy}%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
};

export default PlantLibrary;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7f7" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: { flexDirection: "row", alignItems: "flex-start" },
  icon: { width: 64, height: 64, borderRadius: 12, marginRight: 12 },
  placeholderIcon: { width: 64, height: 64, borderRadius: 12, marginRight: 12, backgroundColor: "#e6f2ea" },
  content: { flex: 1 },
  title: { fontSize: 18, fontWeight: "700", color: "#1f3a2d" },
  scientific: { fontSize: 13, color: "#3f3f3f", fontStyle: "italic", marginBottom: 6 },
  description: { fontSize: 14, color: "#5a5a5a", lineHeight: 20 },
  badge: { marginTop: 8, alignSelf: "flex-start", backgroundColor: "#e6f2ea", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: "#2e7d32", fontWeight: "600" },
});
