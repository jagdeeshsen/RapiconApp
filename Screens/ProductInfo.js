import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import ImageCarousel from "../Components/ImageCarousel";
import CustomBtn from "../Components/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ProductService } from "../Service/ProductService";
import DesignInfoBox from "../Components/DesignInfoBox";
import FloorPlan from "../Components/FloorPlan";
import { SafeAreaView } from "react-native-safe-area-context";


const ProductInfo=({ route })=>{

  const [product, setProduct]= useState(null);
  const navigation= useNavigation();
  const[error, setError]= useState(null);

  const {productId }= route.params;

  const fetchProductById= async(productId)=>{
    try{
      const design= await ProductService.getDesignById(productId);
      setProduct(design);
    }catch(e){
      console.log("design not found"+ e.message);
      setError('Design not found.', e.message);
    }
  };

  useEffect(()=>{
    if(productId){
      fetchProductById(productId);
    }
  }, [productId]);

  if(!product) {
    return (
      <View styles={styles.loadingText}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if(error){
    return (
      <View>
        <Text style={styles.errorMsg}>{error}</Text>
      </View>
    )
  };


  const floorArr= product?.floorList || [];
  const imageUrls= product?.elevationUrls || [];
    
    const totals= floorArr.reduce(
      (acc, floor)=>{
        acc.bedrooms+= Number( floor.bedrooms || 0);
        acc.bathrooms+= Number( floor.bathrooms || 0);
        acc.hall+= Number( floor.hall || 0);
        acc.kitchen+= Number( floor.kitchen || 0);
        acc.other+= floor.other || "";
        return acc;
      },
      {bedrooms: 0, bathrooms: 0, hall: 0, kitchen: 0, other: ''}
    );

    const formatePrice = (price) => {
      return price.toLocaleString('en-IN');
    };

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F8F9FB'}}>
        <StatusBar barStyle="light-content" backgroundColor="#1A3A5C"/>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 10}}>

          <ImageCarousel urls = {imageUrls}/>

          <View style={styles.contentBox}>
            <Text style={styles.categoryBadge}>
              {product.designType === 'Residential' ? product.designCategory : product.designType}
            </Text>
            <Text style={styles.priceText}>
              Price:  ₹{formatePrice(product.builtUpArea*5)}
            </Text>
          </View>

          <Text style={styles.heading}>Description:</Text>

          <View>
            <View style={styles.infoBox}>
              <Text style={styles.fieldLabel}>Design Name :</Text>
              <Text style={styles.fieldValue}> {product.designType === 'Residential' ? product.designCategory : product.designType}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.fieldLabel}> Design Type :</Text>
              <Text style={styles.fieldValue}> {product.designType}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.fieldLabel}> Plot Size :</Text>
              <Text style={styles.fieldValue}> {product.width}X{product.length}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.fieldLabel}> Total Area :</Text>
              <Text style={styles.fieldValue}> {product.totalArea}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.fieldLabel}> Built-up Area :</Text>
              <Text style={styles.fieldValue}> {product.builtUpArea}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.fieldLabel}> Plot Facing :</Text>
              <Text style={styles.fieldValue}> {product.plotFacing}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.fieldLabel}> Plot Location :</Text>
              <Text style={styles.fieldValue}> {product.plotLocation || 'Center'}</Text>
            </View>
          </View>

          <Text style={styles.heading}>Floor Details:</Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center'}}>
            <DesignInfoBox title='Floor' quantity={floorArr.length}/>
            <DesignInfoBox title='Bedroom' quantity={totals.bedrooms}/>
            <DesignInfoBox title='Bathroom' quantity={totals.bathrooms}/>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center'}}>
            <DesignInfoBox title='Kitchen' quantity={totals.kitchen}/>
            <DesignInfoBox title='Hall' quantity={totals.hall}/>
            <DesignInfoBox title='Parking' quantity={product.parking} />
          </View>

          <Text style={styles.heading}>Floor Plan:</Text>

          <View style={styles.floorPlan}>
            { product.twoDPlanUrls?.map((url, index) => (
              <FloorPlan  key={index} floor={index+1} url={url}/>
            ))}
          </View>

          <View style={styles.bottomWrapper}>
            <CustomBtn title={'See Plans'} onPress={()=> navigation.navigate('Package Details', {itemId : product.id})} />
          </View>
        </ScrollView>
      </SafeAreaView>
      
    );
};

const styles= StyleSheet.create({

  infoText:{
    fontSize: 18,
    fontWeight: '500',
    margin: 15,
    color: 'blue'
  },

  categoryBadge: {
    bottom: 8,
    left: 8,
    backgroundColor: '#1A3A5C',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  infoBox:{
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
    borderRadius: 10,
  },

  fieldLabel:{
    color: '#6B7A99',
    fontSize: 13,
    fontWeight: '400',
  },

  fieldValue:{
    color: '#1A2233',
    fontSize: 13,
    fontWeight: '500',
  },

  bottomWrapper:{
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },

  descriptionText:{
    fontWeight: '600',
    fontSize: 16,
  },

  contentBox:{
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
  },

  priceText:{
    fontWeight: '500',
    fontSize: 16,
    color: '#D4A017'
  },

  heading:{
    fontSize: 14,
    fontWeight: '500',
    color: '#1A3A5C',
    marginStart: 10,
    marginBottom: 8,
  },

  floorPlan:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  errorMsg:{
    fontSize: 18,
    color: 'red',
    alignItems: 'center',
    marginTop: 20,
  },

  loadingText:{
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default ProductInfo;