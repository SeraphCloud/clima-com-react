import { useState, useEffect } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { FiGithub } from "react-icons/fi";
import BarraDeBusca from "./components/BarraDeBusca";
import ClimaAtual from "./components/ClimaAtual";
import PrevisaoEstendida from "./components/PrevisaoEstendida";
import ResultadosBusca from "./components/ResultadosBusca";

// Interface para os dados de localização
interface LocalizacaoItem {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
  importance?: number;
  class?: string;
}

// Interface para os dados do clima
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

function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [locationData, setLocationData] = useState<LocalizacaoItem | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<LocalizacaoItem[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<LocalizacaoItem | null>(null);
  const [weatherData, setWeatherData] = useState<DadosClima | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [isCelsius] = useState(true);
  const LOCATIONIQ_API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

  // Carregar última localização do localStorage
  useEffect(() => {
    const lastLocation = getLastLocation();
    if (lastLocation) {
      setSelectedLocation(lastLocation);
      setLocationData(lastLocation);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Funções para persistência de dados
  const saveLastLocation = (location: LocalizacaoItem) => {
    localStorage.setItem("lastLocation", JSON.stringify(location));
  };

  const getLastLocation = (): LocalizacaoItem | null => {
    const saved = localStorage.getItem("lastLocation");
    return saved ? JSON.parse(saved) : null;
  };

  const handleSearchSubmit = async (cidade: string) => {
    if (!cidade) {
      setSearchResults([]);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${cidade}&format=json&limit=10`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar localização");
      }

      const data = await response.json();
      if (data && data.length > 0) {
        console.log("Dados da localização:", data);

        // Filtrar e classificar resultados para mostrar apenas os mais relevantes
        const filteredData = data
          .filter((result: LocalizacaoItem) => {
            // Prefere locais do tipo cidade, vila, município
            const relevantTypes = [
              "city",
              "town",
              "village",
              "municipality",
              "county",
            ];
            const type = result.type || "";
            return (
              relevantTypes.includes(type) ||
              result.class === "place" ||
              (result.importance && result.importance > 0.3)
            ); // Importância mínima
          })
          .sort((a: LocalizacaoItem, b: LocalizacaoItem) => {
            // Ordenar por importância (maior primeiro)
            const importanceA = a.importance || 0;
            const importanceB = b.importance || 0;
            return importanceB - importanceA;
          })
          .slice(0, 5); // Limitar a 5 resultados mais relevantes

        setSearchResults(filteredData as LocalizacaoItem[]); // Tipagem explícita
      } else {
        console.log("Nenhum resultado encontrado para:", cidade);
        setSearchResults([]);
      }
    } catch (_error) {
      console.error("Erro ao buscar localização:", _error);
      setSearchResults([]);
      setError(_error instanceof Error ? _error.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (location: LocalizacaoItem) => {
    setSelectedLocation(location);
    setLocationData(location);
    setSearchResults([]);
    saveLastLocation(location);
  };

  // Função para buscar dados do clima
  const fetchWeatherData = async (lat: number, lon: number) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar dados do clima");
      }

      const data = await response.json();
      console.log("Dados do clima:", data);
      setWeatherData(data);
    } catch (_error) {
      console.error("Erro ao buscar dados do clima:", _error);
      setWeatherData(null);
      setError(_error instanceof Error ? _error.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  // Efeito para buscar dados do clima quando um local é selecionado
  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData(
        parseFloat(selectedLocation.lat),
        parseFloat(selectedLocation.lon)
      );
    }
  }, [selectedLocation]);

  return (
    <div
      className={`flex min-h-screen flex-col items-center transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="w-full max-w-3xl p-4">
        {/* Header com ícones */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold text-blue-400">ReactWeather</div>
          <div className="flex gap-4 items-center">
            {/* Trocar tema */}
            <button
              onClick={toggleTheme}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <BsMoon className="w-6 h-6" />
              ) : (
                <BsSun className="w-6 h-6" />
              )}
            </button>
            {/* GitHub link */}
            <a
              href="https://github.com/seraphcloud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              aria-label="View on GitHub"
            >
              <FiGithub className="w-6 h-6" />
            </a>
          </div>
        </div>

        <BarraDeBusca onSubmit={handleSearchSubmit} />

        {/* Mostre os resultados da busca */}
        <ResultadosBusca
          results={searchResults}
          onSelectLocation={handleLocationSelect}
        />

        {/* Clima atual */}
        {isLoading ? (
          <div className="mt-6 rounded-lg bg-gray-700 p-4">
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-lg bg-gray-700 p-4">
            <ClimaAtual locationData={locationData} weatherData={weatherData} />
          </div>
        )}

        {/* Previsão estendida */}
        <div className="mt-6">
          <PrevisaoEstendida
            dailyData={weatherData?.daily}
            isCelsius={isCelsius}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
