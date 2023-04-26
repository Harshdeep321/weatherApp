import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image ,ImageBackground, Dimensions, StatusBar } from 'react-native';
import SearchBar from './SearchBar';
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index';

export default function Weather({ weatherData, fetchWeatherData }) {

    const [backgroundImage, setBackgroundImage] = useState(null);

    const { weather,
            name,
            main: { temp, humidity },
            wind: { speed },
            sys: { sunrise, sunset },
    } = weatherData;
    const [{ main }] = weather;

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main));
    }, [weatherData])

    function getBackgroundImg(weather) {
        if(weather === 'Snow') return snow
        if(weather === 'Clear') return sunny
        if(weather === 'Rain') return rainy
        if(weather === 'Haze') return haze
        return haze;   
    }

    let textColor = backgroundImage !== sunny ? 'white' : 'black'
    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='darkgray' />
            <ImageBackground 
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'

            >
            
            {/* search bar Route */}

                <SearchBar fetchWeatherData={fetchWeatherData} />

                <View style={{alignItems: 'center' }}>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 46 }}>{name}</Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold'}}>{main}</Text>
                    <Text style={{ ...styles.headerText, color: textColor,}}>{temp} °C</Text>
                </View>

                <View style={styles.extraInfo}>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Humidity</Text>
                        <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{humidity} %</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Wind Speed</Text>
                        <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{speed} m/s</Text>
                    </View>
                
                </View>

                <View style={styles.extraInfo}>
                    <View style={styles.info}>
                        <Image 
                        source={require('../assets/sunrise.png')}
                        style={{width:40, height:40, borderRadius:40/2, marginLeft:50}}
                        />
                        <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{new Date(sunrise*1000).toLocaleString()}</Text>
                        <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Sunrise</Text>
                    </View>

                    <View style={styles.info}>
                    <Image 
                        source={require('../assets/sunset.png')}
                        style={{width:40, height:40, borderRadius:40/2, marginLeft:50}}
                        />
                        <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{new Date(sunset*1000).toLocaleString()}</Text>
                        <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Sunset</Text>
                    </View>

                </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 36,
        marginTop: 10,
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        padding: 8
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center'
    }
});
  