import React, { useState } from "react";
import { Dimensions, Image } from "react-native";

const screenWidth= Dimensions.get('window').width;

const CarouselItem= React.memo(({uri})=>{
    const[imgHeight, setImgHeight] = useState(320);

    Image.getSize(uri, (width, height) => {
        const ratio = height / width;
        setImgHeight(screenWidth* ratio);
    });

    return (
        <Image source={{uri}} style={{width: screenWidth, height: imgHeight}}/>
    )
});

export default CarouselItem;