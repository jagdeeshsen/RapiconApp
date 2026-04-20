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
        width: '95%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },

    text:{
        fontSize: 16,
        fontWeight: '600',
        color: '#1A3A5C'
    }
});

export default CustomBtn;