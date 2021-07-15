const axios = require('axios');

class Busquedas{



    constructor(){

    }

    get paramsMapBox(){

        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather(){
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad( lugar = ''){

        try {
            
            const instance= axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
    
            })
            const res= await instance.get()
            return res.data.features.map( lugar => ({
                id: lugar.id,
                name: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
    
            
        } catch (error) {
            
            return [];
        }
    }

    async climaLugar(lat, long){

        try {
            
            const instance= axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, long}
            })

            const res = await instance.get()
            return res.data;

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = Busquedas;