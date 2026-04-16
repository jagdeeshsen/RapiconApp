import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"


const ConfirmModal = ({ visible, title, message, type, inputValue, setInputValue, onConfirm, onCancel }) => {


    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.box}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    { type === 'prompt' && (
                        <TextInput
                            value={inputValue}
                            onChangeText={setInputValue}
                            placeholder="Enter OTP"
                            keyboardType="numeric"
                            style={styles.inputBox}/>
                    )}

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                            <Text style={styles.cancelText}>cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
                            <Text style={styles.confirmText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles= StyleSheet.create({

    overlay:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    box:{
        width: 320,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },

    title:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },

    message:{
        fontSize: 15,
        marginBottom: 20,
    },

    buttonRow:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    cancelBtn:{
        marginRight: 10,
        padding: 10,
    },

    confirmBtn:{
        backgroundColor:'#007bff',
        paddingHorizontal:18,
        paddingVertical:10,
        borderRadius:6
    },

    confirmText:{
        fontSize: 16,
        color: '#fff',
    },

    cancelText:{
        fontSize: 16,
    },

    inputBox:{
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        marginBottom: 15,
    },

});

export default ConfirmModal;