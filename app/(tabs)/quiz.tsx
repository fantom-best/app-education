import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { blue } from "react-native-reanimated/lib/typescript/Colors";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const router = useRouter();

  const questions = [
    {
      question: "HTML signifie ?",
      options: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "Hyper Transfer Markup Language",
      ],
      answer: "HyperText Markup Language",
    },
    {
      question: "Quel langage est principalement utilisé pour styliser les pages web ?",
      options: ["HTML", "CSS", "JavaScript", "Python"],
      answer: "CSS",
    },
    {
      question: "Quel est le rôle principal de JavaScript dans le développement web ?",
      options: [
        "Structurer le contenu",
        "Styliser les éléments",
        "Ajouter de l'interactivit",
        "GGrer les bases de donnes",
      ],
      answer: "Ajouter de l'interactivité",
    },
    {
      question: "Quelle balise HTML est utilisée pour créer un lien hypertexte ?",
      options: ["<a>", "<link>", "<href>", "<url>"],
      answer: "<a>",
    },
    {
      question: "Quel est l'acronyme de CSS ?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style System",
        "Code Style Syntax",
      ],
      answer: "Cascading Style Sheets",
    },
    {
      question: "Quelle commande Git est utilisée pour cloner un dépôt ?",
      options: ["git init", "git clone", "git pull", "git push"],
      answer: "git clone",
    },
    {
      question: "Quel framework JavaScript est connu pour sa réactivité et ses composants ?",
      options: ["Angular", "React", "Vue.js", "Ember"],
      answer: "React",
    },
    {
      question: "Quelle est la fonction de 'console.log()' en JavaScript ?",
      options: [
        "Afficher un message dans la console",
        "Créer une boucle",
        "Définir une variable",
        "Appeler une fonction",
      ],
      answer: "Afficher un message dans la console",
    },
    {
      question: "Quel protocole est utilisé pour les communications sécurisées sur le web ?",
      options: ["HTTP", "HTTPS", "FTP", "SMTP"],
      answer: "HTTPS",
    },
    {
      question: "Quelle base de données est NoSQL et orientée documents ?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
      answer: "MongoDB",
    },
    {
      question: "Quel est le rôle d'un IDE dans le développement logiciel ?",
      options: [
        "Exécuter le code",
        "Faciliter l'écriture et le débogage du code",
        "Stocker les fichiers",
        "Gérer les versions",
      ],
      answer: "Faciliter l'�criture et le d�bogage du code",
    },
  ];

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, []);

  const totalQuestions = shuffledQuestions.length;

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setShuffledQuestions(shuffleArray(questions));
    router.push('/');
  };

  const handleAnswer = (option: string) => {
    setSelected(option);

    if (option === shuffledQuestions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);

    const next = currentQuestion + 1;

    if (next < shuffledQuestions.length) {
      setCurrentQuestion(next);
    } else {
      setShowResult(true);
    }
  };

  // ?? �cran final
  if (showResult) {
    return (
      <ThemedView style={styles.background}>
        <View style={styles.quizCard}>
          <Text style={styles.title}>🏆 Quiz terminé !</Text>
          <Text style={styles.score}>
            Ton score : {score} / {shuffledQuestions.length}
          </Text>
          <Pressable style={[styles.homeButton, { backgroundColor: tintColor }]} onPress={() => router.push('/')}>
            <Text style={styles.text}>Retour à l'accueil 🏠</Text>
          </Pressable>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.background}>
      <View style={styles.quizCard}>
        {shuffledQuestions.length > 0 ? (
          <>
            <ThemedView style={styles.header}>
              <Text style={styles.progress}>
                Question {currentQuestion + 1} / {totalQuestions}
              </Text>
              <Pressable style={styles.cancelButton} onPress={resetQuiz}>
                <Text style={styles.cancelText}>Annuler</Text>
              </Pressable>
            </ThemedView>
            <ThemedText style={styles.question}>
              {shuffledQuestions[currentQuestion]?.question}
            </ThemedText>

            {shuffledQuestions[currentQuestion]?.options.map((option: string, index: number) => {
              const isCorrect = option === shuffledQuestions[currentQuestion].answer;
              const isSelected = option === selected;

              let optionBackgroundColor = tintColor;
              if (selected) {
                if (isCorrect) optionBackgroundColor = "green";
                else if (isSelected) optionBackgroundColor = "red";
              }

              return (
                <Pressable
                  key={index}
                  style={[styles.button, { backgroundColor: optionBackgroundColor }]}
                  onPress={() => handleAnswer(option)}
                  disabled={selected !== null}
                >
                  <ThemedText style={styles.text}>{option}</ThemedText>
                </Pressable>
              );
            })}

            {selected && (
              <>
                <Text style={styles.feedback}>
                  {selected === shuffledQuestions[currentQuestion].answer
                    ? '✅ Bonne réponse !'
                    : '❌ Mauvaise réponse'}
                </Text>

                <Pressable style={[styles.nextButton, { backgroundColor: tintColor }]} onPress={nextQuestion}>
                  <Text style={styles.text}>Suivant ➡️</Text>
                </Pressable>
              </>
            )}
          </>
        ) : (
          <Text>Chargement des questions...</Text>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#e0f2fe', // bleu clair pour la visibilité
    padding: 10,
  },
  quizCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#121111',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#38bdf8', // bleu accent
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  progress: {
    color: "#e4eaee",
    fontSize: 16,
  },
  cancelButton: {
    padding: 10,
  },
  cancelText: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
  // question: {
  //   fontSize: 20,
  //   marginBottom: 20,
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  question: {
    color: "",
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: "",
    fontSize: 16,
    fontWeight: "600",
  },
  feedback: {
    marginTop: 15,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  nextButton: {
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  score: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
  },
  homeButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#3178a7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
