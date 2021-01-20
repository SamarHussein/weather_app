import React , {useState  } from 'react';
import {FaCloudSun} from 'react-icons/fa';

import './App.css';

const api = {
  key: '90e480e24c398dbf31feb47b0987e034',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query , setQuery] = useState('');
  const [ weather , setWeather] = useState({});
  const [icon , setIcon ] = useState(true);

  const search = async  (e)=> {
    try {
      if (e.key === 'Enter') {
        setIcon(false);
        const response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
        console.log(response)
        const data = await response.json();
        setWeather(data);
        setQuery('');
        console.log('WEATHER',data); 
  
      }

    }catch (e) {
      console.log(e);
    }
    
  }

  //let time;
  const dateToday = (d)=> {
    let days = ['Sunday', 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' ]
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    console.log(day , month);
    //time = `${d.getHours()}:${d.getMinutes()}` ;
    return `${day}, ${d.getDate()} ${month} ${d.getFullYear()}`;
  } 
    

  return (
    <div className={typeof (weather.main) != 'undefined'? (weather.main.temp > 16 ? 'app warm': 'app cold'): 'app'}>
     
      <main className="main">
      <div className={icon? 'show-icon': 'hide-icon'}>
          <FaCloudSun />
        </div>
        <input 
        className="search-bar"
          type="text"
          placeholder="search city"
          onChange={(e)=>setQuery(e.target.value)}
          value={query}
          onKeyPress={search} >
        </input>

        { typeof(weather.main) != 'undefined'? 
          ( <div>
              <div className="heading">
                <h1>{weather.name}, {weather.sys.country}</h1>
                <h3>{dateToday(new Date())}</h3>
              </div>
              <div className="main-temp">
                <h2>{Math.round(weather.main.temp)}ºC</h2>
              
              </div>
              <div>
                <p>{weather.weather[0].description}</p>
              </div>
              <div className="feels-like">
                <p>Feels like: {Math.round(weather.main.feels_like)}</p>
              </div>
              <div className="extreme">
                <p>Low: {Math.round(weather.main.temp_min)}ºC</p>
                <p>Max: {Math.round(weather.main.temp_max)}ºC</p>

              </div>
              
            </div>) : ('')
        }

      </main>
    </div>
  );
}

export default App;
