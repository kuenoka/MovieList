import React, { useState, useEffect } from "react";
import { View, Text , Dimensions, Image, SafeAreaView } from 'react-native';

function DetailsScreen({route}) {

    const {movieTitle} = route.params
    const {releaseYear} = route.params
    const {movieImage} = route.params
    const {myBackgroundColor} = route.params

    const [dimensions, setDimensions] = useState({ window, screen });

    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });
    
    return (
        <SafeAreaView>
            <View style = {{ alignItems: 'center',justifyContent:'center', backgroundColor: myBackgroundColor}}> 
                <Image source = {{uri: movieImage} } style = {{width: dimensions.window.width, height: dimensions.window.height/2,resizeMode: 'contain',}}/>
                <Text style = {{color: '#ffffff', height: dimensions.window.height/6, alignItems: 'center', justifyContent: 'center', fontSize: 40}}>{movieTitle}</Text>
                <Text style = {{color: '#ffffff', height: dimensions.window.height/6, alignItems: 'center', justifyContent: 'center', fontSize: 40}}>{releaseYear}</Text>
            </View>
            
            
        </SafeAreaView>
    );
}

//
//

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default DetailsScreen;