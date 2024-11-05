import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CaloriasInfoModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>¿Qué son las Calorías Diarias?</Text>
          <Text style={styles.modalText}>
            Las calorías diarias son la cantidad de energía que tu cuerpo necesita para realizar sus funciones básicas y actividades diarias. {"\n"}{"\n"}
            La cantidad de calorías que necesitas depende de varios factores, incluyendo tu edad, sexo, peso, altura y nivel de actividad física. {"\n"}{"\n"}
            Es importante consumir la cantidad adecuada de calorías para mantener un peso saludable y tener suficiente energía para tus actividades diarias.
          </Text>
          <Image
            source={require('../../assets/images/calories-chart.jpeg')} // Asegúrate de tener esta imagen en tu proyecto
            style={styles.image}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
    fontFamily: 'NotoSans',
  },
  modalText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'NotoSans',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NotoSans',
  },
});

export default CaloriasInfoModal;
