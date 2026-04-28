import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StatusBar, Text, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const WelcomeScreen= ()=> {

    const navigation= useNavigation();

    return(
	<>
		{/* Top status bar background */}
  		<SafeAreaView edges = {['top']} style={{ backgroundColor: "#1A3A5C" }}>
    			<StatusBar barStyle="light-content" />
  		</SafeAreaView>
        <SafeAreaView edges = {[ 'left', 'right' ]} style={styles.imageContainer}>
            <ImageBackground style={styles.image} source={require('../assets/rapicon-welcome-screen.png')}>

                <View style={styles.overlay}>

                    <View style={styles.topContent}>
                        <Text style={styles.title}>Welcome</Text>
                        <Text style={styles.titleSecond}>Find your Dream House Here</Text>
                    </View>

                    <View style={styles.bottomContent}>
                        <TouchableOpacity style={styles.primaryBtn} onPress={()=> navigation.navigate('Sign In')}>
                            <Text style={styles.primaryText}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondaryBtn} onPress={()=> navigation.navigate('Sign Up')}>
                            <Text style={styles.secondaryText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                
            </ImageBackground>
        </SafeAreaView>
	</>
    );
};

const styles= StyleSheet.create({

    imageContainer:{
        flex: 1,
    },

    image:{
        flex: 1,
        resizeMode: 'cover',
    },

    overlay:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.15)',
        paddingTop: 60,
        paddingBottom: 30,
    },

    topContent:{
        alignItems: 'center',
    },

    bottomContent:{
        width: '100%',
        alignItems: 'center',
    },

    primaryBtn:{
        width: '90%',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cfd0d2',
        marginBottom: 10,
    },

    secondaryBtn:{
        width: '90%',
        height: 50,
        borderRadius: 20,
        color: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        marginBottom: 40,
    },

    primaryText:{
        fontSize: 16,
        fontWeight: '700',
        color: 'black',
    },

    secondaryText:{
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
    },

    title:{
        fontSize: 28,
        fontWeight: '800',
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },

    titleSecond:{
        fontSize: 16,
        color: '#eee',
        marginTop: 5,
    },

});

export default WelcomeScreen;