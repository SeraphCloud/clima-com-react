import { useState } from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { FiGithub } from 'react-icons/fi';
import BarraDeBusca from "./components/BarraDeBusca"; // 1. Importar
import ClimaAtual from "./components/ClimaAtual";
import PrevisaoEstendida from "./components/PrevisaoEstendida";

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Sample forecast data
  const sampleForecast = [
    { day: 'Sat', condition: 'Rain', highTemp: 24, lowTemp: 21 },
    { day: 'Sun', condition: 'Rain', highTemp: 29, lowTemp: 20 },
    { day: 'Mon', condition: 'Rain', highTemp: 30, lowTemp: 21 },
    { day: 'Tue', condition: 'Rain', highTemp: 26, lowTemp: 19 },
    { day: 'Wed', condition: 'Rain', highTemp: 26, lowTemp: 19 },
    { day: 'Thu', condition: 'Clouds', highTemp: 28, lowTemp: 19 },
    { day: 'Fri', condition: 'Rain', highTemp: 28, lowTemp: 20 },
  ];

  return (
    <div className={`flex min-h-screen flex-col items-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="w-full max-w-3xl p-4">
        {/* Header with icons */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold text-blue-400">ReactWeather</div>
          <div className="flex gap-4 items-center">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <BsMoon className="w-6 h-6" /> : <BsSun className="w-6 h-6" />}
            </button>
            {/* GitHub link */}
            <a
              href="https://github.com/yourusername/clima-com-react"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              aria-label="View on GitHub"
            >
              <FiGithub className="w-6 h-6" />
            </a>
          </div>
        </div>

        <BarraDeBusca />

        {/* Current Weather */}
        <div className="mt-6 rounded-lg bg-gray-700 p-4">
          <ClimaAtual />
        </div>

        {/* Extended Forecast */}
        <div className="mt-6">
          <PrevisaoEstendida forecastData={sampleForecast} />
        </div>
      </div>
    </div>
  );
}

export default App;
