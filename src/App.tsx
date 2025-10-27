import BarraDeBusca from "./components/BarraDeBusca"; // 1. Importar
import ClimaAtual from "./components/ClimaAtual";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-800 text-white">
      <div className="w-full max-w-3xl p-4">
        <div className="text-center text-3xl font-bold">React Weather</div>

        <BarraDeBusca />

        {/* Placeholders restantes */}
        <div className="mt-6 rounded-lg bg-gray-700 p-4">
          <ClimaAtual />
        </div>
        <div className="mt-6 rounded-lg bg-gray-700 p-4">
          <p>Aqui ficará a Previsão Estendida...</p>
        </div>
      </div>
    </div>
  );
}

export default App;
