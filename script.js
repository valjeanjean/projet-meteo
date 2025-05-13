async function filterList(cityInput){

    const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + cityInput + "&count=5&language=en&format=json");
    const citiesList = (await response.json()).results;
    console.log("réponse fetch recherche par noms :");
    console.log(citiesList);
    const template = document.querySelector(".cities-list-template");
    
    citiesList.forEach((city, index) =>{
        
        const newList = template.content.cloneNode(true);
        const cityListed = newList.querySelector("li");
        const listContainer = document.querySelector(".list");
        listContainer.innerHTML = "";
        console.log("Taille de la liste des villes par nom : " + citiesList.length);
        cityListed.textContent = citiesList[index].name;
        cityListed.classList.add("list-li");
        console.log("Noms villes : " + citiesList[index].name);
        //console.log("Texte de la balise li : " + cityListed.textContent);
        listContainer.appendChild(newList);

        cityListed.addEventListener("click", (event)=>{
           
            const chosenCity = city.name;
            console.log("chosenCity = " + chosenCity);
            console.log("click remove")
            event.target.remove();

            findCityByName(chosenCity);
        });
    });
}

function weatherConditionIcons(weather_code){

    const weatherCodeWMO = JSON.parse(`{
        "0":{
            "day":{
                "description":"Sunny",
                "image":"http://openweathermap.org/img/wn/01d@2x.png"
            },
            "night":{
                "description":"Clear",
                "image":"http://openweathermap.org/img/wn/01n@2x.png"
            }
        },
        "1":{
            "day":{
                "description":"Mainly Sunny",
                "image":"http://openweathermap.org/img/wn/01d@2x.png"
            },
            "night":{
                "description":"Mainly Clear",
                "image":"http://openweathermap.org/img/wn/01n@2x.png"
            }
        },
        "2":{
            "day":{
                "description":"Partly Cloudy",
                "image":"http://openweathermap.org/img/wn/02d@2x.png"
            },
            "night":{
                "description":"Partly Cloudy",
                "image":"http://openweathermap.org/img/wn/02n@2x.png"
            }
        },
        "3":{
            "day":{
                "description":"Cloudy",
                "image":"http://openweathermap.org/img/wn/03d@2x.png"
            },
            "night":{
                "description":"Cloudy",
                "image":"http://openweathermap.org/img/wn/03n@2x.png"
            }
        },
        "45":{
            "day":{
                "description":"Foggy",
                "image":"http://openweathermap.org/img/wn/50d@2x.png"
            },
            "night":{
                "description":"Foggy",
                "image":"http://openweathermap.org/img/wn/50n@2x.png"
            }
        },
        "48":{
            "day":{
                "description":"Rime Fog",
                "image":"http://openweathermap.org/img/wn/50d@2x.png"
            },
            "night":{
                "description":"Rime Fog",
                "image":"http://openweathermap.org/img/wn/50n@2x.png"
            }
        },
        "51":{
            "day":{
                "description":"Light Drizzle",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
            },
            "night":{
                "description":"Light Drizzle",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
            }
        },
        "53":{
            "day":{
                "description":"Drizzle",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
            },
            "night":{
                "description":"Drizzle",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
            }
        },
        "55":{
            "day":{
                "description":"Heavy Drizzle",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
            },
            "night":{
                "description":"Heavy Drizzle",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
            }
        },
        "56":{
            "day":{
                "description":"Light Freezing Drizzle",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
            },
            "night":{
                "description":"Light Freezing Drizzle",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
            }
        },
        "57":{
            "day":{
                "description":"Freezing Drizzle",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
            },
            "night":{
                "description":"Freezing Drizzle",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
            }
        },
        "61":{
            "day":{
                "description":"Light Rain",
                "image":"http://openweathermap.org/img/wn/10d@2x.png"
            },
            "night":{
                "description":"Light Rain",
                "image":"http://openweathermap.org/img/wn/10n@2x.png"
            }
        },
        "63":{
            "day":{
                "description":"Rain",
                "image":"http://openweathermap.org/img/wn/10d@2x.png"
            },
            "night":{
                "description":"Rain",
                "image":"http://openweathermap.org/img/wn/10n@2x.png"
            }
        },
        "65":{
            "day":{
                "description":"Heavy Rain",
                "image":"http://openweathermap.org/img/wn/10d@2x.png"
            },
            "night":{
                "description":"Heavy Rain",
                "image":"http://openweathermap.org/img/wn/10n@2x.png"
            }
        },
        "66":{
            "day":{
                "description":"Light Freezing Rain",
                "image":"http://openweathermap.org/img/wn/10d@2x.png"
            },
            "night":{
                "description":"Light Freezing Rain",
                "image":"http://openweathermap.org/img/wn/10n@2x.png"
            }
        },
        "67":{
            "day":{
                "description":"Freezing Rain",
                "image":"http://openweathermap.org/img/wn/10d@2x.png"
            },
            "night":{
                "description":"Freezing Rain",
                "image":"http://openweathermap.org/img/wn/10n@2x.png"
            }
        },
        "71":{
            "day":{
                "description":"Light Snow",
                "image":"http://openweathermap.org/img/wn/13d@2x.png"
            },
            "night":{
                "description":"Light Snow",
                "image":"http://openweathermap.org/img/wn/13n@2x.png"
            }
        },
        "73":{
            "day":{
                "description":"Snow",
                "image":"http://openweathermap.org/img/wn/13d@2x.png"
            },
            "night":{
                "description":"Snow",
                "image":"http://openweathermap.org/img/wn/13n@2x.png"
            }
        },
        "75":{
            "day":{
                "description":"Heavy Snow",
                "image":"http://openweathermap.org/img/wn/13d@2x.png"
            },
            "night":{
                "description":"Heavy Snow",
                "image":"http://openweathermap.org/img/wn/13n@2x.png"
            }
        },
        "77":{
            "day":{
                "description":"Snow Grains",
                "image":"http://openweathermap.org/img/wn/13d@2x.png"
            },
            "night":{
                "description":"Snow Grains",
                "image":"http://openweathermap.org/img/wn/13n@2x.png"
            }
        },
        "80":{
            "day":{
                "description":"Light Showers",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
            },
            "night":{
                "description":"Light Showers",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
            }
        },
        "81":{
            "day":{
                "description":"Showers",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
            },
            "night":{
                "description":"Showers",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
            }
        },
        "82":{
            "day":{
                "description":"Heavy Showers",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
            },
            "night":{
                "description":"Heavy Showers",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
            }
        },
        "85":{
            "day":{
                "description":"Light Snow Showers",
                "image":"http://openweathermap.org/img/wn/13d@2x.png"
            },
            "night":{
                "description":"Light Snow Showers",
                "image":"http://openweathermap.org/img/wn/13n@2x.png"
            }
        },
        "86":{
            "day":{
                "description":"Snow Showers",
                "image":"http://openweathermap.org/img/wn/13d@2x.png"
            },
            "night":{
                "description":"Snow Showers",
                "image":"http://openweathermap.org/img/wn/13n@2x.png"
            }
        },
        "95":{
            "day":{
                "description":"Thunderstorm",
                "image":"http://openweathermap.org/img/wn/11d@2x.png"
            },
            "night":{
                "description":"Thunderstorm",
                "image":"http://openweathermap.org/img/wn/11n@2x.png"
            }
        },
        "96":{
            "day":{
                "description":"Light Thunderstorms With Hail",
                "image":"http://openweathermap.org/img/wn/11d@2x.png"
            },
            "night":{
                "description":"Light Thunderstorms With Hail",
                "image":"http://openweathermap.org/img/wn/11n@2x.png"
            }
        },
        "99":{
            "day":{
                "description":"Thunderstorm With Hail",
                "image":"http://openweathermap.org/img/wn/11d@2x.png"
            },
            "night":{
                "description":"Thunderstorm With Hail",
                "image":"http://openweathermap.org/img/wn/11n@2x.png"
            }
        }
    }`);

    const weatherConditionObject = weatherCodeWMO[weather_code];

    return weatherConditionObject;
}

