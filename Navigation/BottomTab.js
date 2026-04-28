import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Category from "../Screens/Category";
import Cart from "../Screens/Cart";
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeStack from "./HomeStack";
import AccountStack from "./AccountStack";

const Tab= createBottomTabNavigator();

const BottomTab=({ setIsLoggedIn })=>{

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Category") {
                iconName = focused ? "grid" : "grid-outline";
            }else if (route.name === "Account") {
                iconName = focused ? "person" : "person-outline";
            }else if (route.name === "Cart") {
                iconName = focused ? "cart" : "cart-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#1A3A5C",
            tabBarInactiveTintColor: "#B0B8C9",
        })}>
        <Tab.Screen name="Home" component={HomeStack} options={{headerShown: false}}/>
        <Tab.Screen name="Category" component={Category} options={{ headerStyle:{backgroundColor: '#1A3A5C'}, headerTitleStyle:{fontSize: 18, fontWeight: '600', color: '#FFFFFF'}}}/>
        <Tab.Screen name="Cart" component={Cart} options={{headerShown: false}} />
        <Tab.Screen name="Account" options={{headerShown: false}}>
            {(props) => <AccountStack {...props} setIsLoggedIn={setIsLoggedIn}/>}
        </Tab.Screen>
        </Tab.Navigator>
    );
};

export default BottomTab;