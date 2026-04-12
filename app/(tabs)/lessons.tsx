import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import api from "../../.expo/services/api";
import { useRouter } from "expo-router";
import { AxiosResponse } from "axios";

interface Lesson {
  id: string;
  title: string;
}

export default function Lessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const router = useRouter();

  useEffect(() => {
    api.get("/lessons")
      .then((res: AxiosResponse<Lesson[]>) => {
        const lessonsWithStringId = res.data.map((lesson: any) => ({
          ...lesson,
          id: String(lesson.id),
        }));
        setLessons(lessonsWithStringId);
      })
      .catch((err: any) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 Liste des leçons</Text>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
          >
            <Text style={styles.text}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});