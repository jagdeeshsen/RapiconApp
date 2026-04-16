import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import ProductCard from "../Components/ProductCard";
import ListHeader from "../Components/ListHeader";
import { useEffect, useState } from "react";
import { ProductService } from "../Service/ProductService";
import ErrorMessage from "../Components/ErrorMessage";

const Home=()=>{

    const [designArr, setDesignArr]= useState([]);
    const [loading, setLoading]= useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        fetchAllDesigns();
    }, []);

    const fetchAllDesigns= async ()=>{
        setLoading(true);
        try{
            const designs= await ProductService.getAllDesigns();
            
            designs.sort((a,b)=> new Date(b.createdAt)- new Date(a.createdAt));
            setDesignArr(designs);
        }catch(e){
            console.log("Error fetching designs"+ e.getMessage());
        }finally{
            setLoading(false);
        }
    };

    const filteredDesigns = designArr.filter( item => 
        item.designType === 'Residential' 
            ? (item.designCategory?.toLowerCase().includes(searchText.toLowerCase()))
            : (item.designType?.toLowerCase().includes(searchText.toLowerCase()))
    );


    return (
        <FlatList 
            data={filteredDesigns}
            renderItem={({item})=>(<ProductCard item ={item}/>)}
            ListHeaderComponent={<ListHeader onSearch = {setSearchText}/>}
            keyExtractor={(item)=> item.id}
            numColumns={2}
            contentContainerStyle={{padding: 8, backgroundColor: '#f7f7ff'}}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={loading? <ActivityIndicator size='large' style={styles.activityIndicator}/> :<ErrorMessage textMessage= 'No product found. Please try again'/>}
        />
    );
};

const styles= StyleSheet.create({
    activityIndicator:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
});

export default Home;