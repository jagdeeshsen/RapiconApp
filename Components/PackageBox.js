import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import PackageModel from "./PackageModel";
import { useState } from "react";

const PackageBox= ({ item, color, isSelected, onPress })=> {

    const [isModalOpen, setIsModalOpen]= useState(false);

    return (
        <TouchableOpacity onPress= { onPress } style= {[styles.box, {backgroundColor: color}, isSelected && styles.selectedBox ]}>
            <View style={{padding: 5 }}>
                <Text style={styles.packageName}>{item.name}</Text>
                <Text style={styles.packagePrice}>Price: ₹ {item.price} </Text>
            </View>
            <TouchableOpacity style={styles.arrowBtn} onPress={()=> {setIsModalOpen(true)}}>
                <Icon name="chevron-forward" size={22} color='#ccc' fontWeight={600}/>
            </TouchableOpacity>
            <Modal transparent= {true} visible={isModalOpen}>
                <View style={styles.modal}>
                    <TouchableOpacity style={styles.closeBtn} onPress={()=> {setIsModalOpen(false)}}>
                        <Text style={{fontSize: 18 }}> X </Text>
                    </TouchableOpacity>
                    <PackageModel item={item}/>
                </View>
            </Modal>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    box:{
        width: 170,
        height: 80,
        borderRadius: 15,
        padding: 10,
        margin: 8,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    packageName:{
        fontSize: 18,
        fontWeight: '500',
        color: 'white'
    },

    packagePrice:{
        fontSize: 16,
        fontWeight: '400',
        color: 'white'
    },

    arrowBtn:{
        justifyContent: 'center',
        alignItems: 'center',
    },

    modal:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    closeBtn:{
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        marginRight: 80,
    },

    selectedBox:{
        borderWidth: 2,
    },
});

export default PackageBox;