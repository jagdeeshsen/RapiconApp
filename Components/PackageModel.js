import { StyleSheet, Text, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'

const PackageModel=({ item })=>{

    const highlights= item.highlights;

    return (
        <View style= {styles.packageWrapper}>
            <View style={styles.packageHeader}>
                <Text style={styles.headerText}>{item.name}</Text>
                <Text style={styles.headerPriceText}>{item.price} sqrt ft</Text>
            </View>
            <View>
                <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
            <View>
                <Text style={{color: 'blue', fontSize: 15, fontWeight: 500, margin: 10}}>Highlights</Text>
                {highlights.map((point, index)=>(
                    <View key={index} style={styles.infoBox}>
                        <Ionicons name="checkmark-circle" size={12} alignSelf= 'center' margin= {3} color="green" />
                        <Text style={{fontSize: 12, width: '90%'}}>{point}</Text>
                    </View>
                ))}
            </View>
            
        </View>
    );
};

const styles= StyleSheet.create({
    packageWrapper:{
        width: '60%',
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        elevation: 8,
    },

    packageHeader:{
        width: '100%',
        height: 'auto',
        padding: 5,
        backgroundColor: 'purple',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    headerText:{
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center',
        color: 'white'
    },

    headerPriceText:{
        fontSize: 15,
        fontWeight: '500',
        alignSelf: 'center',
        color: 'white'
    },

    descriptionText:{
        margin: 5,
        fontWeight: '400',
        fontSize: 12,
        padding: 5,
    },

    infoBox:{
      width: '90%',
      height: 'auto',
      padding: 5,
      backgroundColor: '#f1eef4',
      alignSelf: 'center',
      flexDirection: 'row',
      borderRadius: 5,
      marginBottom: 8,
      justifyContent: 'space-between'
    },

});

export default PackageModel;