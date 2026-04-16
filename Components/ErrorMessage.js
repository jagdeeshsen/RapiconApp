import { StyleSheet, Text, View } from "react-native";

const ErrorMessage= ({ textMessage })=>{

    return (
        <View style={styles.wrapper}>
            <Text style={styles.errorText}>{textMessage}</Text>

        </View>
    );
};

const styles= StyleSheet.create({
    wrapper:{
        flex : 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    errorText:{
        fontSize: 16,
        fontWeight: '500',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        flex: 1
    },
});

export default ErrorMessage;