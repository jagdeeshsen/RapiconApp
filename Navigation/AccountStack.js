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
            <Stack.Screen name="My Order" options={{ headerStyle:{backgroundColor: '#fff'}, headerTitleStyle:{fontSize: 18, fontWeight: '600', color: '#000'}}}>
                {(props) => <Order {...props} setIsLoggedIn={setIsLoggedIn}/>}
            </Stack.Screen>
            <Stack.Screen name="Support" component={Support} options={{ headerTitle: 'Help and Support', headerTitleStyle:{fontSize: 18, fontWeight: '600', color: '#000'}, headerStyle:{backgroundColor: '#fff'}}}/>
        </Stack.Navigator>
    );
};

export default AccountStack;