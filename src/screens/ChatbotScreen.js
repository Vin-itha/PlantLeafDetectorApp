
// // src/screens/ChatbotScreen.js
// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { colors, spacing, borderRadius, fontSize, fontWeight } from "../theme/colors";
// import { getPlantById } from "../data/plantsData";

// /**
//  * Chatbot that answers ONLY from the plantData record passed in route.params.plant
//  * - If a plant is passed, we extract fields (description, uses, leaves, warnings, etc.)
//  * - When user asks, we try to match keywords and return only that plant's info
//  * - No external API calls, free and deterministic
//  */

// export default function ChatbotScreen({ route, navigation }) {
//   const plant = route?.params?.plant || null;
//   const plantId = plant?.id || plant?.label || null;
//   // If plant param is just an id, pull full data:
//   const storedPlant = plant && plant.name ? plant : (plantId ? getPlantById(plantId) : null);

//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       from: "bot",
//       text: storedPlant
//         ? `Hi! I’m your plant assistant. Ask me anything about ${storedPlant.name}.`
//         : "Hi! I’m your plant assistant. Tell me the plant name or open detection first.",
//     },
//   ]);

//   const [input, setInput] = useState("");
//   const scrollRef = useRef();

//   useEffect(() => {
//     // scroll to bottom whenever messages change
//     scrollRef.current?.scrollToEnd({ animated: true });
//   }, [messages]);

//   const pushMessage = (from, text) => {
//     setMessages((m) => [...m, { id: Date.now() + Math.random(), from, text }]);
//   };

//   function getAnswerFromPlant(plantObj, userText) {
//     // guard
//     if (!plantObj) return "I don't have data for this plant. Open detection first.";

//     const t = (userText || "").toLowerCase();

//     // keyword checks - map keywords to plant fields
//     const checks = [
//       {
//         keys: ["use", "uses", "used", "application", "applications"],
//         get: () => {
//           if (plantObj.uses) {
//             // join different uses present
//             const parts = [];
//             if (plantObj.uses.medicinal) parts.push(`Medicinal: ${plantObj.uses.medicinal.join(", ")}`);
//             if (plantObj.uses.culinary) parts.push(`Culinary: ${plantObj.uses.culinary.join(", ")}`);
//             if (plantObj.uses.other) parts.push(`${plantObj.uses.other}`);
//             if (parts.length) return parts.join(" · ");
//           }
//           return plantObj.uses && typeof plantObj.uses === "string" ? plantObj.uses : "No specific uses recorded.";
//         },
//       },
//       {
//         keys: ["leaves", "leaf", "shape", "vein", "arrangement"],
//         get: () => {
//           if (plantObj.leaves) {
//             const parts = [];
//             if (plantObj.leaves.characteristics) parts.push(plantObj.leaves.characteristics.join("; "));
//             if (plantObj.leaves.identification) parts.push(plantObj.leaves.identification);
//             return parts.join(" ");
//           }
//           return "Leaf information not available.";
//         },
//       },
//       {
//         keys: ["scientific", "scientific name", "botanical"],
//         get: () => plantObj.scientificName || "Scientific name not available.",
//       },
//       {
//         keys: ["accuracy", "typical accuracy", "model accuracy"],
//         get: () =>
//           typeof plantObj.modelAccuracy === "number"
//             ? `Typical model accuracy: ${plantObj.modelAccuracy}%`
//             : plantObj.modelAccuracy || "No typical accuracy recorded.",
//       },
//       {
//         keys: ["warning", "warnings", "toxic", "side effect", "caution"],
//         get: () => {
//           if (plantObj.warnings) return Array.isArray(plantObj.warnings) ? plantObj.warnings.join("; ") : plantObj.warnings;
//           return "No warnings recorded for this plant.";
//         },
//       },
//       {
//         keys: ["habitat", "native", "where", "grow", "grows"],
//         get: () => plantObj.habitat || plantObj.region || plantObj.shortDescription || plantObj.description || "Habitat information not available.",
//       },
//       {
//         keys: ["description", "about", "tell me", "what is", "who is"],
//         get: () => plantObj.detailedDescription || plantObj.description || "No description available.",
//       },
//     ];

