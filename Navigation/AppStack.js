import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();

const AppStack = ( { setIsLoggedIn }) => (
  <Stack.Navigator>
    <Stack.Screen name="bottomTab" options={{headerShown: false}}>
      {(props) => <BottomTab {...props} setIsLoggedIn={setIsLoggedIn}/>}
    </Stack.Screen>
  </Stack.Navigator>
);

export default AppStack;