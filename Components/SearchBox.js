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
        backgroundColor: '#ffffff',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        flexDirection: 'row',
        marginBottom: 10
    },

    input:{
        alignItems: 'center',
        fontSize: 16,
        margin: 5,
        color: '#1A2233',
    },

    searchIcon:{
        marginLeft: 18,
        fontSize: 18,
        alignSelf: 'center',
        color: '#B0B8C9'
    }

});

export default SearchBox;
