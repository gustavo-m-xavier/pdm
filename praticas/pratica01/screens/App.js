import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import DespesaRecente from './screens/DespesaRecentes';
import TodasDespesas from './screens/TodasDespesas';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import GerenciarDespesa from './screens/GerenciarDespesa';
import IconButton from './components/IconButton';

export default function App() {

  const Tab = createBottomTabNavigator()

  function bottomTabScreen() {

    const navigator = useNavigation()

    return (
      <Tab.Navigator
        screenOptions={{headerRight: () => <IconButton icon="add" size={24} onPress={() => {navigator.navigate('GerenciarDespesa')}} />}}>
        <Tab.Screen name="DespesaRecentes" component={DespesaRecente} 
          options={{tabBarIcon: ({focused=false, color, size}) => (<Ionicons name="hourglass" size={size} color={color} />),
          tabBarLabel: 'Recentes',
          title: 'Despesas Recentes',
          tabBarLabelStyle: {fontSize: 12}}}/>
        <Tab.Screen name="TodasDespesas" component={TodasDespesas} 
          options={{tabBarIcon: ({focused=false, color, size}) => (<Ionicons name="list" size={size} color={color} />),
          tabBarLabel: 'Todas',
          title: 'Todas as Despesas',
          tabBarLabelStyle: {fontSize: 12}}}/>
      </Tab.Navigator>
    );
  }

  const Stack = createNativeStackNavigator()

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Despesas" component={bottomTabScreen} options={{headerShown: false}}/>
        <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
