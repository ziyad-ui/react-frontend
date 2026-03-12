import axios from 'axios';

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const weatherClient = axios.create({
  baseURL: WEATHER_BASE_URL,
});

export const getCurrentWeatherAndForecast = async (city) => {
  if (!WEATHER_API_KEY) {
    throw new Error('Missing VITE_WEATHER_API_KEY in environment variables.');
  }

  const [currentRes, forecastRes] = await Promise.all([
    weatherClient.get('/weather', {
      params: {
        q: city,
        units: 'metric',
        appid: WEATHER_API_KEY,
      },
    }),
    weatherClient.get('/forecast', {
      params: {
        q: city,
        units: 'metric',
        appid: WEATHER_API_KEY,
      },
    }),
  ]);

  const current = {
    city: currentRes.data.name,
    temperature: currentRes.data.main.temp,
    humidity: currentRes.data.main.humidity,
    windSpeed: currentRes.data.wind.speed,
    description: currentRes.data.weather[0].description,
  };

  const byDate = {};
  for (const entry of forecastRes.data.list) {
    const date = entry.dt_txt.split(' ')[0];
    if (!byDate[date]) {
      byDate[date] = {
        date,
        temperatureMin: entry.main.temp_min,
        temperatureMax: entry.main.temp_max,
        description: entry.weather[0].description,
      };
    } else {
      byDate[date].temperatureMin = Math.min(byDate[date].temperatureMin, entry.main.temp_min);
      byDate[date].temperatureMax = Math.max(byDate[date].temperatureMax, entry.main.temp_max);
    }
  }

  const forecast = Object.values(byDate).slice(0, 5);

  return { current, forecast };
};

