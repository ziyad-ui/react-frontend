import React from 'react';
import ForecastDisplay from './ForecastDisplay.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import { getCurrentWeatherAndForecast } from '../../services/weatherApi.js';

const WeatherWidget = () => {
  const [location, setLocation] = React.useState('Manila');
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const loadWeather = async (city) => {
    setError('');
    setLoading(true);
    try {
      const result = await getCurrentWeatherAndForecast(city);
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load weather');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadWeather(location);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    loadWeather(location.trim());
  };

  return (
    <div className="weather-widget">
      <form className="weather-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city name"
        />
        <button className="secondary-button" type="submit" disabled={loading}>
          Search
        </button>
      </form>

      {loading && (
        <div className="weather-loading">
          <LoadingSpinner />
        </div>
      )}

      {error && <p className="weather-error">{error}</p>}

      {data && !loading && <ForecastDisplay data={data} />}
    </div>
  );
};

export default WeatherWidget;

