import React, { useState } from 'react'

const api = {
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})


  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('')
          setWeather(result)
          console.log(result)
        })
    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()


    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className=
      {
        (typeof weather.main != "undefined") ?
          ((weather.main.temp > 16) ? "app warm" : "app")
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())} </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
            <div className="weather-box size">
              <div className="details temp">


                <div className="items">Min Temp : {Math.round(weather.main.temp_min)}°C</div>
                <div className="items">Max Temp : {Math.round(weather.main.temp_max)}°C</div>

                <div className="items">Sunrise : {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</div>
                <div className="items">Sunset : {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</div>

                <div className="items">Humidity : {Math.round(weather.main.humidity)}%</div>
                <div className="items">Pressure : {Math.round(weather.main.pressure)} mbar</div>

              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
