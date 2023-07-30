import { useState,useEffect } from "react";
import countryService from "./Services/Country";
import DisplayDetails from "./components/DisplayDetails";

function App() {
  const [countries,setCountries]=useState([])
  const [searchCountry,setSearchCountry]=useState("")

  useEffect(()=>{
    console.log("Effect Triggered");
    countryService.getAll()
    .then((allCountries=>{
      console.log(allCountries[1])
      setCountries(allCountries)
    }))}
    ,[])

  const searchHandler=(event)=>{
    console.log(event.target.value)
    setSearchCountry(event.target.value)
  }
  
  const filteredList=countries.filter((countryJson)=>countryJson.name.common.startsWith(searchCountry))



  return (
    <>
    Find Countries
    <input value={searchCountry} onChange={searchHandler}></input>
    <DisplayDetails countryList={filteredList} />
    </>
  );
}

export default App;