//     // try to match highest-priority check by seeing if any of its keywords appear in user text
//     for (const c of checks) {
//       for (const k of c.keys) {
//         if (t.includes(k)) {
//           return c.get();
//         }
//       }
//     }

//     // If nothing matched, return a concise summary (only from plant data)
//     const summaryParts = [];
//     if (plantObj.description) summaryParts.push(plantObj.description);
//     if (plantObj.leaves && plantObj.leaves.characteristics) summaryParts.push("Leaves: " + plantObj.leaves.characteristics.slice(0, 4).join(", "));
//     if (plantObj.uses && plantObj.uses.medicinal) summaryParts.push("Uses: " + plantObj.uses.medicinal.slice(0, 4).join(", "));
//     const summary = summaryParts.join(" ");
//     return summary || "I couldn't find a direct answer in the plant data. Try asking about uses, leaves, scientific name, or warnings.";
//   }

//   const sendMessage = () => {
//     const text = input.trim();
//     if (!text) return;

//     // Add user message
//     pushMessage("user", text);
//     setInput("");

//     // Compute reply synchronously from plant data (free)
//     const reply = getAnswerFromPlant(storedPlant, text);
//     // ensure reply is short and from the plant data only
//     pushMessage("bot", reply);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
//           <Icon name="arrow-back" size={22} color={colors.textPrimary} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Plant Assistant</Text>
//         <View style={{ width: 40 }} />
//       </View>

//       Plant summary card
//       {storedPlant ? (
//         <View style={styles.plantCard}>
//           <Text style={styles.plantName}>{storedPlant.name}</Text>
//           {storedPlant.scientificName ? <Text style={styles.plantSci}>{storedPlant.scientificName}</Text> : null}
//           {storedPlant.description ? <Text style={styles.plantDesc}>{storedPlant.description.slice(0, 220)}{storedPlant.description.length > 220 ? "..." : ""}</Text> : null}
//         </View>
//       ) : (
//         <View style={[styles.plantCard, { justifyContent: "center" }]}>
//           <Text style={styles.plantName}>No plant data</Text>
//           <Text style={styles.plantDesc}>Open detection results first so I know which plant to answer about.</Text>
//         </View>
//       )}

//       {/* Chat area */}
//       <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={80}>
//         <ScrollView ref={scrollRef} contentContainerStyle={styles.chatArea} showsVerticalScrollIndicator={false}>
//           {messages.map((m) => (
//             <View key={m.id} style={[styles.msgRow, m.from === "user" ? styles.msgRowUser : styles.msgRowBot]}>
//               <Text style={[styles.msgText, m.from === "user" ? styles.msgTextUser : styles.msgTextBot]}>{m.text}</Text>
//             </View>
//           ))}
//         </ScrollView>

//         <View style={styles.inputArea}>
//           <TextInput
//             value={input}
//             onChangeText={setInput}
//             placeholder="Ask about this plant (e.g. uses, leaves, warnings)..."
//             style={styles.input}
//             returnKeyType="send"
//             onSubmitEditing={sendMessage}
//           />
//           <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
//             <Icon name="send" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// /* ---------------------- STYLES ---------------------- */
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: colors.background },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: spacing.md,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.borderLight,
//   },
//   backBtn: { padding: 6 },
//   headerTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.semiBold, color: colors.textPrimary },

//   plantCard: {
//     backgroundColor: colors.surface,
//     margin: spacing.lg,
//     padding: spacing.lg,
//     borderRadius: borderRadius.lg,
//     elevation: 2,
//   },
//   plantName: { fontSize: fontSize.xl, fontWeight: fontWeight.semiBold, color: colors.textPrimary },
//   plantSci: { fontSize: fontSize.md, fontStyle: "italic", color: colors.textSecondary, marginBottom: spacing.sm },
//   plantDesc: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 20 },

