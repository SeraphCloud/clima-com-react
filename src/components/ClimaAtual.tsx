// src/components/ClimaAtual.tsx
import { WiThunderstorm, WiHumidity, WiBarometer } from "react-icons/wi"; // Ícones de clima
import { FiThermometer, FiArrowUp, FiArrowDown, FiWind } from "react-icons/fi"; // Ícones de UI

const ClimaAtual = () => {
  return (
    // #1. O card principal (fundo cinza-700, bordas arredondadas)
    <div className="mt-6 rounded-lg bg-gray-700 p-4 text-white">
      {/* #2. O header do card (título e o seletor F/C) */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-300">Current Weather</h2>
        {/* Placeholder do seletor F/C */}
        <div className="rounded-full bg-gray-600 px-3 py-1 text-sm font-medium">
          F
        </div>
      </div>

      {/* #3. O conteúdo principal (grid de 2 colunas)
            - Em telas pequenas (mobile), será 1 coluna (grid-cols-1)
            - Em telas médias ou maiores (md:), serão 2 colunas (md:grid-cols-2)
      */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* --- COLUNA DA ESQUERDA --- */}
        <div className="flex flex-col items-center justify-center md:items-start">
          <span className="text-3xl font-semibold">Paris</span>

          {/* Container para Ícone e Temperatura lado a lado */}
          <div className="my-4 flex items-center">
            <WiThunderstorm size={100} className="text-gray-300" />
            <span className="ml-4 text-8xl font-bold">24</span>
            <span className="mt-3 text-4xl font-light">°</span>
          </div>

          <span className="text-2xl capitalize text-gray-300">
            Thunderstorm
          </span>
        </div>

        {/* --- COLUNA DA DIREITA --- */}
        <div className="flex flex-col justify-between space-y-3 md:pl-10">
          {/* Detalhe: Sensação Térmica */}
          <div className="flex items-center space-x-2">
            <FiThermometer size={20} className="text-gray-400" />
            <span>Feels like 24°</span>
          </div>

          {/* Detalhe: Máx e Mín */}
          <div className="flex items-center space-x-2">
            <FiArrowUp size={20} className="text-gray-400" />
            <span>26°</span>
            <FiArrowDown size={20} className="ml-4 text-gray-400" />
            <span>23°</span>
          </div>

          {/* Detalhe: Humidade (usamos ml-auto para jogar o valor para a direita) */}
          <div className="flex items-center space-x-2">
            <WiHumidity size={22} className="text-gray-400" />
            <span>Humidity</span>
            <span className="font-semibold ml-auto">73%</span>
          </div>

          {/* Detalhe: Vento */}
          <div className="flex items-center space-x-2">
            <FiWind size={20} className="text-gray-400" />
            <span>Wind</span>
            <span className="font-semibold ml-auto">18kph</span>
          </div>

          {/* Detalhe: Pressão */}
          <div className="flex items-center space-x-2">
            <WiBarometer size={22} className="text-gray-400" />
            <span>Pressure</span>
            <span className="font-semibold ml-auto">1014hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimaAtual;
