import { View, Text } from 'react-native'
import React from 'react'
import {useFonts} from 'expo-font';

const Welcome = () => {
    const [fontsLoaded] = useFonts({
        'DM Serif Display Regular': require('../../assets/fonts/DMSerifDisplay-Regular.ttf'),
    });

    if (!fontsLoaded){
        return(
            null
        )
    }
  return (
    <View style={{marginBottom: 30}}>
      <Text style={{
        fontFamily: 'DM Serif Display Regular',
        fontWeight: 800,
        fontSize: 40,
        textAlign: 'center',
        color: '#f5f5f5'
      }}>DUMBELL TRACKER</Text>
    </View>
  )
}

export default Welcome