// src/components/ClimaAtual.tsx
import { WiHumidity, WiBarometer } from "react-icons/wi"; // Ícones de clima
import { FiThermometer, FiArrowUp, FiArrowDown, FiWind } from "react-icons/fi"; // Ícones de UI
import { useState } from "react";
import WeatherIcon from "./WeatherIcon";

interface DadosClima {
  current_weather?: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    is_day: number;
  };
  hourly?: {
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
  };
  daily?: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

interface ClimaAtualProps {
  locationData: { display_name: string } | null; // Pode ser mais específico se soubermos a estrutura exata
  weatherData: DadosClima | null;
}

// Função para converter Celsius para Fahrenheit
const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

// Função para obter descrição do clima com base no código
const getWeatherDescription = (weatherCode: number): string => {
  const weatherDescriptions: { [key: number]: string } = {
    0: "Céu limpo",
    1: "Parcialmente nublado",
    2: "Nublado",
    3: "Encoberto",
    45: "Nevoeiro",
    48: "Nevoeiro com geada",
    51: "Garoa leve",
    53: "Garoa moderada",
    55: "Garoa intensa",
    56: "Garoa congelante leve",
    57: "Garoa congelante intensa",
    61: "Chuva leve",
    63: "Chuva moderada",
    65: "Chuva intensa",
    66: "Chuva congelante leve",
    67: "Chuva congelante intensa",
    71: "Neve leve",
    73: "Neve moderada",
    75: "Neve intensa",
    77: "Granizo",
    80: "Pancadas de chuva leve",
    81: "Pancadas de chuva moderada",
    82: "Pancadas de chuva intensa",
    85: "Pancadas de neve leve",
    86: "Pancadas de neve intensa",
    95: "Tempestade",
    96: "Tempestade com granizo leve",
    99: "Tempestade com granizo intenso",
  };

  return weatherDescriptions[weatherCode] || "Desconhecido";
};

const ClimaAtual = ({ locationData, weatherData }: ClimaAtualProps) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const current_weather = weatherData?.current_weather;
  const temperature = current_weather?.temperature;
  const windspeed = current_weather?.windspeed;
  const humidity = weatherData?.hourly?.relative_humidity_2m?.[0]; // Pegar a primeira hora
  const weatherCode = current_weather?.weathercode;
  const isDay = current_weather?.is_day === 1;

  // Temperatura formatada de acordo com a unidade selecionada
  const displayTemperature = temperature
    ? Math.round(isCelsius ? temperature : celsiusToFahrenheit(temperature))
    : "--";

  return (
    // #1. O card principal (fundo cinza-700, bordas arredondadas)
    <div className="mt-6 rounded-lg bg-gray-700 p-4 text-white">
      {/* #2. O header do card (título e o seletor F/C) */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-300">Clima Atual</h2>
        {/* Seletor F/C interativo */}
        <div
          className="rounded-full bg-gray-600 px-3 py-1 text-sm font-medium cursor-pointer"
          onClick={() => setIsCelsius(!isCelsius)}
        >
          {isCelsius ? "°C" : "°F"}
        </div>
      </div>

      {/* #3. O conteúdo principal (grid de 2 colunas)
            - Em telas pequenas (mobile), será 1 coluna (grid-cols-1)
            - Em telas médias ou maiores (md:), serão 2 colunas (md:grid-cols-2)
      */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* --- COLUNA DA ESQUERDA --- */}
        <div className="flex flex-col items-center justify-center md:items-start">
          <span className="text-3xl font-semibold">
            {locationData ? locationData.display_name.split(",")[0] : "Paris"}
          </span>

          {/* Container para Ícone e Temperatura lado a lado */}
          <div className="my-4 flex items-center">
            {weatherCode !== undefined ? (
              <WeatherIcon
                weatherCode={weatherCode}
                size={100}
                color="#D1D5DB"
                isDay={isDay}
              />
            ) : (
              <div className="w-[100px] h-[100px] flex items-center justify-center text-gray-300">
                --
              </div>
            )}
            <span className="ml-4 text-8xl font-bold">
              {displayTemperature}
            </span>
            <span className="mt-3 text-4xl font-light">
              °{isCelsius ? "C" : "F"}
            </span>
          </div>

          <span className="text-2xl capitalize text-gray-300">
            {weatherCode !== undefined
              ? getWeatherDescription(weatherCode)
              : "--"}
          </span>
        </div>

        {/* --- COLUNA DA DIREITA --- */}
        <div className="flex flex-col justify-between space-y-3 md:pl-10">
          {/* Detalhe: Sensação Térmica */}
          <div className="flex items-center space-x-2">
            <FiThermometer size={20} className="text-gray-400" />
            <span>
              Feels like {temperature ? Math.round(temperature) : "--"}°
            </span>
          </div>

          {/* Detalhe: Máx e Mín */}
          <div className="flex items-center space-x-2">
            <FiArrowUp size={20} className="text-gray-400" />
            <span>--°</span>
            <FiArrowDown size={20} className="ml-4 text-gray-400" />
            <span>--°</span>
          </div>

          {/* Detalhe: Humidade (usamos ml-auto para jogar o valor para a direita) */}
          <div className="flex items-center space-x-2">
            <WiHumidity size={22} className="text-gray-400" />
            <span>Humidity</span>
            <span className="font-semibold ml-auto">
              {humidity ? `${humidity}%` : "--"}
            </span>
          </div>

          {/* Detalhe: Vento */}
          <div className="flex items-center space-x-2">
            <FiWind size={20} className="text-gray-400" />
            <span>Wind</span>
            <span className="font-semibold ml-auto">
              {windspeed ? `${Math.round(windspeed)}kph` : "--"}
            </span>
          </div>

          {/* Detalhe: Pressão */}
          <div className="flex items-center space-x-2">
            <WiBarometer size={22} className="text-gray-400" />
            <span>Pressure</span>
            <span className="font-semibold ml-auto">--hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimaAtual;
