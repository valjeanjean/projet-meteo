async function findCitybyName(cityInput){

    const citySearchedInput = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + cityInput)

    if(citySearchedInput.ok == false){

        console.log("Ville non reconnue");
        return null;
    }

    const citySearched = await citySearchedInput.json();
    
    const citySearchedLongitude = citySearched.results[0].longitude;
    const citySearchedLatitude = citySearched.results[0].latitude;
    //console.log(citySearchedLatitude);
    //console.log(citySearchedLongitude);

    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + citySearchedLatitude + "&longitude=" + citySearchedLongitude + "&hourly=temperature_2m&current=temperature_2m,rain,precipitation,is_day");
    if(response.ok == false){

        return;
    }
    
    const cityByName = await response.json();
    console.log("Objet ville par nom");
    console.log(cityByName);

    createElements(cityByName);
}

async function findCityByCoordinates(){

    const coordinatesForm = document.querySelector(".coordinates-inputs");
    coordinatesForm.addEventListener("submit", async function(event){

        event.preventDefault();
        const cityLatitude = coordinatesForm.querySelector(".latitude"); //.value
        const cityLongitude = coordinatesForm.querySelector(".longitude");

        if(cityLatitude == null || cityLongitude == null){

            console.log("Erreur de récupération de classe .latitude et/ou .longitude");
            return null;
        }

        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + cityLatitude.value + "&longitude=" + cityLongitude.value + "&hourly=temperature_2m&current=temperature_2m,rain,precipitation,is_day,weather_code,relative_humidity_2m,wind_speed_10m,apparent_temperature");
        if(response.ok == false){

            return;
        }
        
        const CityByCoordinates = await response.json();
        console.log("Objet ville par coordonnées");
        console.log(CityByCoordinates);

        createElements(CityByCoordinates);
    });
}

async function createElements(cityObject){


    // console.log("Fonction createElements");
    // const cityLatitude = cityObject.latitude;
    // const cityLongitude = cityObject.longitude;
    // console.log(cityLatitude);
    // console.log(cityLongitude);

    // const response = await fetch("https://nominatim.openstreetmap.org/reverse?lat=" + cityLatitude + "&lon=" + cityLongitude + "&format=json");

    // const cityObject = await response.json();

    // const cityName = cityObject.address.city;
    // const cityTemperature = cityObject.current.temperature_2m;
    // const isDay = cityObject.current.is_day;
    // if(isDay == 0){

    //     console.log("Il fait nuit");
    // }else{

    //     console.log("Il fait jour");
    // }

    /* if cityObject.current.is_day == 0 NUIT == 1 JOUR */



}

function displayElements(elementsToAppend){

    
}

function findCityByGeoLocalisation(){

    const geoButton = document.querySelector(".geo-localisation-btn");
    geoButton.addEventListener("click", ()=>{

        //fetch?

    });

}