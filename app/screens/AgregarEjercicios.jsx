import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import ejerciciosDisponibles from '../components/EjerciciosDisponibles.js';

const AgregarEjercicios = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { day, muscles } = route.params;
    const [selectedExercises, setSelectedExercises] = useState({});
    const db = getFirestore();

    const filteredExercises = ejerciciosDisponibles.filter(ejercicio =>
        ejercicio.muscles.some(muscle => muscles.includes(muscle))
    );

    const toggleExercise = (exerciseId) => {
        setSelectedExercises((prevSelected) => ({
            ...prevSelected,
            [exerciseId]: !prevSelected[exerciseId]
        }));
    };
    
    const saveSelection = async () => {
        try {
            const selectedExercisesDetails = filteredExercises
                .filter((exercise) => selectedExercises[exercise.id])
                .map((exercise) => ({
                    id: exercise.id,
                    name: exercise.name,
                    image: exercise.image,
                    muscles: exercise.muscles,
                }));
    
            const splitRef = doc(db, `splits/${day}`);
            await setDoc(splitRef, { [`dias.${day}`]: selectedExercisesDetails }, { merge: true });
            navigation.navigate('CrearSplitScreen');
        } catch (error) {
            console.error('Error guardando ejercicios: ', error);
        }
    };

    const renderExerciseItem = ({ item }) => {
        const isSelected = selectedExercises[item.id];
        return (
            <View style={[styles.exerciseContainer, isSelected && styles.exerciseSelected]}>
                <TouchableOpacity onPress={() => toggleExercise(item.id)}>
                    <Image source={item.image} style={styles.exerciseImage} />
                    <Text style={styles.exerciseName}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar Ejercicios para {day}</Text>
            <FlatList
                data={filteredExercises}
                keyExtractor={(item) => item.id}
                renderItem={renderExerciseItem}
                numColumns={2}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveSelection}>
                <Text style={styles.saveButtonText}>Guardar Selección</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white', // White font color
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'NotoSans',
    },
    listContainer: {
        paddingBottom: 20,
    },
    exerciseContainer: {
        flex: 1,
        margin: 8,
        backgroundColor: '#1e1e1e', // Darker background for exercise container
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        elevation: 3,
        padding: 10,
    },
    exerciseSelected: {
        borderColor: '#4CAF50',
        borderWidth: 2,
        backgroundColor: '#2e2e2e',
    },
    exerciseImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white', // White font color
        textAlign: 'center',
        fontFamily: 'NotoSans',
    },
    selectedText: {
        marginTop: 5,
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    saveButton: {
        marginTop: 20,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'NotoSans',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white', // White font color
        marginRight: 10,
        fontFamily: 'NotoSans',
    },
    input: {
        height: 40,
        width: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#222', // Dark input background
        color: 'white', // White input text color
        fontFamily: 'NotoSans',
    },
});

export default AgregarEjercicios;
