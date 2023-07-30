
import ViewCountryDetails from "./ViewCountryDetails";

function SelectedCountry(props){

    if(props.cntry)
    {
        return(<><ViewCountryDetails country={props.cntry}/> </>)
    }

}

export default SelectedCountry;