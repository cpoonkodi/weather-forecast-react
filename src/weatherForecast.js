import './App.css';

function WeatherForecast(props){
  console.log("test p" + props.cardItems.Type)
    return(
      <div className='wrapper'>
      <div className='card'>
          <div className='card-body'>
           <h3 className='card-title'> {props.cardItems[0].EnglishName},{props.cardItems[0].Country.EnglishName}</h3>   
           {props.cardItems[1].Day.Icon < 9
        ? <img className='card-img' src={`https://developer.accuweather.com/sites/default/files/0${props.cardItems[1].Day.Icon}-s.png` }/>
        : <img className='card-img' src={`https://developer.accuweather.com/sites/default/files/${props.cardItems[1].Day.Icon}-s.png` }/>
      }     
      <div className='temp-wrapper'>
        <div className='alin'>
        <p>Low</p> <p className='card-description'>{props.cardItems[1].Temperature.Minimum.Value}&deg;{props.cardItems[1].Temperature.Minimum.Unit}</p>
        </div>
        <div className='alin'>
        <p>High</p><p className='card-description'>{props.cardItems[1].Temperature.Maximum.Value}&deg;{props.cardItems[1].Temperature.Maximum.Unit}</p>
        </div>
        </div> 
            <p className='card-des'> {props.cardItems[1].Day.IconPhrase}</p>
          </div>
          </div>
      
        
      </div>  
    )
}

export default WeatherForecast;

