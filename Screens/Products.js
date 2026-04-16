import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ProductService } from "../Service/ProductService";
import ProductCard from "../Components/ProductCard";
import ErrorMessage from "../Components/ErrorMessage";

const Products=({ route })=> {

    const [allProducts, setAllProducts]= useState([]);
    const [loading, setLoading]= useState(true);

    const { product }= route.params;
    
    useEffect(()=>{
        fetchAllProducts();
    },[]);

    const fetchAllProducts = async ()=>{
        setLoading(true);
        try{
            const products= await ProductService.getAllDesigns();

            // filter array based on category name
            const filterdProducts= products.filter( item=> item.designType === 'Residential' ? item.designCategory === product.name : item.designType === product.name);
            
            setAllProducts(filterdProducts);

        }catch(e){
            console.log(e.getMessage);
        }finally{
            setLoading(false);
        }
    };


    return (
        <View style={styles.wrapper}>
            <FlatList
                data={allProducts}
                renderItem={({ item })=>( <ProductCard item={item}/>)}
                keyExtractor={(item)=> item.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                ListEmptyComponent={ loading ? <ActivityIndicator size="large" style={styles.activityIndicator}/> : <ErrorMessage textMessage= 'No product found. Please try again'/>}
            />
        </View>
    );
};

const styles=StyleSheet.create({
    wrapper:{
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8'
    },

    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
});

export default Products;