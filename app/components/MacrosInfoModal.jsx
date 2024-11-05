import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

const MacrosInfoModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>¿Qué son los Macronutrientes?</Text>
          <Text style={styles.modalText}>
            Los macronutrientes son los nutrientes que el cuerpo necesita en grandes cantidades para funcionar correctamente. {"\n"}{"\n"}
            Estos incluyen carbohidratos, proteínas y grasas. {"\n"}{"\n"}
            - Carbohidratos: Proporcionan energía rápida y son esenciales para el funcionamiento del cerebro y los músculos. {"\n"}
            - Proteínas: Son necesarias para la reparación y construcción de tejidos, así como para la producción de enzimas y hormonas. {"\n"}
            - Grasas: Son importantes para la absorción de vitaminas, la producción de hormonas y como fuente de energía a largo plazo.
          </Text>
          <Image
            source={require('../../assets/images/macros-chart.png')} // Asegúrate de tener esta imagen en tu proyecto
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

export default MacrosInfoModal;
