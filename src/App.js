import './App.css';
import React, {useState,Suspense} from 'react';
import WeatherForecast from './weatherForecast';

function App() {
  const api='GUPIGVK9BS4DHOOx2iKFLZwbHwq37nWa';
  const [city,setCity] = useState('');
  const error={};

  var [citykey,setCitykey]=useState([]);
  const [location,setLocation]= useState({});
  const [forecast1,setForecast1]=useState([]);

  console.log('location : '+typeof location)
  console.log('forecast: '+typeof forecast1)

  const locationArray = [location]; 

  const cardItems = [...locationArray, ...forecast1];
  console.log('cardItems'+cardItems);

  const [showmodel,setShowmodel]=useState(false);
  
  const onchanged=((event)=>{
    setCity(event.target.value);
    });

  
    const onclicked=(()=>{
        getlocation(city);
  })

  

    const getlocation=(async (city)=>{
      const citydetail= await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api}&q=`+city)
      .then(response=>response.json());
      console.log('citydetail tye:'+typeof citydetail)
      const citykey1=citydetail.map(citydetail=>citydetail.Key);
      console.log('citykey type:'+typeof citykey1)

      if (citydetail.length==1){
        setLocation(citydetail[0]);
        setCitykey(citykey1);
        getforecast1(citykey1)
      }
      else if (citykey1.length>1){
        //const a=citykey1[0];
        //const b=citydetail[0];
        console.log('Muruga'+citykey1[0])
        console.log('length'+citykey1.length)
        console.log('Data are :' +citydetail[0])
        setLocation(citydetail[0]);
        setCitykey(citykey1[0]);
        console.log('Poonkodi'+location)
        getforecast1(citykey1[0])
      }
      
      console.log('waiting1'+ citykey)
      console.log('waiting12'+ citydetail)
      
    })

    const getforecast1=(async (citykey)=>{
      console.log('hello');
      const forecastdetail= await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${citykey}?apikey=${api}`)
      .then(response=>response.json());
      console.log('result'+forecastdetail)
      setForecast1(forecastdetail.DailyForecasts);
      setShowmodel(true);
    })

    

  return (
    <div className="App">
      <header className="App-header">
      
          <h2>WEATHER FORECAST</h2>
    
        <div className='inputdata'>
                <input name='city' 
                   placeholder='Enter City name' 
                   value={city} onChange={onchanged} 
                />
                
                <button className='input-btn' onClick={onclicked}>
                    Get weather info
                </button> 
            </div>
            {showmodel && (<WeatherForecast cardItems={cardItems}/>)}
            
      </header>
      

    </div>
  );
}

export default App;
