import { FiSearch } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";

interface BarraDeBuscaProps {
  onSubmit: (cidade: string) => void;
}

const BarraDeBusca = ({ onSubmit }: BarraDeBuscaProps) => {
  const [cidade, setCidade] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(cidade);
  };

  return (
    <div className="rounded-lg bg-gray-700 p-4 mt-2">
      <form onSubmit={handleSubmit} className="relative flex w-full items-center">
        <FiSearch size={20} className="absolute left-3 text-gray-400" />
        <input
          onChange={(e) => setCidade(e.target.value)}
          type="text"
          placeholder="paris"
          value={cidade}
          className="w-full rounded-lg bg-gray-600 p-2.5 pl-10 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <CiLocationOn
          size={22}
          className="absolute right-3 cursor-pointer text-gray-400 transition-colors hover:text-white"
        />
      </form>
    </div>
  );
};

export default BarraDeBusca;
