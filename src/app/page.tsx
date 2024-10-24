"use client";

import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import Sidebar from "./components/sidebar";
import BetCard from "./components/BetCard";
import MobileMenu from "./components/MobileMenu";
import { Fixture } from "../../types";
import {format} from "date-fns";

interface Event {
  id: number;
  event: string;
  odds: {[key: string]: number};
}

interface League {
  countryCode: string;
  events: Event[];
}

type SidebarProps = {
  setActiveLeague: (name: string, id: number) => void;
};

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLeague, setActiveLeague] = useState<string>("Bundesliga");
  const [upcomingMatches, setUpcomingMatches] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(false);
  const [odds, setOdds] = useState<any[]>([]);

  const fetchOddsByFixtureId = async (fixtureId: number) => {
    const apiKey = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;
    try {
      const response = await fetch(
        `https://api-football-v1.p.rapidapi.com/v3/odds?fixture=${fixtureId}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": apiKey ?? "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();
      console.log("Odds by fixture id:", data);
      return data.response;
    } catch (error) {
      console.error("Erro ao buscar odds por fixture id:", error);
    }
  };


  const fetchUpcomingMatches = async (leagueId: number) => {
    const apiKey = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY; // Certifique-se de definir sua chave de API no .env
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&next=5`,
      {
        headers: {
          "x-rapidapi-key": apiKey ?? "", // Garante que a chave não seja undefined
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        } as HeadersInit, // Adicione o 'as HeadersInit' para garantir a compatibilidade de tipos
      }
    );
    const data = await response.json();
    return data.response;
  };

  const handleLeagueChange = async (leagueName: string, leagueId: number) => {
    setActiveLeague(leagueName);
    setLoading(true);
    try {
      // Buscar as partidas para a liga selecionada
      const matches = await fetchUpcomingMatches(leagueId);
      console.log("Matches:", matches);

      // Para cada partida, buscar odds por fixture
      const oddsPromises = matches.map((match: Fixture) =>
        fetchOddsByFixtureId(match.fixture.id)
      );

      // Esperar todas as promessas de odds serem resolvidas
      const oddsResults = await Promise.all(oddsPromises);
      console.log("Odds Results:", oddsResults);

      // Associa as odds às partidas correspondentes
      const matchesWithOdds = matches.map((match: Fixture, index: number) => ({
        ...match,
        odds: oddsResults[index]?.[0]?.bookmakers[0]?.bets[0]?.values || [],
      }));

      console.log("Matches with Odds:", matchesWithOdds);
      setUpcomingMatches(matchesWithOdds);
    } catch (error) {
      console.error("Erro ao buscar partidas e odds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Você pode definir um ID inicial de liga aqui para buscar as partidas da liga padrão
    handleLeagueChange("Bundesliga", 78); // Exemplo com o ID da Bundesliga
  }, []);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex justify-center">
        <div className="flex w-full max-w-7xl">
          <Sidebar
            setActiveLeague={(name: string, id: number) =>
              handleLeagueChange(name, id)
            }
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            darkMode={darkMode}
            className=""
          />
          <main className="flex-1 p-4 md:ml-56 overflow-y-auto h-[calc(100vh-80px)] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
            <h1 className="text-3xl font-bold mb-5 font-bebas">
              {activeLeague ? `${activeLeague} Matches` : "Select a League"}
            </h1>
            {loading ? (
              <p>Loading matches...</p>
            ) : (
              <div className="flex flex-col gap-6 w-full md:w-[90%] lg:w-[90%]">
                {upcomingMatches.length > 0 ? (
                  upcomingMatches.map((match) => {
                    // Aqui você formata as odds antes de passar para o BetCard
                    const formattedOdds = Array.isArray(match.odds)
                      ? match.odds.map((odd) => ({
                          value: odd.value || "N/A",
                          odd: odd.odd ? odd.odd.toString() : "N/A",
                        }))
                      : [];

                    return (
                      <BetCard
                        odds={formattedOdds}
                        darkMode={darkMode}
                        event={`${match.teams.home.name} vs ${match.teams.away.name}`}
                        homeTeam={match.teams.home.name}
                        awayTeam={match.teams.away.name}
                        matchTime={format(
                          new Date(match.fixture.date),
                          "HH:mm"
                        )}
                      />
                    );
                  })
                ) : (
                  <p>No matches available for this league.</p>
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
  );
}
