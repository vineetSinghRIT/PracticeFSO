import axios from "axios";

const baseUrl=`https://api.openweathermap.org/data/2.5/weather?q=`
console.log(`${baseUrl}${"Delhi"}&appid=${process.env.REACT_APP_API_KEY}`)
const getWeather=(city)=>{
    const request=axios.get(`${baseUrl}${city}&appid=${process.env.REACT_APP_API_KEY}`)
    return request.then(response=>response.data)
}

export default {getWeather}