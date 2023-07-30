
import WeatherBoy from "../Services/WeatherBoy";
import { useState } from "react";

function ViewCountryDetails(props){
    const lc=props.country;
    const captial=lc.capital[0]
    console.log(captial)
    const [icon,setIcon]=useState("")
    const [temp,setTemp]=useState("")
    const [wind,setWind]=useState("")

    const setWeatherConditions=(reponse)=>{
        const weather=reponse.weather
        setIcon(weather[0].icon)
        setTemp(reponse.main.temp)
        setWind(reponse.wind.speed)
    }

    const weatherDetails=WeatherBoy.getWeather(captial)
    .then((rep)=>setWeatherConditions(rep))

    const keyValuePairsArray = Object.entries(lc.languages);
        const imageUrl=lc.flags.png;
        const iconUrl=`https://openweathermap.org/img/wn/${icon}@2x.png`
        return(
            <div>
                <h2>{lc.name.common}</h2>
                Capital
                <ul>
                    {lc.capital.map(cap=><li key={cap}>{cap}</li>)}
                </ul>
                <div>Area {lc.area}</div>

                <h3>Languages</h3>
                <ul>
                    {keyValuePairsArray.map(([code,lan])=><li key={code}>{lan}</li>)}
                </ul>
                <img src={imageUrl} alt="Flag"></img>
                <h2>Weather in {captial}</h2>
                <div>Temperature is {temp} Celsius</div>
                <img src={iconUrl} alt="Icon"></img>
                <div>Wind is {wind} m/s</div>
            </div>
        )
}

export default ViewCountryDetails;