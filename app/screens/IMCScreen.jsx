import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import InfoModal from '../components/InfoModal'; // Asegúrate de importar el componente correctamente

const IMCScreen = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setBmiCategory('Bajo peso');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setBmiCategory('Normal');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setBmiCategory('Sobrepeso');
    } else {
      setBmiCategory('Obesidad');
    }
  };

  const clearInputs = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setBmiCategory('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0a0a0a" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Calculadora de IMC</Text>

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

        <TouchableOpacity style={[styles.button, styles.calculateButton]} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        {bmi && (
          <View style={styles.resultContainer}>
            <Text style={styles.result}>IMC: {bmi.toFixed(2)}</Text>
            <Text style={styles.result}>Categoría: {bmiCategory}</Text>
          </View>
        )}

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.infoText}>¿Qué es Índice de Masa Corporal?</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearInputs}>
            <Text style={styles.buttonText}>Limpiar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.navigate('Calculator')}>
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <InfoModal visible={modalVisible} onClose={() => setModalVisible(false)} />
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
    marginBottom: 290
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
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  result: {
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
});

export default IMCScreen;
