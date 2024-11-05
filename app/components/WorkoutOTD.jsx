import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const otdImage = require('../../assets/images/workoutOTD.png');

const WorkoutOTD = () => {
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        'NotoSans': require('../../assets/fonts/NotoSans-VariableFont_wdth,wght.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <TouchableOpacity 
            style={{ alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 20 }}
            onPress={() => navigation.navigate('WorkoutOTDScreen')}
            
        >
            <View style={{
                borderRadius: 12,
                overflow: 'hidden',
                height: 200,
                width: '90%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 5,
            }}>
                <ImageBackground
                    source={otdImage}
                    resizeMode='cover'
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 24,
                        fontFamily: 'NotoSans',
                        textAlign: 'center',
                        letterSpacing: 0,
                    }}>
                        Rutina del día
                    </Text>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
};

export default WorkoutOTD;
