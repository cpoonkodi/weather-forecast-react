import './App.css';
import React, {useState,Suspense} from 'react';
import WeatherForecast from './weatherForecast';

function App() {
  const api='cwAxV8f0RQwKHtl4zGyLgHKPQkGcGGPh';
  const [city,setCity] = useState('');

  var [citykey,setCitykey]=useState([]);
  const [location,setLocation]= useState({});
  const [forecast1,setForecast1]=useState([]);

  const locationArray = [location]; 

  const cardItems = [...locationArray, ...forecast1];
  console.log('cardItems'+cardItems);

  const [showmodel,setShowmodel]=useState(false);

  const [errors, setErrors] = useState([]);
  
  const onchanged=((event)=>{
    setCity(event.target.value);
    });

  
    const onclicked=(()=>{
console.log('input'+city)
if( city === null || city.match(/^ *$/) !== null) {
  setErrors("Input Required");
} else {
  setErrors('');
  getlocation(city);
}
  })

  

    const getlocation=(async (city)=>{
      try{
        const citydetail= await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api}&q=`+city)
        .then(response=>response.json())
           const citykey1=citydetail.map(citydetail=>citydetail.Key);
           if (citydetail.length==1){
           setLocation(citydetail[0]);
           setCitykey(citykey1);
           getforecast1(citykey1)
          }
         else if (citykey1.length>1){
          console.log('Data are :' +citydetail[0])
          setLocation(citydetail[0]);
          setCitykey(citykey1[0]);
          getforecast1(citykey1[0])
         }
      }
      catch (err) {
        alert(err);
      }
      
    })


    const getforecast1=(async (citykey)=>{
      try{
        const forecastdetail= await fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${citykey}?apikey=${api}`)
        .then(response=>response.json())
        .catch(err=>{setErrors(err)});
          setForecast1(forecastdetail.DailyForecasts);
          setShowmodel(true);
      }
      catch (err) {
        alert(err);
      }
    })

    
  return (
    <div className="App">
      <header className="App-header">
          <h2>WEATHER FORECAST</h2>
        <div className='inputdata'>
                <input name='city' 
                type='text'
                   placeholder='Enter City name' 
                   value={city} onChange={onchanged} required autoFocus/>
                <button className='input-btn' onClick={onclicked}>
                    Get weather info
                </button> 
            </div>

            {errors && <div className="error"> {errors} </div>}

            {showmodel && (<WeatherForecast cardItems={cardItems}/>)}
      </header>
    </div>
  );
}

export default App;
