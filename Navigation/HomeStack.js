import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../Screens/Home";
import ProductInfo from "../Screens/ProductInfo";
import Products from "../Screens/Products";
import PackageDetails from "../Screens/PackageDetails";

const Stack = createNativeStackNavigator();
const HomeStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={Home} options={{headerShown: false, statusBarStyle: 'dark'}}/>
            <Stack.Screen name="ProductInfo" component={ProductInfo} options={{headerShown: false, statusBarHidden: true}}/>
            <Stack.Screen name="Package Details" component={PackageDetails} options={{ headerTitle: 'Packages', headerStyle:{backgroundColor: '#fff'}, headerTitleStyle:{fontSize: 18, fontWeight: '600', color: '#000'}}}/>
            <Stack.Screen name="AllProduct" component={Products} options={{headerTitle: 'Products', headerStyle:{backgroundColor: '#fff'}, headerTitleStyle:{fontSize: 18, fontWeight: '600', color: '#000'}}}/>
        </Stack.Navigator>
    );

};

export default HomeStack;