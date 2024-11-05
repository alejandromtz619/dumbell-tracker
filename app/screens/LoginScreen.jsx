import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const [fontsLoaded] = useFonts({
    'DM Serif Display Regular': require('../../assets/fonts/DMSerifDisplay-Regular.ttf'),
    'NotoSans': require('../../assets/fonts/NotoSans-VariableFont_wdth,wght.ttf'),
  });

  useEffect(() => {
    if (user) {
      navigation.navigate('TabNav'); // Navega a la pantalla principal si el usuario está autenticado
    }
  }, [user, navigation]);

  const handleAuthentication = async () => {
    const auth = getAuth();
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        console.log('User signed in successfully!');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        console.log('User created successfully!');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" translucent={false} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.mainTitle}>DUMBELL TRACKER</Text>
        <Text style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
          <Text style={styles.buttonText}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'No tienes una cuenta? Regístrese' : 'Ya tienes una cuenta? Inicia sesión'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // Dark background color
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212', // Dark background color
  },
  mainTitle: {
    fontSize: 39,
    marginBottom: 40,
    textAlign: 'center',
    color: 'white', // White font color
    fontFamily: 'DM Serif Display Regular',
  },
  title: {
    fontSize: 24,
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
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NotoSans',
  },
  toggleText: {
    color: 'white', // White text color
    textAlign: 'center',
    fontFamily: 'NotoSans',
  },
  bottomContainer: {
    marginTop: 20,
  },
});

export default LoginScreen;
