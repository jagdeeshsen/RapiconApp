import { StyleSheet, Text, Pressable} from "react-native"

const CustomBtn=({title, onPress})=>{

    return (
        <Pressable style={styles.btnWrapper} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

const styles= StyleSheet.create({
    btnWrapper:{
        width: '90%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'royalblue'
    },

    text:{
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    }
});

export default CustomBtn;