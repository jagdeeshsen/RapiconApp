import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "../Screens/Account";
import Profile from "../Screens/Profile";
import Order from "../Screens/Order";
import Support from "../Screens/Support";

const Stack = createNativeStackNavigator();

const AccountStack = ({ setIsLoggedIn }) => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="account" options={{headerShown: false}}>
                {(props) => <Account {...props} setIsLoggedIn={setIsLoggedIn}/>}
            </Stack.Screen>
            <Stack.Screen name="My Profile" options={{headerShown: false}}>
                {(props) => <Profile {...props} setIsLoggedIn={setIsLoggedIn}/>}
            </Stack.Screen>
            <Stack.Screen name="My Order" options={{ headerStyle:{backgroundColor: '#1A3A5C'}, headerTitleStyle:{fontSize: 18, fontWeight: '600', color: '#FFFFFF'}}}>
                {(props) => <Order {...props} setIsLoggedIn={setIsLoggedIn}/>}
            </Stack.Screen>
            <Stack.Screen name="Support" component={Support} options={{ headerTitle: 'Help and Support', headerTitleStyle:{fontSize: 18, fontWeight: '600', color: '#FFFFFF'}, headerStyle:{backgroundColor: '#1A3A5C'}}}/>
        </Stack.Navigator>
    );
};

export default AccountStack;