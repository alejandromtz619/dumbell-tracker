import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import Welcome from '../components/Welcome';
import WorkoutOTD from '../components/WorkoutOTD';
import CrearSplit from '../components/CrearSplit';
import { StatusBar } from 'react-native';

const WorkoutScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#0a0a0a", flex: 1 }} className="mx-[1%]">
      <StatusBar backgroundColor="#0a0a0a" barStyle="dark-content" />
      <Welcome />
      <CrearSplit/>
      <WorkoutOTD/>
    </SafeAreaView>
  );
};

export default WorkoutScreen;
