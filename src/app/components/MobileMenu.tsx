import React from "react";
import {Menu, X} from "lucide-react";

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  darkMode: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  menuOpen,
  setMenuOpen,
  darkMode,
}) => {
  return (
    <div className="md:hidden fixed bottom-4 right-4">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`p-2 rounded-full transition-all duration-800 ease-in-out ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}
      >
        {menuOpen ? (
          <X
            size={24}
            className="transition-transform duration-800 ease-in-out transform rotate-90"
          />
        ) : (
          <Menu
            size={24}
            className="transition-transform duration-3800 ease-in-out transform rotate-0"
          />
        )}
      </button>
    </div>
  );
};

export default MobileMenu;
