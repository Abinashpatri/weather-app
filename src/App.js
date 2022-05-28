import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [cond, setCond] = useState([]);

  const url = `https://api.weatherstack.com/current?access_key=d3166618b751ff3708e84044f2b10320&query=${query}`;

  async function getData() {
    const result = await axios.get(url);
    setCond([result.data]);
    console.log(result.data);
  }

  const submitForm = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      <form onSubmit={submitForm} className="form">
        <input
          type="text"
          placeholder="enter the place"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Enter</button>
      </form>
      {cond.map((item, index) => {
        return (
          <div key={index} className="items">
            <div className="place">
              <img src={item.current.weather_icons} alt="" />
              <p>{item.location.country}</p>
              <p>{item.location.region}</p>

              <div className="condition">
                <p>{item.current.observation_time}</p>
                <p>{item.current.temperature}</p>
                <p>
                  <span>Pressure</span> : {item.current.pressure}
                </p>
                <p>
                  <span>Wind degree</span> : {item.current.wind_degree}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
