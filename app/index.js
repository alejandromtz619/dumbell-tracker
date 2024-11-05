import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutScreen from "./screens/WorkoutScreen";
import CalculationScreen from "./screens/CalculationScreen";
import WorkoutOTDScreen from "./screens/WorkoutOTDScreen";
import TimerScreen from "./screens/TimerScreen";
import CrearSplitScreen from "./screens/CrearSplitScreen";
import AgregarEjercicios from "./screens/AgregarEjercicios";
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider } from './context/AuthContext';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import IMCScreen from "./screens/IMCScreen";
import CaloriasScreen from "./screens/CaloriasScreen";
import MacrosScreen from "./screens/MacrosScreen";
import InformeScreen from "./screens/InformeScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Workout":
              return <FontAwesome5 name="dumbbell" size={size} color={color} />;
            case "Timer":
              return <Ionicons name="timer-outline" size={size} color={color} />;
            case "Calculator":
              return <Entypo name="calculator" size={size} color={color} />;
          }
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#6200ee", // Dark background for tab bar
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="Calculator" component={CalculationScreen} />
      <Tab.Screen name="Timer" component={TimerScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    
    <AuthProvider>
      <NavigationContainer independent={true}>
        
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TabNav" component={TabNavigator} />
          <Stack.Screen name="WorkoutOTDScreen" component={WorkoutOTDScreen} />
          <Stack.Screen name="CrearSplitScreen" component={CrearSplitScreen} />
          <Stack.Screen name="AgregarEjercicios" component={AgregarEjercicios} />
          <Stack.Screen name="IMCScreen" component={IMCScreen} />
          <Stack.Screen name="CaloriasScreen" component={CaloriasScreen} />
          <Stack.Screen name="MacrosScreen" component={MacrosScreen} />
          <Stack.Screen name="InformeScreen" component={InformeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}