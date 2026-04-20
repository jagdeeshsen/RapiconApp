import { ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from "react-native";
import PackageBox from "../Components/PackageBox";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { ProductService } from "../Service/ProductService";
import { useNavigation } from "@react-navigation/native";
import { getAuthData } from "../utils/authStorage";
import { CartService } from "../Service/CartService";
import { SafeAreaView } from "react-native-safe-area-context";


const PackageDetails=({ route })=>{

    const[product, setProduct]= useState(null);
    const[selectedPackage, setSelectedPackage]= useState(null);
    const[error, setError] = useState(null);
    const[isDisabled, setIsDisabled] = useState(false);

    const navigation= useNavigation();

    const { itemId }= route.params;

    const fetchProductById = async (itemId)=>{
        try{
            const design = await ProductService.getDesignById(itemId);
            setProduct(design);
        }catch(e){
            console.log("Error fetching designs"+ e.message);
            setError('Failed to fetch design');
        }
    };


    useEffect(()=>{
        if(itemId){
            fetchProductById(itemId);
        }
    }, [itemId]);

    const packages= [
        {id: 1, name: 'Basic', price: 5, description: 'A budget-friendly package that delivers all essential construction drawings and quality design without any compromise.', 
        highlights: [
          'Complete 2D Architectural Floor Plan',
          'Full Structural, Electrical & Plumbing Drawings',
          'Furniture Layout & Interior Planning',
          'Realistic Front Elevation + VR Walkthrough Video',
          'Door & Window Schedule Drawings'
        ]},
        {id: 2, name: 'Classic', price: 25, description: 'A classic package with 2D + 3D designs, unlimited customizations, and VR walkthrough for a complete planning experience.',
        highlights: [
          'Complete 2D+3D Architectural Floor Plan',
          'Full Structural, Electrical & Plumbing Drawings',
          'Full 3D Interior Working Drawings',
          'Unlimited Customization and Virtual Reality Visits',
          'Detailed Door & Window Schedule Drawings'
        ]},
        {id: 3, name: 'Premium', price: 1830, description: 'An elegant package crafted for modern living with extra provisions like solar heater setup, puja room door etc',
        highlights: [
          'Superior Brand steel & cement',
          'Premium floor tiles upto ₹140/sqft',
          'Designer teak doors and window finish',
          'Apcolite Premium finish',
          'Quality kitchen & bathroom fittings',
          'Unlimited Customization and Virtual Reality Visits'
        ]},
        {id: 4, name: 'Royal', price: 2100, description: 'An ultimate plan with high-end finishes with amenities like EV charging, copper gas connection etc',
        highlights: [
          'Superior brand steel & cement',
          'Lavish floor tiles upto ₹140/sqft',
          'Designer teak doors and window finish',
          'Apex Ultima Exterior finish',
          'Lavish Fittings for kitchen & bathroom',
          'Unlimited Customization and Virtual Reality Visits'
        ]}
    ];

    useEffect(()=>{
        setSelectedPackage(packages[0]);
    }, []);

    if(! product){
        return <Text>Loading...</Text>
    };

    const formatPrice=(price)=>{
        return price.toLocaleString('en-IN');
    };

    const addToCart = async () => {
        try{
            if(isDisabled) return ; // prevent duble click
            setIsDisabled(true); // Disable add to cart button

            const authData = await getAuthData();

            if(!authData?.userId){
                setError('User id not found. Please login again.');
                return ;
            }

            const cartItem = {
                userId: authData?.userId,
                design: product,
                packageName: selectedPackage.name,
                totalAmount:product.builtUpArea*selectedPackage.price,
                totalInstallments: 10,
                added_at: new Date().toISOString(),
            };

            const response= await CartService.addItemToCart(cartItem);
            alert('Item added successfully');
            
            navigation.navigate('bottomTab', {screen: 'Cart'});

            // Enable add to cart button after 30 second
            setTimeout(()=>{
                setIsDisabled(false);
            }, 30000);

        }catch(error){
            alert(error.message || 'Failed to add to cart');
        }
    };

    if(error){
        return (
            <View>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#F8F9FB'}}>
            <StatusBar barStyle="light-content" backgroundColor="#1A3A5C"/>
            <ScrollView 
            showsVerticalScrollIndicator= {false}
            contentContainerStyle={{padding: 10, paddingBottom: 10}}>
                <Text style={styles.headingText}>Choose Your Package </Text>
                <View style={styles.packageCotainer}>
                    <PackageBox
                        item={packages[0]} 
                        color={'#1A3A5C'}
                        isSelected={selectedPackage?.id === packages[0].id}
                        onPress= {()=>setSelectedPackage(packages[0])}
                    />

                    <PackageBox
                        item={packages[1]} 
                        color={'#2563EB'}
                        isSelected={selectedPackage?.id === packages[1].id}
                        onPress= {()=>setSelectedPackage(packages[1])}
                    />
                </View>
                <View style={styles.packageCotainer}>
                    <PackageBox 
                        item={packages[2]} 
                        color={'#7C3AED'}
                        isSelected={selectedPackage?.id === packages[2].id}
                        onPress= {()=>setSelectedPackage(packages[2])}
                    />
                    <PackageBox 
                        item={packages[3]} 
                        color={'#D4A017'}
                        isSelected={selectedPackage?.id === packages[3].id}
                        onPress= {()=>setSelectedPackage(packages[3])}
                    />
                </View>
                
                <View style={styles.packageSummary}>
                    <Text style={styles.headingText}>Package Summary:</Text>
                    <View style={styles.detailComponent}>
                        <Text style={styles.fieldLabel}>Product:</Text>
                        <Text style={styles.fieldValue}>{ product.designType === 'Residential' ? product.designCategory : product.designType }</Text>
                    </View>
                    <View style={styles.detailComponent}>
                        <Text style={styles.fieldLabel}>Buit-up Area:</Text>
                        <Text style={styles.fieldValue}> {formatPrice(product.builtUpArea)} sq.ft.</Text>
                    </View>
                    <View style={styles.detailComponent}>
                        <Text style={styles.fieldLabel}>Package:</Text>
                        <Text style={styles.fieldValue}> {selectedPackage.name}</Text>
                    </View>
                    <View style={styles.detailComponent}>
                        <Text style={styles.fieldLabel}>Price:</Text>
                        <Text style={styles.fieldValue}> ₹ {selectedPackage.price} /sq.f.t</Text>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.detailComponent}>
                        <Text style={styles.fieldValue}>Total Price:</Text>
                        <Text style={styles.priceText}> ₹ {formatPrice(product.builtUpArea*selectedPackage.price)}</Text>
                    </View>
                    
                </View>
                
                <View style={styles.bottomBtnsWrapper}>
                    <TouchableOpacity 
                        onPress={()=> navigation.navigate('bottomTab', {screen: 'Cart'})}
                        style={styles.cardBox}>
                        <MaterialCommunityIcons
                            name="cart-plus"
                            size={24}
                            color='#000'>

                        </MaterialCommunityIcons>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.customBtn} 
                        onPress={addToCart}
                        disabled={isDisabled}>
                        <Text style={styles.btnText}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles= StyleSheet.create({
    packageCotainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    packageSummary:{
        width: '100%',
        backgroundColor: '#F8F9FB',
        padding: 10,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },

    detailComponent:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },

    fieldLabel:{
        color: '#6B7A99',
        fontSize: 14,
        fontWeight: '400',
    },

    fieldValue:{
        color: '#1A2233',
        fontSize: 14,
        fontWeight: '500',
    },

    priceText:{
        fontSize: 14,
        fontWeight: '500',
        color: '#D4A017',
    },

    headingText:{
        fontSize: 16,
        fontWeight: '500',
        color: '#1A2233',
        alignSelf: 'flex-start',
        margin: 10
    },

    line:{
        width:'100%',
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 10
    },

    customBtn:{
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#F8F9FB',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        margin: 10
    },

    btnText:{
        fontSize: 16,
        fontWeight: '600',
        color: '#1A2233'
    },

    bottomBtnsWrapper:{
        width: '100%',
        height: 60,
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 10,
        margin: 10,
    },

    cardBox:{
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#F8F9FB',
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },

    errorText:{
        marginTop: 20, 
        alignItems: 'center',
        color: 'red',
        fontSize: 20,
    },

});

export default PackageDetails;