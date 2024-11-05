import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

const InfoModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>¿Qué es Índice de Masa Corporal?</Text>
          <Text style={styles.modalText}>
            El Índice de Masa Corporal (IMC) es una medida que se utiliza para determinar si una persona tiene un peso saludable en relación con su altura. {"\n"}{"\n"}
            Se calcula dividiendo el peso de una persona en kilogramos por el cuadrado de su altura en metros.
          </Text>
          <Image
            source={require('../../assets/images/imc-chart.jpg')} // Asegúrate de tener esta imagen en tu proyecto
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

export default InfoModal;
