import React from "react";
import Image from "next/image";
import LuaIcon from "../icon/lua.png";
import SolIcon from "../icon/sol.png";

interface SwitchProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({darkMode, setDarkMode}) => {
  return (
    <label className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="sr-only"
        />
        <div
          className={`block h-3 w-10 rounded-full ${
            darkMode ? "bg-gray-500" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`absolute -top-1.5 -left-1 h-6 w-6 rounded-full transition-transform ${
            darkMode ? "translate-x-6" : ""
          } flex items-center justify-center`}
        >
          {darkMode ? (
            <Image src={LuaIcon} alt="Lua" className="h-6 w-6" />
          ) : (
            <Image src={SolIcon} alt="Sol" className="h-6 w-6" />
          )}
        </div>
      </div>
    </label>
  );
};

export default Switch;