//   chatArea: { padding: spacing.lg, paddingBottom: 20 },

//   msgRow: { maxWidth: "80%", marginBottom: 10, padding: 10, borderRadius: borderRadius.lg },
//   msgRowBot: { alignSelf: "flex-start", backgroundColor: colors.surface },
//   msgRowUser: { alignSelf: "flex-end", backgroundColor: colors.primaryLight },

//   msgText: { fontSize: fontSize.md, lineHeight: 20 },
//   msgTextBot: { color: colors.textPrimary },
//   msgTextUser: { color: colors.primaryDark },

//   inputArea: { flexDirection: "row", alignItems: "center", padding: spacing.sm, borderTopWidth: 1, borderTopColor: colors.borderLight, backgroundColor: colors.surface },
//   input: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.borderLight },
//   sendBtn: { marginLeft: 8, backgroundColor: colors.primary, padding: 10, borderRadius: 10 },
// });






// src/screens/ChatbotScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors, spacing, borderRadius, fontSize, fontWeight } from "../theme/colors";
import { getPlantById } from "../data/plantsData";

/**
 * Chatbot that answers ONLY from the plantData record passed in route.params.plant
 * - If a plant is passed, we extract fields (description, uses, leaves, warnings, etc.)
 * - When user asks, we try to match keywords and return only that plant's info
 * - No external API calls, free and deterministic
 */

