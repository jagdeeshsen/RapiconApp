import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import CarouselItem from "../Components/CarouselItem";

const { width } = Dimensions.get('window');

const ImageCarousel=({ urls })=>{

    const [activeIndex, setActiveIndex]= useState(0);

    const handleOnScroll=(event)=>{
        const index= Math.round(
            event.nativeEvent.contentOffset.x / width
        );
        setActiveIndex(index);
    };

    return (
        <View style={styles.wrapperContainer}>
            <FlatList
                data={urls}
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                keyExtractor={(_, index)=> index.toString()}
                renderItem={({item})=> <CarouselItem uri={item}/>}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                windowSize={5}
                removeClippedSubviews
            />
            <View style={styles.dotsContainer}>
                {urls.map((_, index ) => (
                    <View 
                        key={index}
                        style={[styles.dot, activeIndex === index && styles.activeDot,]}>
                    </View>
                ))}
                
            </View>
        </View>
    );
};

const styles= StyleSheet.create({
    wrapperContainer:{
        backgroundColor: '#F8F9FB',
    },

    dotsContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 8,
    },

    dot:{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4
    },

    activeDot:{
        backgroundColor: '#1A3A5C'
    },

});


export default ImageCarousel;