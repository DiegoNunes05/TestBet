import Link from "next/link";
import Switch from "./Switch";
import { useAuth } from "@/lib/useAuth";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import router from "next/router";
import { useCallback } from "react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({darkMode, setDarkMode}) => {
  const {user} = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      // Redireciona para a página de login ou inicial após o logout
      router.push("/home"); // Use o Next.js useRouter para redirecionar
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  }, [router]);


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
          <h1 className="text-2xl font-semibold cursor-pointer">
            TestBet
          </h1>
        </Link>
        <div className="flex flex-row gap-4">
          <Switch darkMode={darkMode} setDarkMode={setDarkMode} />
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 focus:outline-none">
                  <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 mt-2 bg-white shadow-lg rounded-lg z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Minha Conta
                </Link>
                <Link
                  href="/messages"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Mensagens
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Configurações
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
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
