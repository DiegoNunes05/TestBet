"use client";

import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import Sidebar from "./components/sidebar";
import BetCard from "./components/BetCard";
import MobileMenu from "./components/MobileMenu";
import { Fixture } from "../../types";
import {format, Match} from "date-fns";
import {ptBR} from "date-fns/locale";
import AuthGuard from "./AuthGuard";
import Loader from "./components/Loader";
import {getBetsByLeague} from "./Database";

interface Event {
  id: number;
  event: string;
  odds: {[key: string]: number};
}

// interface League {
//   countryCode: string;
//   events: Event[];
// }

// type SidebarProps = {
//   setActiveLeague: (name: string, id: number) => void;
// };

interface MatchFixture {
  teams: {
    home: {name: string};
    away: {name: string};
  };
  fixture: {
    id: number | string;
    date: string;
  };
  odds: Array<{
    value: string;
    odd: string;
  }>;
}


export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLeague, setActiveLeague] = useState<string>("Bundesliga");
  const [upcomingMatches, setUpcomingMatches] = useState<{
    [date: string]: MatchFixture[];
  }>({});
  const [loading, setLoading] = useState(false);
  // const [odds, setOdds] = useState<any[]>([]);

  // const fetchOddsByFixtureId = async (fixtureId: number) => {
  //   const apiKey = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;
  //   try {
  //     const response = await fetch(
  //       `https://api-football-v1.p.rapidapi.com/v3/odds?fixture=${fixtureId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
  //           "x-rapidapi-key": apiKey ?? "",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Erro: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Odds by fixture id:", data);
  //     return data.response;
  //   } catch (error) {
  //     console.error("Erro ao buscar odds por fixture id:", error);
  //   }
  // };

  // const fetchUpcomingMatches = async (leagueId: number) => {
  //   const apiKey = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY; // Certifique-se de definir sua chave de API no .env
  //   const response = await fetch(
  //     `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&next=5`,
  //     {
  //       headers: {
  //         "x-rapidapi-key": apiKey ?? "", // Garante que a chave não seja undefined
  //         "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
  //       } as HeadersInit, // Adicione o 'as HeadersInit' para garantir a compatibilidade de tipos
  //     }
  //   );
  //   const data = await response.json();
  //   return data.response;
  // };

  // const capitalizeFirstLetter = (str: string) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };

  // const groupMatchesByDate = (matches: Fixture[]) => {
  //   return matches.reduce((acc: {[date: string]: Fixture[]}, match) => {
  //     let matchDate = format(new Date(match.fixture.date), "ccc, dd MMM", {
  //       locale: ptBR,
  //     }).toLowerCase();

  //     matchDate = capitalizeFirstLetter(matchDate);

  //     if (!acc[matchDate]) {
  //       acc[matchDate] = [];
  //     }
  //     acc[matchDate].push(match);
  //     return acc;
  //   }, {});
  // };

  // const handleLeagueChange = async (leagueName: string, leagueId: number) => {
  //   setActiveLeague(leagueName);
  //   setLoading(true);
  //   try {
  //     // Buscar as partidas para a liga selecionada
  //     const matches = await fetchUpcomingMatches(leagueId);

  //     // Para cada partida, buscar odds por fixture
  //     const oddsPromises = matches.map((match: Fixture) =>
  //       fetchOddsByFixtureId(match.fixture.id)
  //     );

  //     // Esperar todas as promessas de odds serem resolvidas
  //     const oddsResults = await Promise.all(oddsPromises);

  //     // Associa as odds às partidas correspondentes
  //     const matchesWithOdds = matches.map((match: Fixture, index: number) => ({
  //       ...match,
  //       odds: oddsResults[index]?.[0]?.bookmakers[0]?.bets[0]?.values || [],
  //     }));

  //     // Agrupar partidas por data
  //     const groupedMatches = groupMatchesByDate(matchesWithOdds);
  //     setUpcomingMatches(groupedMatches);
  //   } catch (error) {
  //     console.error("Erro ao buscar partidas e odds:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const generateMockDate = (league: string) => {
    const baseDate = new Date();
    const leagueDates: {[key: string]: number} = {
      Bundesliga: 1,
      "Premier League": 2,
      "La Liga": 3,
    };

    baseDate.setDate(baseDate.getDate() + (leagueDates[league] || 0));
    return baseDate;
  };

  const handleLeagueChange = (leagueName: string) => {
    setActiveLeague(leagueName);
    setLoading(true);

    try {
      // Buscar apostas pela liga
      const leagueBets = getBetsByLeague(leagueName);
      const groupedMatches = leagueBets.reduce(
        (acc: {[date: string]: MatchFixture[]}, bet) => {
          let matchDate = format(generateMockDate(leagueName), "ccc, dd MMM", {
            locale: ptBR,
          }).toLowerCase();

          matchDate = capitalizeFirstLetter(matchDate);

          if (!acc[matchDate]) {
            acc[matchDate] = [];
          }

          acc[matchDate].push({
            teams: {
              home: {name: bet.homeTeam},
              away: {name: bet.awayTeam},
            },
            fixture: {
              id: bet.id,
              date: generateMockDate(leagueName).toISOString(),
            },
            odds: [
              {
                value: "1",
                odd: bet.odds.homeWin.toString(),
              },
              {
                value: "X",
                odd: bet.odds.draw.toString(),
              },
              {
                value: "2",
                odd: bet.odds.awayWin.toString(),
              },
            ],
          });

          return acc;
        },
        {}
      );

      setUpcomingMatches(groupedMatches);
    } catch (error) {
      console.error("Erro ao buscar partidas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLeagueChange("Bundesliga");
  }, []);

  return (
    <AuthGuard>
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="flex justify-center">
          <div className="flex w-full max-w-7xl">
            <Sidebar
              setActiveLeague={(name: string) => handleLeagueChange(name)}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              darkMode={darkMode}
              className=""
            />
            <main className="flex-1 p-4 md:ml-56 overflow-y-auto h-[calc(100vh-80px)] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
              <h1 className="text-3xl font-medium mb-5 font-bebas">
                {activeLeague ? `${activeLeague} Matches` : "Select a League"}
              </h1>
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <div className="flex flex-col gap-6 w-full md:w-[90%] lg:w-[90%]">
                  {Object.keys(upcomingMatches).length > 0 ? (
                    Object.entries(upcomingMatches).map(([date, matches]) => (
                      <div key={date}>
                        <h2
                          className={`text-md border-black border-x-[1px] border-t-[1px] flex justify-center ${
                            darkMode
                              ? "bg-slate-500 border-white"
                              : "bg-slate-200"
                          }`}
                        >
                          {date}
                        </h2>
                        <div className="flex flex-col gap-4">
                          {matches.map((match, index) => {
                            const formattedOdds = Array.isArray(match.odds)
                              ? match.odds.map((odd) => ({
                                  value: odd.value || "N/A",
                                  odd: odd.odd ? odd.odd.toString() : "N/A",
                                }))
                              : [];

                            const isFirstCard = index === 0;

                            return (
                              <BetCard
                                key={match.fixture.id}
                                odds={formattedOdds}
                                darkMode={darkMode}
                                event={`${match.teams.home.name} vs ${match.teams.away.name}`}
                                homeTeam={match.teams.home.name}
                                awayTeam={match.teams.away.name}
                                matchTime={format(
                                  new Date(match.fixture.date),
                                  "HH:mm"
                                )}
                                isFirstCard={isFirstCard}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="font-semibold font-poppins">
                      No matches available for this league.
                    </p>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>

        <MobileMenu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          darkMode={darkMode}
        />
      </div>
    </AuthGuard>
  );
}
