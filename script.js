async function filterList(cityInput){

    const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + cityInput + "&count=5&language=en&format=json");
    const citiesList = response.json();
    const template = document.querySelector(".cities-list-template");
    const newList = template.content.cloneNode(true);
    const citiesListed = newList.querySelector("li");
    const listContainer = document.querySelector(".list");
    for(let i = 0; i < citiesListed.length; i++){

        // A changer car citiesListed n'est plus un tableau car c'est un queryselector simple
        citiesListed[i] = citiesList.results[i].name;
        listContainer.appendChild()
    }

    citiesListed.forEach(city =>{

        const text = city.textContent.toLowerCase();
        if(text.includes(cityInput)){

            task.style.display = "flex";

        }else{

            task.style.display = "none";
        }

    });
    



    //findCitybyName()

}

async function findCityByName(city){

    const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=5&language=en&format=json");
    console.log("Test geocoding APi objet :");
    console.log(response);

    if(response.ok == false){

        console.log("Ville non reconnue");
        return null;
    }

    const citySearched = await response.json();
    
    const citySearchedLongitude = citySearched.results[0].longitude;
    const citySearchedLatitude = citySearched.results[0].latitude;
    //console.log(citySearchedLatitude);
    //console.log(citySearchedLongitude);
    
    console.log("Objet ville par nom");
    console.log(citySearched);

    createElements(citySearched);

    /*
        cityName = objet.results[0].name;
    
    */
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
    // const cityCountry = cityObject.address.country;
    // if(cityCountry == null){
    //      cityCountry = "N/A";
    //    }
    // address.town = cityName ?
    // if(cityName == null){
    //      console.log("Aucune ville ne correspond")
    //      cityName = cityObject.address.town;
    //      if(cityName == null){
    //          cityName = "N/A" ?
    //          return null;
    //    }
    //
    //      
    // }
    // const cityTemperature = cityObject.current.temperature_2m;

    // const isDay = cityObject.current.is_day;
    // if(isDay == 0){

    //     console.log("Il fait nuit");
    // }else{

    //     console.log("Il fait jour");
    // }

    // /* if cityObject.current.is_day == 0 NUIT == 1 JOUR */




}

function displayElements(elementsToAppend){

    
}

function findCityByGeoLocalisation(){

    const geoButton = document.querySelector(".geo-localisation-btn");
    geoButton.addEventListener("click", ()=>{

        //fetch?

    });

}