export default function ChatbotScreen({ route, navigation }) {
  const plant = route?.params?.plant || null;
  const plantId = plant?.id || plant?.label || null;
  // If plant param is just an id, pull full data:
  const storedPlant = plant && plant.name ? plant : (plantId ? getPlantById(plantId) : null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: storedPlant
        ? `Hi! I’m your plant assistant. Ask me anything about ${storedPlant.name}.`
        : "Hi! I’m your plant assistant. Tell me the plant name or open detection first.",
    },
  ]);

  const [input, setInput] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    // scroll to bottom whenever messages change
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const pushMessage = (from, text) => {
    setMessages((m) => [...m, { id: Date.now() + Math.random(), from, text }]);
  };

  function getAnswerFromPlant(plantObj, userText) {
    // guard
    if (!plantObj) return "I don't have data for this plant. Open detection first.";

    const t = (userText || "").toLowerCase();

    // keyword checks - map keywords to plant fields
    const checks = [
      {
        keys: ["use", "uses", "used", "application", "applications"],
        get: () => {
          if (plantObj.uses) {
            // join different uses present
            const parts = [];
            if (plantObj.uses.medicinal) parts.push(`Medicinal: ${plantObj.uses.medicinal.join(", ")}`);
            if (plantObj.uses.culinary) parts.push(`Culinary: ${plantObj.uses.culinary.join(", ")}`);
            if (plantObj.uses.other) parts.push(`${plantObj.uses.other}`);
            if (parts.length) return parts.join(" · ");
          }
          return plantObj.uses && typeof plantObj.uses === "string" ? plantObj.uses : "No specific uses recorded.";
        },
      },
      {
        keys: ["leaves", "leaf", "shape", "vein", "arrangement"],
        get: () => {
          if (plantObj.leaves) {
            const parts = [];
            if (plantObj.leaves.characteristics) parts.push(plantObj.leaves.characteristics.join("; "));
            if (plantObj.leaves.identification) parts.push(plantObj.leaves.identification);
            return parts.join(" ");
          }
          return "Leaf information not available.";
        },
      },
      {
        keys: ["scientific", "scientific name", "botanical"],
        get: () => plantObj.scientificName || "Scientific name not available.",
      },
      {
        keys: ["accuracy", "typical accuracy", "model accuracy"],
        get: () =>
          typeof plantObj.modelAccuracy === "number"
            ? `Typical model accuracy: ${plantObj.modelAccuracy}%`
            : plantObj.modelAccuracy || "No typical accuracy recorded.",
      },
      {
        keys: ["warning", "warnings", "toxic", "side effect", "caution"],
        get: () => {
          if (plantObj.warnings) return Array.isArray(plantObj.warnings) ? plantObj.warnings.join("; ") : plantObj.warnings;
          return "No warnings recorded for this plant.";
        },
      },
      {
        keys: ["habitat", "native", "where", "grow", "grows"],
        get: () => plantObj.habitat || plantObj.region || plantObj.shortDescription || plantObj.description || "Habitat information not available.",
      },
      {
        keys: ["description", "about", "tell me", "what is", "who is"],
        get: () => plantObj.detailedDescription || plantObj.description || "No description available.",
      },
    ];

    // try to match highest-priority check by seeing if any of its keywords appear in user text
    for (const c of checks) {
      for (const k of c.keys) {
        if (t.includes(k)) {
          return c.get();
        }
      }
    }

    // If nothing matched, return a concise summary (only from plant data)
    const summaryParts = [];
    if (plantObj.description) summaryParts.push(plantObj.description);
    if (plantObj.leaves && plantObj.leaves.characteristics) summaryParts.push("Leaves: " + plantObj.leaves.characteristics.slice(0, 4).join(", "));
    if (plantObj.uses && plantObj.uses.medicinal) summaryParts.push("Uses: " + plantObj.uses.medicinal.slice(0, 4).join(", "));
    const summary = summaryParts.join(" ");
    return summary || "I couldn't find a direct answer in the plant data. Try asking about uses, leaves, scientific name, or warnings.";
  }

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    // Add user message
    pushMessage("user", text);
    setInput("");

    // Compute reply synchronously from plant data (free)
    const reply = getAnswerFromPlant(storedPlant, text);
    // ensure reply is short and from the plant data only
    pushMessage("bot", reply);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plant Assistant</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Chat area (NO plant summary card) */}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={80}>
        <ScrollView ref={scrollRef} contentContainerStyle={styles.chatArea} showsVerticalScrollIndicator={false}>
          {messages.map((m) => (
            <View key={m.id} style={[styles.msgRow, m.from === "user" ? styles.msgRowUser : styles.msgRowBot]}>
              <Text style={[styles.msgText, m.from === "user" ? styles.msgTextUser : styles.msgTextBot]}>{m.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputArea}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask about this plant (e.g. uses, leaves, warnings)..."
            style={styles.input}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <Icon name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

/* ---------------------- STYLES ---------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backBtn: { padding: 6 },
  headerTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.semiBold, color: colors.textPrimary },

  chatArea: { padding: spacing.lg, paddingBottom: 20 },

  msgRow: { maxWidth: "80%", marginBottom: 10, padding: 10, borderRadius: borderRadius.lg },
  msgRowBot: { alignSelf: "flex-start", backgroundColor: colors.surface },
  msgRowUser: { alignSelf: "flex-end", backgroundColor: colors.primaryLight },

  msgText: { fontSize: fontSize.md, lineHeight: 20 },
  msgTextBot: { color: colors.textPrimary },
  msgTextUser: { color: colors.primaryDark },

  inputArea: { flexDirection: "row", alignItems: "center", padding: spacing.sm, borderTopWidth: 1, borderTopColor: colors.borderLight, backgroundColor: colors.surface },
  input: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.borderLight },
  sendBtn: { marginLeft: 8, backgroundColor: colors.primary, padding: 10, borderRadius: 10 },
});





// src/screens/ChatbotScreen.js
// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { colors, spacing, borderRadius, fontSize, fontWeight } from "../theme/colors";
// import { getPlantById } from "../data/plantsData";

// /**
//  * Chatbot that queries the secure backend (which calls Hugging Face).
//  * If backend is unreachable, falls back to local deterministic answer getAnswerFromPlant.
//  *
//  * Set BACKEND_URL to your server (use HTTPS in production).
//  */
// const BACKEND_URL = "http://YOUR_SERVER_IP:3000"; // replace with your running server (or ngrok https url)

// export default function ChatbotScreen({ route, navigation }) {
//   const plant = route?.params?.plant || null;
//   const plantId = plant?.id || plant?.label || null;
//   const storedPlant = plant && plant.name ? plant : (plantId ? getPlantById(plantId) : null);

//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       from: "bot",
//       text: storedPlant
//         ? `Hi! I’m your plant assistant. Ask me anything about ${storedPlant.name}.`
//         : "Hi! I’m your plant assistant. Tell me the plant name or open detection first.",
//     },
//   ]);

//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const scrollRef = useRef();

//   useEffect(() => {
//     scrollRef.current?.scrollToEnd({ animated: true });
//   }, [messages]);

//   const pushMessage = (from, text) => {
//     setMessages((m) => [...m, { id: Date.now() + Math.random(), from, text }]);
//   };

//   // Local deterministic answer (your original logic). Used as fallback.
//   function getAnswerFromPlant(plantObj, userText) {
//     if (!plantObj) return "I don't have data for this plant. Open detection first.";

//     const t = (userText || "").toLowerCase();

//     const checks = [
//       {
//         keys: ["use", "uses", "used", "application", "applications"],
//         get: () => {
//           if (plantObj.uses) {
//             const parts = [];
//             if (plantObj.uses.medicinal) parts.push(`Medicinal: ${plantObj.uses.medicinal.join(", ")}`);
//             if (plantObj.uses.culinary) parts.push(`Culinary: ${plantObj.uses.culinary.join(", ")}`);
//             if (plantObj.uses.other) parts.push(`${plantObj.uses.other}`);
//             if (parts.length) return parts.join(" · ");
//           }
//           return plantObj.uses && typeof plantObj.uses === "string" ? plantObj.uses : "No specific uses recorded.";
//         },
//       },
//       {
//         keys: ["leaves", "leaf", "shape", "vein", "arrangement"],
//         get: () => {
//           if (plantObj.leaves) {
//             const parts = [];
//             if (plantObj.leaves.characteristics) parts.push(plantObj.leaves.characteristics.join("; "));
//             if (plantObj.leaves.identification) parts.push(plantObj.leaves.identification);
//             return parts.join(" ");
//           }
//           return "Leaf information not available.";
//         },
//       },
//       {
//         keys: ["scientific", "scientific name", "botanical"],
//         get: () => plantObj.scientificName || "Scientific name not available.",
//       },
//       {
//         keys: ["accuracy", "typical accuracy", "model accuracy"],
//         get: () =>
//           typeof plantObj.modelAccuracy === "number"
//             ? `Typical model accuracy: ${plantObj.modelAccuracy}%`
//             : plantObj.modelAccuracy || "No typical accuracy recorded.",
//       },
//       {
//         keys: ["warning", "warnings", "toxic", "side effect", "caution"],
//         get: () => {
//           if (plantObj.warnings) return Array.isArray(plantObj.warnings) ? plantObj.warnings.join("; ") : plantObj.warnings;
//           return "No warnings recorded for this plant.";
//         },
//       },
//       {
//         keys: ["habitat", "native", "where", "grow", "grows"],
//         get: () => plantObj.habitat || plantObj.region || plantObj.shortDescription || plantObj.description || "Habitat information not available.",
//       },
//       {
//         keys: ["description", "about", "tell me", "what is", "who is"],
//         get: () => plantObj.detailedDescription || plantObj.description || "No description available.",
//       },
//     ];

//     for (const c of checks) {
//       for (const k of c.keys) {
//         if (t.includes(k)) {
//           return c.get();
//         }
//       }
//     }

//     const summaryParts = [];
//     if (plantObj.description) summaryParts.push(plantObj.description);
//     if (plantObj.leaves && plantObj.leaves.characteristics) summaryParts.push("Leaves: " + plantObj.leaves.characteristics.slice(0, 4).join(", "));
//     if (plantObj.uses && plantObj.uses.medicinal) summaryParts.push("Uses: " + plantObj.uses.medicinal.slice(0, 4).join(", "));
//     const summary = summaryParts.join(" ");
//     return summary || "I couldn't find a direct answer in the plant data. Try asking about uses, leaves, scientific name, or warnings.";
//   }

//   const sendMessage = async () => {
//     const text = input.trim();
//     if (!text) return;

//     pushMessage("user", text);
//     setInput("");
//     setLoading(true);

//     // Attempt to call backend proxy
//     try {
//       const resp = await fetch(`${BACKEND_URL}/chat`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ plant: storedPlant || {}, message: text, max_tokens: 120 }),
//       });

//       if (!resp.ok) {
//         // fallback to local deterministic answer
//         const jsonErr = await resp.json().catch(() => ({}));
//         console.warn("Backend returned non-OK:", jsonErr);
//         const fallback = getAnswerFromPlant(storedPlant, text);
//         pushMessage("bot", fallback);
//         return;
//       }

//       const json = await resp.json();
//       let reply = null;
//       if (json?.reply) reply = json.reply;
//       else if (json?.raw) {
//         // try to extract common generated_text
//         if (Array.isArray(json.raw) && json.raw[0]?.generated_text) reply = json.raw[0].generated_text;
//         else reply = JSON.stringify(json.raw).slice(0, 800);
//       } else if (json?.error) {
//         console.warn("Model/backend error:", json.error);
//         reply = getAnswerFromPlant(storedPlant, text); // fallback
//       }

//       if (!reply) reply = "Sorry, I couldn't get a reply. Try again or check your network.";
//       pushMessage("bot", reply);
//     } catch (err) {
//       console.error("Network error, falling back to local answers:", err);
//       const fallback = getAnswerFromPlant(storedPlant, text);
//       pushMessage("bot", fallback);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
//           <Icon name="arrow-back" size={22} color={colors.textPrimary} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Plant Assistant</Text>
//         <View style={{ width: 40 }} />
//       </View>

//       <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={80}>
//         <ScrollView ref={scrollRef} contentContainerStyle={styles.chatArea} showsVerticalScrollIndicator={false}>
//           {messages.map((m) => (
//             <View key={m.id} style={[styles.msgRow, m.from === "user" ? styles.msgRowUser : styles.msgRowBot]}>
//               <Text style={[styles.msgText, m.from === "user" ? styles.msgTextUser : styles.msgTextBot]}>{m.text}</Text>
//             </View>
//           ))}
//         </ScrollView>

//         <View style={styles.inputArea}>
//           <TextInput
//             value={input}
//             onChangeText={setInput}
//             placeholder="Ask about this plant (e.g. uses, leaves, warnings)..."
//             style={styles.input}
//             returnKeyType="send"
//             onSubmitEditing={sendMessage}
//             editable={!loading}
//           />
//           <TouchableOpacity onPress={sendMessage} style={styles.sendBtn} disabled={loading}>
//             <Icon name={loading ? "hourglass-top" : "send"} size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// /* ---------------------- STYLES ---------------------- */
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: colors.background },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: spacing.md,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.borderLight,
//   },
//   backBtn: { padding: 6 },
//   headerTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.semiBold, color: colors.textPrimary },

//   chatArea: { padding: spacing.lg, paddingBottom: 20 },

//   msgRow: { maxWidth: "80%", marginBottom: 10, padding: 10, borderRadius: borderRadius.lg },
//   msgRowBot: { alignSelf: "flex-start", backgroundColor: colors.surface },
//   msgRowUser: { alignSelf: "flex-end", backgroundColor: colors.primaryLight },

//   msgText: { fontSize: fontSize.md, lineHeight: 20 },
//   msgTextBot: { color: colors.textPrimary },
//   msgTextUser: { color: colors.primaryDark },

//   inputArea: { flexDirection: "row", alignItems: "center", padding: spacing.sm, borderTopWidth: 1, borderTopColor: colors.borderLight, backgroundColor: colors.surface },
//   input: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.borderLight },
//   sendBtn: { marginLeft: 8, backgroundColor: colors.primary, padding: 10, borderRadius: 10 },
// });
