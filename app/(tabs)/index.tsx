import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 App Education</Text>

      <Text style={styles.subtitle}>
        Bienvenue dans ton application de cours et quiz
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/lessons")}
      >
        <Text style={styles.buttonText}>📖 Voir les leçons</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={() => router.push("/quiz")}
      >
        <Text style={styles.buttonText}>🧪 Faire un quiz</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});