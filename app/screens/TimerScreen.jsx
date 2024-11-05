
import React from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import Welcome from '../components/Welcome';
import { SafeAreaView } from 'react-native-safe-area-context';
import Informe from '../components/Informe';

const TimerScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0a0a0a" barStyle="dark-content" translucent={false} />
      <ScrollView contentContainerStyle={styles.container}>
        <Welcome />
        <Informe/>
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
    padding: '1%',
    backgroundColor: '#0a0a0a', // Dark background color
  },
});

export default TimerScreen;
