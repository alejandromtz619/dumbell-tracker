import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import SelectionModal from '../components/SelectionModal'; // Asegúrate de importar el componente correctamente
import CaloriasInfoModal from '../components/CaloriasInfoModal'; // Asegúrate de importar el componente correctamente

const CaloriasScreen = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('Poco');
  const [sex, setSex] = useState('Masculino');
  const [goal, setGoal] = useState('Bajar de peso');
  const [calories, setCalories] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);

  const navigation = useNavigation();

  const activityOptions = [
    { label: 'Poco', value: 'Poco' },
    { label: 'Ligero', value: 'Ligero' },
    { label: 'Moderado', value: 'Moderado' },
    { label: 'Fuerte', value: 'Fuerte' },
  ];

  const sexOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
  ];

  const goalOptions = [
    { label: 'Bajar de peso', value: 'Bajar de peso' },
    { label: 'Subir de peso', value: 'Subir de peso' },
  ];

  const handleSelect = (value) => {
    if (currentSelection === 'activity') {
      setActivityLevel(value);
    } else if (currentSelection === 'sex') {
      setSex(value);
    } else if (currentSelection === 'goal') {
      setGoal(value);
    }
    setModalVisible(false);
  };

  const calculateCalories = () => {
    let bmr;
    if (sex === 'Masculino') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    let activityMultiplier;
    switch (activityLevel) {
      case 'Poco':
        activityMultiplier = 1.2;
        break;
      case 'Ligero':
        activityMultiplier = 1.375;
        break;
      case 'Moderado':
        activityMultiplier = 1.55;
        break;
      case 'Fuerte':
        activityMultiplier = 1.725;
        break;
      default:
        activityMultiplier = 1.2;
    }

    let dailyCalories = bmr * activityMultiplier;
    if (goal === 'Bajar de peso') {
      dailyCalories -= 500;
    } else if (goal === 'Subir de peso') {
      dailyCalories += 500;
    }

    setCalories(dailyCalories);
  };

  const clearInputs = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setActivityLevel('Poco');
    setSex('Masculino');
    setGoal('Bajar de peso');
    setCalories(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0a0a0a" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Calculadora de Calorías Diarias</Text>

        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Edad"
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Peso (kg)"
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          placeholder="Altura (cm)"
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <TouchableOpacity
          style={styles.selector}
          onPress={() => {
            setCurrentSelection('activity');
            setModalVisible(true);
          }}
        >
          <Text style={styles.selectorText}>Nivel de Actividad: {activityLevel}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selector}
          onPress={() => {
            setCurrentSelection('sex');
            setModalVisible(true);
          }}
        >
          <Text style={styles.selectorText}>Sexo: {sex}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selector}
          onPress={() => {
            setCurrentSelection('goal');
            setModalVisible(true);
          }}
        >
          <Text style={styles.selectorText}>Objetivo: {goal}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.calculateButton]} onPress={calculateCalories}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        {calories && (
          <Text style={styles.result}>
            Calorías diarias recomendadas: {Math.round(calories)}
          </Text>
        )}

        <TouchableOpacity onPress={() => setInfoModalVisible(true)}>
          <Text style={styles.infoText}>¿Qué son las Calorías Diarias?</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearInputs}>
            <Text style={styles.buttonText}>Limpiar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.navigate('Calculator')}>
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <SelectionModal
          visible={modalVisible}
          options={
            currentSelection === 'activity'
              ? activityOptions
              : currentSelection === 'sex'
              ? sexOptions
              : goalOptions
          }
          onSelect={handleSelect}
          onClose={() => setModalVisible(false)}
        />

        <CaloriasInfoModal visible={infoModalVisible} onClose={() => setInfoModalVisible(false)} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a0a', // Dark background color
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0a0a0a', // Dark background color
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    textAlign: 'center',
    color: 'white', // White font color
    fontFamily: 'NotoSans',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#222', // Dark input background
    color: 'white', // White input text color
    fontFamily: 'NotoSans',
  },
  selector: {
    width: '100%',
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 4,
    marginBottom: 16,
  },
  selectorText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NotoSans',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'NotoSans',
  },
  infoText: {
    color: '#3498db',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'NotoSans',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  calculateButton: {
    backgroundColor: '#6200ee',
    marginBottom: 40,
  },
  clearButton: {
    backgroundColor: '#e74c3c',
  },
  backButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NotoSans',
  },
});

export default CaloriasScreen;