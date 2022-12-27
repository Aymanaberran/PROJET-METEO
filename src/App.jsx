import './App.css';
import React, { useState , useEffect} from 'react';
import clear from './img/clear.jpg';
import cloudy from './img/cloudy.jpg';
import overcast from './img/overcast.jpg';
import rainy from './img/rainy.jpg';
import snow from './img/snow.jpg';
import cleari from './img/cleari.png';
import cloudyi from './img/cloudyi.png';
import overcasti from './img/overcasti.png';
import rainyi from './img/rainyi.png';
import snowi from './img/snowi.png';



function App() {

  const [place,setPlace] = useState("");
  const [placeinfo,setPlaceinfo] = useState({});

  useEffect(() => {
    hendelfetch();
  }, []);

  const hendelfetch = () =>{
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=94c554714e934b4ba33211958220912&q=${place}&days=1&aqi=no&alerts=no`
    )
    .then((response) => response.json())
    .then((data) => setPlaceinfo ({
      name:data.location.name,
      region:data.location.region,
      country:data.location.country,
      current: data.current.temp_f,
      maxtemp: data.forecast.forecastday[0].day.maxtemp_f,
      mintemp: data.forecast.forecastday[0].day.mintemp_f,
      condition: data.current.condition.text
    })
    );
  setPlace("");
  };


  return(
    <div className='container' style={
                                      placeinfo.condition?.includes("Sunny") || 
                                      placeinfo.condition?.includes("Clear")
                                      ? {backgroundImage:`url(${clear})`}
                                      :placeinfo.condition?.includes("cloudy")
                                      ? {backgroundImage:`url(${cloudy})`}
                                      :placeinfo.condition?.includes("rain")
                                      ? {backgroundImage:`url(${rainy})`}
                                      :placeinfo.condition?.includes("Freezing fog")
                                      ? {backgroundImage:`url(${snow})`}
                                      : {backgroundImage:`url(${overcast})`}
                                      }
                                      >
      <div className='search'>
        <div className='p1'>
          <h1 className='s'>METEO</h1>
        </div>
        <div className='p2'>
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)}/><br/>
          <button onClick={hendelfetch}>Search</button>
        </div>
        <div>
          <h2 className='n'>{placeinfo.name} ,  {placeinfo.country}</h2>
          <div className='ay'
            style={
              placeinfo.condition?.includes("Sunny") || 
              placeinfo.condition?.includes("Clear")
              ? {backgroundImage:`url(${cleari})`}
              :placeinfo.condition?.includes("cloudy")
              ? {backgroundImage:`url(${cloudyi})`}
              :placeinfo.condition?.includes("rain")
              ? {backgroundImage:`url(${rainyi})`}
              :placeinfo.condition?.includes("Freezing fog")
              ? {backgroundImage:`url(${snowi})`}
              : {backgroundImage:`url(${overcasti})`}
              }
          ></div>
          <h1 className='big'>{placeinfo.current} ° F</h1>
        </div>
        <div className='b'>
            <h1>{placeinfo.condition}</h1>
            <h1>{placeinfo.maxtemp} ° F</h1>
            <h1>{placeinfo.mintemp} ° F</h1>
        </div>
        </div>
    </div>
  )
}


export default App ;  