async function findCityByName(city){

    const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1&language=en&format=json");
    console.log("Test geocoding APi objet :");
    console.log(response);

    if(response.ok == false){

        console.log("Ville non reconnue");
        return null;
    }

    const citySearched = (await response.json()).results;
    console.log("citySearched :");
    console.log(citySearched);
    // console.log(citySearched[0].latitude);
    // console.log(citySearched[0].longitude);
    
    //const cityInfosObject;

    const response2 = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + citySearched[0].latitude + "&longitude=" + citySearched[0].longitude + "&hourly=temperature_2m&current=temperature_2m,rain,precipitation,is_day,weather_code,relative_humidity_2m,wind_speed_10m,apparent_temperature");
    const cityInfosObject = await response2.json();
    cityInfosObject.country = citySearched[0].country;
    cityInfosObject.name = citySearched[0].name;
    console.log("Objet ville par nom");
    console.log(cityInfosObject);

    createElements(cityInfosObject);

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

            return null;
        }

        const CityByCoordinates = await response.json();
        console.log("Objet ville par coordonnées");
        console.log(CityByCoordinates);

        // Comment rajouter champs dans objet pour mettre nom de la ville, et du pays

        createElements(CityByCoordinates);
    });
}

async function createElements(cityObject){


    const cityWeatherCode = cityObject.current.weather_code;
    const cityCurrentTemperature = cityObject.current.temperature_2m;
    const cityIsDay = cityObject.current.is_day;
    const cityWindSpeed = cityObject.current.wind_speed_10m;
    const cityName = cityObject.name;
    const cityCountry = cityObject.country;

    const template = document.querySelector(".meteo-display-template");
    const newDiv = template.content.cloneNode(true);

    const h1 = newDiv.querySelector("h1");
    h1.textContent = cityCountry;
    const h2 = newDiv.querySelector("h2");
    h2.textContent = cityName;
    const h3 = newDiv.querySelector("h3");
    h3.textContent = cityCurrentTemperature + "°C";
    const img = newDiv.querySelector("img");

    const weatherConditionObject = weatherConditionIcons(cityWeatherCode);
    console.log("weatherConditionObject = ");
    console.log(weatherConditionObject);
    if(cityIsDay == 1){

        img.src = weatherConditionObject.day.image;
        //img.classList.add("")

    }else{

        img.src = weatherConditionObject.night.image;
    }

    displayElements(newDiv);
}


// fetch("http://ksekjfk",{
//     method : "POST",
//     body : JSON.stringify,
//     headers : {
//         "Content-Type" : "application/json"
//     }
// })

function displayElements(elementsToAppend){

    const displayWeatherContainer = document.querySelector(".weather-display-container");
    displayWeatherContainer.innerHTML = "";
    displayWeatherContainer.appendChild(elementsToAppend);
    
}

function findCityByGeoLocalisation(){

    const geoButton = document.querySelector(".geo-localisation-btn");
    geoButton.addEventListener("click", ()=>{

        //fetch?

    });

}