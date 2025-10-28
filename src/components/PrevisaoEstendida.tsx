import {
  WiRain,
  WiCloudy,
  WiDaySunny,
  WiThunderstorm,
  WiSnow,
  WiSprinkle,
  WiFog,
  WiDayCloudy
} from 'react-icons/wi';

interface ForecastDay {
  day: string;           // Day name: "Sat", "Sun", "Mon", etc.
  condition: string;     // Weather condition: "Rain", "Clouds", "Clear", "Thunderstorm", etc.
  highTemp: number;      // High temperature in degrees
  lowTemp: number;       // Low temperature in degrees
}

interface Props {
  forecastData: ForecastDay[];  // Array of 7 days
}

const PrevisaoEstendida = ({ forecastData }: Props) => {
  // Helper function to get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const iconProps = { className: "text-5xl text-blue-300 my-3" };

    switch (condition.toLowerCase()) {
      case 'rain':
        return <WiRain {...iconProps} />;
      case 'clouds':
        return <WiCloudy {...iconProps} />;
      case 'clear':
        return <WiDaySunny {...iconProps} />;
      case 'thunderstorm':
        return <WiThunderstorm {...iconProps} />;
      case 'snow':
        return <WiSnow {...iconProps} />;
      case 'drizzle':
        return <WiSprinkle {...iconProps} />;
      case 'mist':
      case 'fog':
        return <WiFog {...iconProps} />;
      default:
        return <WiDayCloudy {...iconProps} />;
    }
  };

  return (
    <div className="rounded-lg bg-gray-700 p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-blue-400 mb-4">Extended Forecast</h2>

      {/* Forecast Grid */}
      <div className="grid grid-cols-7 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        {forecastData.map((day, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-3 text-center"
          >
            {/* Day name */}
            <div className="font-bold text-blue-400 text-sm mb-2">
              {day.day}
            </div>

            {/* Weather icon */}
            <div className="flex justify-center">
              {getWeatherIcon(day.condition)}
            </div>

            {/* Condition text */}
            <div className="text-gray-300 text-sm mb-2">
              {day.condition}
            </div>

            {/* Temperature range */}
            <div className="text-gray-400 text-xs">
              {day.highTemp}°/{day.lowTemp}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrevisaoEstendida;