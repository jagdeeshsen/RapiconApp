import { StyleSheet, View, Text } from 'react-native';
import SearchBox from './SearchBox';
import Slider from './Slider';

const ListHeader=({ onSearch })=>{

    return(
        <View style={styles.wrapperContainer}>
            <SearchBox onSearch={onSearch}/>
            <Slider></Slider>
            <Text style={styles.productCardHeading}>Special For You</Text>
        </View>
    )
};

const styles= StyleSheet.create({

    wrapperContainer:{
        padding: 10,
        backgroundColor: '#F8F9FB',
    },

    mainContent:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },

   userImg:{
    height: 30,
    width: 30,
    alignSelf: 'flex-start',
    borderRadius: 30,
    backgroundColor: 'gray',
    elevation: 5
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

});

export default ListHeader;