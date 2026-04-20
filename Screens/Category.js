import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const Category=()=> {

    const categoryList= [
        {id: 1, name: 'House', url: 'https://static.vecteezy.com/system/resources/thumbnails/026/586/056/small/beautiful-modern-house-exterior-with-carport-modern-residential-district-and-minimalist-building-concept-by-ai-generated-free-photo.jpg'},
        {id: 2, name: 'Villa', url: 'https://cdn.confident-group.com/wp-content/uploads/2025/01/09175702/villa-cover.jpg'},
        {id: 3, name: 'Apartment', url: 'https://assets-news.housing.com/news/wp-content/uploads/2022/03/28143140/Difference-between-flat-and-apartment.jpg'},
        {id: 4, name: 'Bungalow', url: 'https://www.decorpot.com/images/blogimage473847886what-is-bungalow-house-design.jpg'},
        {id: 5, name: 'Duplex', url: 'https://i.pinimg.com/736x/65/b2/f2/65b2f2ad82c49d9e24d23736938c0355.jpg'},
        {id: 6, name: 'Commercial', url: 'https://img.staticmb.com/mbcontent/images/crop/uploads/2024/10/Exterior-of-Phoenix-Mall-of-the-Millennium-lighted-up-at-night_0_1200.jpg.webp'},
        {id: 7, name: 'Semi-Commercial', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXMhwmZVWWr37iL3oIVxSRZ2QWO9WJw_--Ig&s'}
    ];

    const navigation= useNavigation();

    return (
        <SafeAreaView style={styles.mainContainer}>
            <FlatList
                data={categoryList}
                renderItem={({ item })=> (
                    <TouchableOpacity style={styles.categoryBox} onPress={()=> navigation.navigate('Home', {screen: 'AllProduct', params: {product: item}})}>
                        <Image style={styles.categoryImg} source={{uri : item.url }}/>
                        <Text style={styles.title}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item)=> item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{padding: 10}}
            />
        </SafeAreaView>
    )
};

const styles= StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: '#F8F9FB',
        justifyContent: 'center',
        alignItems: 'center'
    },

    categoryBox:{
        width: '45%',
        height: 130,
        borderRadius: 10,
        backgroundColor: '#FFFFF',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    categoryImg:{
        width: '100%',
        height: 100,
        overflow: 'hidden',
        resizeMode: 'cover',
        borderRadius: 10
    },

    title:{
        fontSize: 16,
        fontWeight: '500',
        color: '1A2233',
        marginTop: 5,
    },

});

export default Category;