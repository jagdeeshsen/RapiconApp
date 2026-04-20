import { StyleSheet, Text, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'

const PackageModel=({ item })=>{

    const highlights= item.highlights;

    return (
        <View style= {styles.packageWrapper}>
            <View style={styles.packageHeader}>
                <Text style={styles.headerText}>{item.name}</Text>
                <Text style={styles.headerPriceText}>{item.price} /sq.ft.</Text>
            </View>
            <View>
                <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
            <View>
                <Text style={{color: '#1A2233', fontSize: 15, fontWeight: 500, margin: 10}}>Highlights:</Text>
                {highlights.map((point, index)=>(
                    <View key={index} style={styles.infoBox}>
                        <Ionicons name="checkmark-circle" size={12} alignSelf= 'center' margin= {3} color="green" />
                        <Text style={{fontSize: 12, width: '90%', color: '#6B7A99'}}>{point}</Text>
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
        backgroundColor: '#F8F9FB',
        borderRadius: 10,
        margin: 10,
        elevation: 8,
    },

    packageHeader:{
        width: '100%',
        height: 'auto',
        padding: 5,
        backgroundColor: '#1A3A5C',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    headerText:{
        fontSize: 18,
        fontWeight: '500',
        alignSelf: 'center',
        color: '#FFFFFF'
    },

    headerPriceText:{
        fontSize: 14,
        fontWeight: '400',
        alignSelf: 'center',
        color: '#E8F0FA'
    },

    descriptionText:{
        margin: 5,
        fontWeight: '400',
        fontSize: 12,
        padding: 5,
        color: '#1A2233'
    },

    infoBox:{
      width: '90%',
      height: 'auto',
      padding: 5,
      backgroundColor: '#FFFFFF',
      alignSelf: 'center',
      flexDirection: 'row',
      borderRadius: 5,
      marginBottom: 8,
      justifyContent: 'space-between'
    },

});

export default PackageModel;