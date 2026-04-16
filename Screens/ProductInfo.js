import { ScrollView, StyleSheet, Text, View } from "react-native";
import ImageCarousel from "../Components/ImageCarousel";
import CustomBtn from "../Components/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ProductService } from "../Service/ProductService";
import DesignInfoBox from "../Components/DesignInfoBox";
import FloorPlan from "../Components/FloorPlan";


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
      
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.wrapperContainer}>
          <ImageCarousel urls = {imageUrls}/>
          <View style={styles.contentBox}>
            <Text style={styles.descriptionText}>
              {product.designType === 'Residential' ? product.designCategory : product.designType}
            </Text>
            <Text style={styles.priceText}>
              Price:  ₹{formatePrice(product.builtUpArea*5)}
            </Text>
          </View>

          <Text style={styles.heading}>Description:</Text>

          <View style={styles.productInfoWrapper}>
            <View style={styles.infoBox}>
              <Text>Design Name :</Text>
              <Text> {product.designType === 'Residential' ? product.designCategory : product.designType}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text> Design Type :</Text>
              <Text> {product.designType}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text> Plot Size :</Text>
              <Text> {product.width}X{product.length}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text> Total Area :</Text>
              <Text> {product.totalArea}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text> Built-up Area :</Text>
              <Text> {product.builtUpArea}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text> Plot Facing :</Text>
              <Text> {product.plotFacing}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text> Plot Location :</Text>
              <Text> {product.plotLocation || 'Center'}</Text>
            </View>
          </View>

          <Text style={styles.heading}>Floor Details</Text>

          <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10,}}>
            <DesignInfoBox title='Floor' icon='layers' quantity={floorArr.length}/>
            <DesignInfoBox title='Bedroom' icon='bed' quantity={totals.bedrooms}/>
            <DesignInfoBox title='Bathroom' icon='shower' quantity={totals.bathrooms}/>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
            <DesignInfoBox title='Kitchen' icon='silverware-fork-knife' quantity={totals.kitchen}/>
            <DesignInfoBox title='Hall' icon='sofa' quantity={totals.hall}/>
            <DesignInfoBox title={product.parking} icon='car-outline'/>
          </View>

          <Text style={styles.heading}>Floor Plan</Text>

          <View style={styles.floorPlan}>
            { product.twoDPlanUrls?.map((url, index) => (
              <FloorPlan  key={index} floor={index+1} url={url}/>
            ))}
          </View>

          <View style={styles.bottomWrapper}>
            <CustomBtn title={'See Plans'} onPress={()=> navigation.navigate('Package Details', {itemId : product.id})} />
          </View>
        </ScrollView>
      
    );
};

const styles= StyleSheet.create({
  wrapperContainer:{
    backgroundColor: '#f8f8f8',
  },

  productInfoWrapper:{
    alignItems: 'center',
  },

  infoText:{
    fontSize: 18,
    fontWeight: '500',
    margin: 15,
    color: 'blue'
  },

  infoBox:{
    width: '90%',
    height: 'auto',
    padding:8,
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between',
  },

  bottomWrapper:{
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  descriptionText:{
    fontWeight: '600',
    fontSize: 16,
  },

  contentBox:{
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },

  priceText:{
    fontWeight: 'bold',
    fontSize: 16,
  },

  heading:{
    fontSize: 16,
    fontWeight: 'bold',
    marginStart: 10,
    marginBottom: 10,
  },

  floorPlan:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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