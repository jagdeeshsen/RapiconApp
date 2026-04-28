import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, View } from "react-native";
import { ProductService } from "../Service/ProductService";
import ProductCard from "../Components/ProductCard";
import ErrorMessage from "../Components/ErrorMessage";
import { SafeAreaView } from "react-native-safe-area-context";

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
	<>
	<StatusBar barStyle = 'light-content' />
        <SafeAreaView edges = {[ 'left', 'right' ]} style={styles.wrapper}>
            <StatusBar barStyle="light-content" backgroundColor="#1A3A5C"/>
            <FlatList
                data={allProducts}
                renderItem={({ item })=>( <ProductCard item={item}/>)}
                keyExtractor={(item)=> item.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}
		contentContainerStyle = {{ padding: 8}}
                ListEmptyComponent={ loading ? <ActivityIndicator size="large" style={styles.activityIndicator}/> : <ErrorMessage textMessage= 'No product found. Please try again'/>}
            />
        </SafeAreaView>
	</>
    );
};

const styles=StyleSheet.create({
    wrapper:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FB',
    },

    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
});

export default Products;