import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, StyleSheet, TextInput } from "react-native";

const SearchBox=({ onSearch })=> {

    return (
        <View style={styles.searchBox}>
            <Ionicons name="search-outline" style={styles.searchIcon}/>
            <TextInput 
                placeholder="search here..."
                style={styles.input}
                onChangeText={onSearch}
            />
        </View>
    );
};

const styles= StyleSheet.create({
    searchBox:{
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 5,
        flexDirection: 'row',
        marginBottom: 10
    },

    input:{
        fontSize: 16,
        margin: 5,
        fontStyle: 'italic',
        color: 'black'
    },

    searchIcon:{
        marginLeft: 10,
        fontSize: 18,
        marginTop: 15
    }

});

export default SearchBox;
