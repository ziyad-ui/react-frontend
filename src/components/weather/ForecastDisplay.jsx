import React from 'react';

const ForecastDisplay = ({ data }) => {
  const { current, forecast } = data;

  return (
    <div className="forecast-display">
      <div className="forecast-current">
        <h3>{current.city}</h3>
        <p className="forecast-temp">
          {Math.round(current.temperature)}°C, {current.description}
        </p>
        <p>
          Humidity: {current.humidity}% | Wind: {current.windSpeed} m/s
        </p>
      </div>

      <div className="forecast-list">
        {forecast.map((item) => (
          <div key={item.date} className="forecast-item">
            <p className="forecast-date">{item.date}</p>
            <p className="forecast-temp">
              {Math.round(item.temperatureMin)}°C - {Math.round(item.temperatureMax)}°C
            </p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;

