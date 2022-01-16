import React,{useState,useEffect} from 'react'
import Weathercards from './Weathercards';
import './index.css'

 
function App() {

 const [searchValue, setsearchValue] = useState("pune");

 const [tempInfo, settempInfo] = useState({})

 const getWeatherInfo = async () =>{
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=7908fe687f47c9868b4ef5ae8bfe580a`;
        
      const res= await fetch(url );
      const data=await res.json();
       
      const {temp,humidity,pressure}=data.main;
      const{main:weathermood}=data.weather[0];
      const{name}=data;
      const{speed}=data.wind;
      const{country,sunset}=data.sys;

      const myNewWeatherInfo={
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,

        
      }
     settempInfo(myNewWeatherInfo);

    } catch (error) {
      console.log(error);
    }
 };

  useEffect(() => {
  getWeatherInfo();
  }, []);

  return (
    <>
      <div className='wrap'>
      <div className='search'>
      <input type="search"
        placeholder='search...'
        autoFocus
        id='search'
        className='searchTerm'
        value={searchValue}
        onChange={(e) => setsearchValue(e.target.value)}
        
      />
        
        <button className='searchButton' type='button' onClick={getWeatherInfo}>
         search
        </button>
      </div>
     
      </div>
        {/* our card */}

        <Weathercards tempInfo={tempInfo}/>      
         
    </>
  )
}

export default App;