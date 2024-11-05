import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import appFirebase from '../../firebase';
import ejerciciosDisponibles from '../components/EjerciciosDisponibles.js';

const WorkoutOTDScreen = () => {
  const [exercises, setExercises] = useState([]);
  const [completed, setCompleted] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const db = getFirestore(appFirebase);
  const navigation = useNavigation();

  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const today = new Date().getDay();
  const dayName = dayNames[today];

  useEffect(() => {
    const loadTodayRoutine = async () => {
      const splitId = await AsyncStorage.getItem('currentSplitId');
      if (!splitId) return;

      const splitRef = doc(db, "splits", splitId);
      const docSnap = await getDoc(splitRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const musclesForToday = data.dias[dayName] || [];

        const exercisesForToday = ejerciciosDisponibles.filter(exercise =>
          exercise.muscles.some(muscle => musclesForToday.includes(muscle))
        ).map(exercise => ({
          ...exercise,
          sets: exercise.sets || 3,
          reps: exercise.reps || 10,
        }));

        setExercises(exercisesForToday);
      } else {
        console.log("No existe el split");
      }
    };

    const loadCompletedExercises = async () => {
      const completedExercises = await AsyncStorage.getItem('completedExercises');
      if (completedExercises) {
        setCompleted(JSON.parse(completedExercises));
      }
    };

    loadTodayRoutine();
    loadCompletedExercises();
  }, []);

  const handleInputChange = (exerciseId, field, value) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const markExerciseAsComplete = (exerciseId) => {
    setCompleted((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  const renderExerciseItem = ({ item }) => (
    <View style={[styles.exerciseContainer, completed[item.id] && styles.completed]}>
      <Image source={item.image} style={styles.exerciseImage} />
      <Text style={styles.exerciseName}>{item.name}</Text>
      <TextInput
        placeholder="Sets realizados"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        style={styles.input}
        value={item.sets?.toString()}
        onChangeText={(value) => handleInputChange(item.id, 'sets', value)}
      />
      <TextInput
        placeholder="Reps realizadas"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        style={styles.input}
        value={item.reps?.toString()}
        onChangeText={(value) => handleInputChange(item.id, 'reps', value)}
      />
      <TouchableOpacity onPress={() => markExerciseAsComplete(item.id)} style={styles.completeButton}>
        <Text style={completed[item.id] ? styles.completedText : styles.incompleteText}>
          {completed[item.id] ? 'Completado' : 'Marcar Completo'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const finalizeRoutine = async () => {
    try {
      const completedExercises = exercises.map(({ id, sets, reps }) => ({
        id,
        sets: parseInt(sets),
        reps: parseInt(reps),
      }));

      const splitRef = doc(db, "splits", await AsyncStorage.getItem('currentSplitId'));
      await setDoc(splitRef, { [`dias.${dayName}.completedExercises`]: completedExercises }, { merge: true });

      setIsCompleted(true);
    } catch (error) {
      console.error('Error guardando rutina completada: ', error);
    }
  };

  const allExercisesCompleted = exercises.every((exercise) => completed[exercise.id]);

  const currentTime = new Date();
  const formattedTime = `${currentTime.toLocaleDateString('es-ES', { weekday: 'long' })} ${currentTime.toLocaleTimeString('es-ES')}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rutina de Hoy</Text>
      <Text style={styles.dateText}>{formattedTime}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Workout')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Volver a Workout</Text>
      </TouchableOpacity>
      {isCompleted ? (
        <Text style={styles.completedMessage}>Ya has realizado tu última rutina. Vuelve más tarde o crea un nuevo split.</Text>
      ) : (
        <>
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={renderExerciseItem}
          />
          <TouchableOpacity
            onPress={finalizeRoutine}
            style={[styles.finalizeButton, allExercisesCompleted ? {} : { opacity: 0.5 }]}
            disabled={!allExercisesCompleted}
          >
            <Text style={styles.finalizeButtonText}>Finalizar Rutina</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  exerciseContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    alignItems: 'center',
  },
  exerciseImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#333',
    color: '#ffffff',
    borderRadius: 5,
    textAlign: 'center',
  },
  completeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  completedText: {
    color: '#ffffff',
  },
  incompleteText: {
    color: '#121212',
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#ffffff',
  },
  completedMessage: {
    color: '#ffffff',
    textAlign: 'center',
  },
  finalizeButton: {
    padding: 15,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  finalizeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutOTDScreen;
