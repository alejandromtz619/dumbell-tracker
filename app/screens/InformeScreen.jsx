import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import appFirebase from '../../firebase';

const InformeScreen = () => {
  const [weeklyReport, setWeeklyReport] = useState({
    totalSets: 0,
    totalReps: 0,
    daysTrained: 0,
    muscleGroups: [],
    exercisesCompleted: []
  });

  const db = getFirestore(appFirebase);

  useEffect(() => {
    const fetchWeeklyReport = async () => {
      const splitId = await AsyncStorage.getItem('currentSplitId');
      if (!splitId) return;

      const splitRef = doc(db, "splits", splitId);
      const docSnap = await getDoc(splitRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const weeklySummary = {
          totalSets: 0,
          totalReps: 0,
          daysTrained: 0,
          muscleGroups: new Set(),
          exercisesCompleted: []
        };

        // Recorre cada día en el documento y acumula datos
        for (const day in data.dias) {
          const dayData = data.dias[day];

          if (dayData.completedExercises) {
            weeklySummary.daysTrained += 1;

            dayData.completedExercises.forEach(exercise => {
              weeklySummary.totalSets += exercise.sets;
              weeklySummary.totalReps += exercise.reps;
              weeklySummary.muscleGroups.add(exercise.muscleGroup);
              weeklySummary.exercisesCompleted.push({
                name: exercise.name,
                sets: exercise.sets,
                reps: exercise.reps
              });
            });
          }
        }

        setWeeklyReport({
          totalSets: weeklySummary.totalSets,
          totalReps: weeklySummary.totalReps,
          daysTrained: weeklySummary.daysTrained,
          muscleGroups: Array.from(weeklySummary.muscleGroups),
          exercisesCompleted: weeklySummary.exercisesCompleted
        });
      }
    };

    fetchWeeklyReport();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informe Semanal</Text>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>Días entrenados: {weeklyReport.daysTrained}</Text>
        <Text style={styles.summaryText}>Grupos musculares: {weeklyReport.muscleGroups.join(', ')}</Text>
        <Text style={styles.summaryText}>Total de Sets: {weeklyReport.totalSets}</Text>
        <Text style={styles.summaryText}>Total de Reps: {weeklyReport.totalReps}</Text>
      </View>

      <Text style={styles.subTitle}>Ejercicios Completados:</Text>
      <FlatList
        data={weeklyReport.exercisesCompleted}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseDetail}>Sets: {item.sets} - Reps: {item.reps}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20
  },
  summaryBox: {
    backgroundColor: '#2c2c2e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },
  summaryText: {
    color: '#dcdcdc',
    fontSize: 16,
    marginBottom: 5
  },
  subTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  },
  exerciseItem: {
    backgroundColor: '#3a3a3c',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5
  },
  exerciseName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  exerciseDetail: {
    color: '#dcdcdc',
    fontSize: 14
  }
});

export default InformeScreen;
