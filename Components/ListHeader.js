import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import SearchBox from './SearchBox';
import Slider from './Slider';
import { useNavigation } from "@react-navigation/native";

const ListHeader=({ onSearch })=>{

    const navigation = useNavigation();

    return(
        <View style={styles.wrapperContainer}>
            <SearchBox onSearch={onSearch}/>
            <Slider></Slider>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={styles.productCardHeading}>Special For You</Text>
                <TouchableOpacity style={styles.seeAllText} onPress={()=> navigation.navigate('Home', { screen: 'AllProduct' })}>
                    <Text>View all</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles= StyleSheet.create({

    wrapperContainer:{
        padding: 8,
        backgroundColor: '#F8F9FB',
    },

    bellImg:{
        width: 30,
        height: 30,
        alignSelf: 'flex-end',
        borderRadius: 30,
        backgroundColor: 'gray',
        elevation: 5
    },

   productCardHeading:{
        fontSize: 18,
        marginTop: 20,
        color: '#1A2233',
        fontWeight: '700'
    },

    seeAllText:{
        fontSize: 16,
        marginTop: 20,
        color: '#1A3A5C',
        fontWeight: '600'
    }

});

export default ListHeader;