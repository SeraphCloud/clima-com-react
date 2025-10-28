import WeatherIcon from "./WeatherIcon";

interface PrevisaoEstendidaProps {
  dailyData?: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  isCelsius?: boolean;
}

const PrevisaoEstendida = ({
  dailyData,
  isCelsius = true,
}: PrevisaoEstendidaProps) => {
  // função para formatar a data
  const formatDay = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      weekday: "short",
    });
  };

  // Função para converter temperatura
  const convertTemp = (temp: number): number => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };

  // Se temos dados diários da API, use-os
  if (dailyData && dailyData.time.length > 0) {
    return (
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-300">
          Previsão para 7 dias
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-7">
          {dailyData.time.slice(0, 7).map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg bg-gray-700 p-3 text-center"
            >
              <div className="text-sm font-medium text-gray-300">
                {formatDay(day)}
              </div>
              <WeatherIcon
                weatherCode={dailyData.weathercode[index]}
                size={40}
                isDay={true}
              />
              <div className="mt-2 flex items-center justify-center gap-1">
                <span className="text-sm font-medium">
                  {Math.round(convertTemp(dailyData.temperature_2m_max[index]))}
                  °{isCelsius ? "C" : "F"}
                </span>
                <span className="text-xs text-gray-400">
                  {Math.round(convertTemp(dailyData.temperature_2m_min[index]))}
                  °
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback para quando não há dados
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-300">
        Previsão para 7 dias
      </h2>
      <div className="p-4 text-center text-gray-400">
        Dados de previsão não disponíveis
      </div>
    </div>
  );
};

export default PrevisaoEstendida;
