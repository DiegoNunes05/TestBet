import Link from "next/link";
import Switch from "./Switch";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({darkMode, setDarkMode}) => {
  return (
    <header
      className={`p-4 relative ${
        darkMode
          ? "bg-gray-900 text-white border-gray-700 via-gray-700"
          : "bg-gray-100 text-black border-gray-200 via-gray-300"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold font-poppins cursor-pointer">
            TestBet
          </h1>
        </Link>
        <Switch darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <style jsx>{`
        header::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          min-width: 100%;
          transform: translateX(-50%);
          height: 1px;
          background: linear-gradient(to right, transparent, gray, transparent);
        }
      `}</style>
    </header>
  );
};

export default Header;
