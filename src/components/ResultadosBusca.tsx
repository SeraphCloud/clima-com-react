import React from 'react';

// Interface para os dados de localização
interface LocalizacaoItem {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
  importance?: number;
}

interface ResultadosBuscaProps {
  results: LocalizacaoItem[];
  onSelectLocation: (location: LocalizacaoItem) => void;
}

const ResultadosBusca: React.FC<ResultadosBuscaProps> = ({ results, onSelectLocation }) => {
  if (results.length === 0) {
    return null;
  }

  // Função para simplificar o nome do local
  const simplificarNome = (nomeCompleto: string): string => {
    // Pega apenas a primeira parte do nome (geralmente a cidade) e o país
    const partes = nomeCompleto.split(',');
    if (partes.length <= 2) return nomeCompleto;
    
    const cidade = partes[0].trim();
    const pais = partes[partes.length - 1].trim();
    
    return `${cidade}, ${pais}`;
  };

  return (
    <div className="mt-4 rounded-lg bg-gray-700 p-4 text-white">
      <h3 className="text-lg font-semibold mb-2">Resultados da Busca:</h3>
      <ul>
        {results.map((result) => (
          <li
            key={result.place_id}
            className="cursor-pointer py-2 hover:bg-gray-600 rounded-md px-2"
            onClick={() => onSelectLocation(result)}
          >
            {simplificarNome(result.display_name)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultadosBusca;
