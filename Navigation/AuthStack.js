import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../Screens/WelcomeScreen';
import SignUp from '../Screens/SignUp';
import SignIn from '../Screens/SignIn';
import OTPScreen from '../Screens/OTPScreen';


const Stack= createNativeStackNavigator();

const AuthStack = ({ setIsLoggedIn }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome Screen" component={WelcomeScreen} options={{headerShown: false}}/>
    <Stack.Screen name="Sign In" component={SignIn} options={{headerShown: false}}/>
    <Stack.Screen name="Sign Up" component={SignUp} options={{headerShown: false}}/>
    <Stack.Screen name="OTP Screen"  options={{headerShown: false}}>
      { (props) => <OTPScreen {...props} setIsLoggedIn={setIsLoggedIn}/>}
    </Stack.Screen>
  </Stack.Navigator>
);

export default AuthStack;