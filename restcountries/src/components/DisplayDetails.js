import ViewCountryDetails from "./ViewCountryDetails";
import { useState} from "react";
import SelectedCountry from "./SelectedCountry";

const DisplayDetails = (props) => {
  const lc = props.countryList;
  const [viewCountry,setViewCntry]=useState("")

  const cntryButtonHandler=(cntry)=>{
    console.log(cntry)
    setViewCntry(cntry.name.common)
  }

  const selectData=lc.find(cntry=>cntry.name.common===viewCountry)

  if (lc.length > 10) {
    return <div>Too many countries to Display please refine search</div>;
  }
  if (lc.length === 0) {
    return <div>Nothing Found , Try again</div>;
  }
  if (lc.length === 1) {
    return (
      <>
        <ViewCountryDetails country={lc[0]} />
      </>
    );
  } else {
    return (
      <div>
        <ul>
          {lc.map((cntry) => (
            <li key={cntry.name.common}>
                {cntry.name.common}
                <button onClick={()=>cntryButtonHandler(cntry)}>Show</button>
            </li>
          ))}
        </ul>
        <SelectedCountry cntry={selectData}/>
      </div>
    );
  }
};

export default DisplayDetails;
