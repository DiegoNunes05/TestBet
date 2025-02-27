import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFutbol} from "@fortawesome/free-solid-svg-icons";
import Flag from "react-world-flags";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {teams} from "../../lib/Database"; // Importação do banco de dados local

interface SidebarProps {
  setActiveLeague: (name: string) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  darkMode: boolean;
  className: string;
}

const countries = {
  Germany: {name: "Alemanha", code: "DE", flagCode: "DE"},
  England: {name: "Inglaterra", code: "GB-ENG", flagCode: "GB"},
  Spain: {name: "Espanha", code: "ES", flagCode: "ES"},
  Italy: {name: "Itália", code: "IT", flagCode: "IT"},
  France: {name: "França", code: "FR", flagCode: "FR"},
  Portugal: {name: "Portugal", code: "PT", flagCode: "PT"},
  Brazil: {name: "Brasil", code: "BR", flagCode: "BR"},
};

const Sidebar: React.FC<SidebarProps> = ({
  setActiveLeague,
  menuOpen,
  setMenuOpen,
  darkMode,
  className,
}) => {
  return (
    <aside
      className={`
        transform transition-transform duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:block w-56
        ${
          darkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-gray-100 border-gray-200"
        }
        p-4 xl:px-0 fixed h-full border-r-[1px] ${className}
      `}
    >
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-medium font-bebas">Leagues</h2>
        <FontAwesomeIcon icon={faFutbol} className="w-4 h-4 mb-[3px]" />
      </div>

      <Accordion type="single" collapsible className="w-full pr-3">
        {Object.keys(countries).map((countryKey) => {
          const {flagCode, name, code} =
            countries[countryKey as keyof typeof countries];
          const countryLeagues = Array.from(
            new Set(
              teams
                .filter((team) => team.country === countryKey)
                .map((team) => team.league)
            )
          );

          return (
            <AccordionItem key={code} value={code}>
              <AccordionTrigger className="py-1 hover:no-underline hover:text-blue-800">
                <div className="flex items-center gap-2">
                  <Flag code={flagCode} className="w-4 h-4 mb-1" />
                  <span className="font-bebas text-base">{name}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <ul className="ml-6 pl-3">
                  {countryLeagues.map((league) => (
                    <li key={league}>
                      <button
                        onClick={() => {
                          setActiveLeague(league);
                          setMenuOpen(false);
                        }}
                        className="w-full text-left font-bebas hover:text-blue-500"
                      >
                        {league}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </aside>
  );
};

export default Sidebar;

// useEffect(() => {
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "ccd8599873mshc983f01870ef204p1bfe46jsn3e9195f3ecc6",
//       "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
//     },
//   };

//   fetch("https://api-football-v1.p.rapidapi.com/v3/leagues", options)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((response) => {
//       const leaguesData: League[] = response.response;

//       const nationalLeaguesByCountry: Record<string, string[]> = {
//         Germany: ["Bundesliga", "2. Bundesliga"],
//         England: ["Premier League", "Championship"],
//         Spain: ["La Liga", "Segunda División"],
//         Italy: ["Serie A", "Serie B"],
//         France: ["Ligue 1", "Ligue 2"],
//         Portugal: ["Primeira Liga", "Segunda Liga"],
//         Brazil: ["Serie A", "Serie B"],
//       };

//       const filteredLeagues = leaguesData.filter((league) => {
//         const country = league.country.name;
//         const leagueName = league.league.name;

//         return (
//           nationalLeaguesByCountry[country] &&
//           nationalLeaguesByCountry[country].includes(leagueName)
//         );
//       });

//       console.log("Ligas filtradas:", filteredLeagues);

//       setLeagues(filteredLeagues);
//     })
//     .catch((err) => {
//       console.error("Erro ao buscar as ligas: ", err);
//       setError(true);
//     });
// }, []);
