import { FiSearch } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";

const BarraDeBusca = () => {
  const [cidade, setCidade] = useState("");

  return (
    <div className="rounded-lg bg-gray-700 p-4 mt-2">
      <div className="relative flex w-full items-center">
        <FiSearch size={20} className="absolute left-3 text-gray-400" />
        <input
          onChange={(e) => setCidade(e.target.value)}
          type="text"
          placeholder="paris"
          className="w-full rounded-lg bg-gray-600 p-2.5 pl-10 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <CiLocationOn
          size={22}
          className="absolute right-3 cursor-pointer text-gray-400 transition-colors hover:text-white"
        />
      </div>
    </div>
  );
};

export default BarraDeBusca;
