import React, { useState, useEffect } from "react";
import { Dimensions, Image } from "react-native";

const screenWidth= Dimensions.get('window').width;

const CarouselItem= React.memo(({uri})=>{
    const[imgHeight, setImgHeight] = useState(320);

    useEffect(() => {
  Image.getSize(
    uri,
    (width, height) => {
      const ratio = height / width;
      setImgHeight(screenWidth * ratio);
    },
    () => {
      setImgHeight(320); // fallback
    }
  );
}, [uri]);

    return (
        <Image 
		source={{uri}} 
		resizeMode = 'cover'
		style={{
			width: screenWidth, 
			height: imgHeight,
		}}/>
    )
});

export default CarouselItem;