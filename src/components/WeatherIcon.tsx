import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiRain,
  WiDayRain,
  WiThunderstorm,
  WiSnow,
  WiDayFog,
  WiNightClear,
  WiNightCloudy,
  WiNightRain,
  WiNightFog
} from "react-icons/wi";

interface WeatherIconProps {
  weatherCode: number;
  size?: number;
  color?: string;
  isDay?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  weatherCode, 
  size = 64, 
  color = "currentColor",
  isDay = true 
}) => {
  // Mapeamento de códigos de clima para ícones
  // Baseado nos códigos da API Open-Meteo: https://open-meteo.com/en/docs
  const getWeatherIcon = () => {
    // Céu limpo
    if (weatherCode === 0) {
      return isDay ? <WiDaySunny size={size} color={color} /> : <WiNightClear size={size} color={color} />;
    }
    // Parcialmente nublado
    else if (weatherCode === 1 || weatherCode === 2) {
      return isDay ? <WiDayCloudy size={size} color={color} /> : <WiNightCloudy size={size} color={color} />;
    }
    // Nublado
    else if (weatherCode === 3) {
      return <WiCloudy size={size} color={color} />;
    }
    // Nevoeiro
    else if ([45, 48].includes(weatherCode)) {
      return isDay ? <WiDayFog size={size} color={color} /> : <WiNightFog size={size} color={color} />;
    }
    // Chuva leve/moderada
    else if ([51, 53, 55, 56, 57, 61, 63, 80, 81].includes(weatherCode)) {
      return isDay ? <WiDayRain size={size} color={color} /> : <WiNightRain size={size} color={color} />;
    }
    // Chuva forte
    else if ([65, 66, 67, 82].includes(weatherCode)) {
      return <WiRain size={size} color={color} />;
    }
    // Neve
    else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
      return <WiSnow size={size} color={color} />;
    }
    // Tempestade
    else if ([95, 96, 99].includes(weatherCode)) {
      return <WiThunderstorm size={size} color={color} />;
    }
    // Padrão para códigos não mapeados
    return <WiCloud size={size} color={color} />;
  };

  return (
    <div>
      {getWeatherIcon()}
    </div>
  );
};

export default WeatherIcon;
