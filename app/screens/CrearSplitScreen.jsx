import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import appFirebase from '../../firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = getFirestore(appFirebase);

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const musculos = ["Cuadriceps", "Femorales", "Glúteos", "Pantorrillas", "Pechos", "Tríceps", "Hombros", "Bíceps", "Espalda", "Abdomen"];

const CrearSplitScreen = () => {
    const navigation = useNavigation();
    const [expandedDay, setExpandedDay] = useState(null);
    const [selectedMuscles, setSelectedMuscles] = useState({});

    const toggleDay = (day) => {
        setExpandedDay(expandedDay === day ? null : day);
    };

    const toggleMuscle = (day, muscle) => {
        setSelectedMuscles((prevSelected) => {
            const currentDaySelection = prevSelected[day] || [];
            const isSelected = currentDaySelection.includes(muscle);
            const newSelection = isSelected
                ? currentDaySelection.filter((m) => m !== muscle)
                : [...currentDaySelection, muscle];
            return { ...prevSelected, [day]: newSelection };
        });
    };

    const saveSplitToFirestore = async () => {
        try {
            const splitRef = await addDoc(collection(db, "splits"), { dias: selectedMuscles });
            const splitId = splitRef.id;
    
            await AsyncStorage.setItem('currentSplitId', splitId);
            
            alert('Rutina guardada exitosamente');
            navigation.navigate('Workout');
        } catch (error) {
            console.error("Error al guardar la rutina completa: ", error);
            alert("Error al guardar la rutina.");
        }
    };

    const renderMuscleItem = ({ item: muscle, day }) => {
        const isSelected = selectedMuscles[day]?.includes(muscle);
        return (
            <TouchableOpacity
                onPress={() => toggleMuscle(day, muscle)}
                style={[styles.muscleButton, isSelected && styles.muscleButtonSelected]}
            >
                <Text style={[styles.muscleText, isSelected && styles.muscleTextSelected]}>{muscle}</Text>
            </TouchableOpacity>
        );
    };

    const renderDay = ({ item: day }) => (
        <View style={styles.dayContainer}>
            <TouchableOpacity style={styles.dayHeader} onPress={() => toggleDay(day)}>
                <Text style={styles.dayText}>{day}</Text>
                <Ionicons name={expandedDay === day ? "chevron-up" : "chevron-down"} size={20} color="white" />
            </TouchableOpacity>
            {expandedDay === day && (
                <>
                    <FlatList
                        data={musculos}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => renderMuscleItem({ item, day })}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                    />
                    {selectedMuscles[day]?.length > 0 && (
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => {
                                navigation.navigate('AgregarEjercicios', {
                                    day,
                                    muscles: selectedMuscles[day],
                                });
                            }}
                        >
                            <Text style={styles.addButtonText}>Agregar Ejercicios</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Elige músculos a entrenar por día</Text>
            <FlatList
                data={diasSemana}
                keyExtractor={(item) => item}
                renderItem={renderDay}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={saveSplitToFirestore}>
                <Text style={styles.confirmButtonText}>Confirmar Rutina</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Workout')}>
                <Text style={styles.backButtonText}>Volver a Workout</Text>
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
    dayContainer: {
        marginBottom: 10,
        backgroundColor: '#1e1e1e', // Darker background for day container
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
    },
    dayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#333', // Darker background for day header
    },
    dayText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white', // White font color
        fontFamily: 'NotoSans',
    },
    muscleButton: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: '#444', // Darker background for muscle button
        borderRadius: 8,
        alignItems: 'center',
    },
    muscleButtonSelected: {
        backgroundColor: '#4CAF50',
    },
    muscleText: {
        fontSize: 16,
        color: 'white', // White font color
        fontFamily: 'NotoSans',
    },
    muscleTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        marginTop: 10,
        marginHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'NotoSans',
    },
    confirmButton: {
        marginTop: 20,
        paddingVertical: 15,
        backgroundColor: '#6200ee',
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'NotoSans',
    },
    backButton: {
        marginTop: 10,
        paddingVertical: 15,
        backgroundColor: '#e74c3c',
        borderRadius: 8,
        alignItems: 'center',
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'NotoSans',
    }
});

export default CrearSplitScreen;
