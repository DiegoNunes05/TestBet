export interface Team {
  id: number;
  name: string;
  league: string;
  country: string;
}

export interface Bet {
  id: number;
  homeTeam: string;
  awayTeam: string;
  league: string;
  odds: {
    homeWin: number;
    draw: number;
    awayWin: number;
  }
}

export const teams: Team[] = [
  // Premier League Teams
  { id: 1, name: "Manchester City", league: "Premier League", country: "England" },
  { id: 2, name: "Liverpool", league: "Premier League", country: "England" },
  { id: 3, name: "Arsenal", league: "Premier League", country: "England" },
  { id: 4, name: "Aston Villa", league: "Premier League", country: "England" },
  { id: 5, name: "Tottenham", league: "Premier League", country: "England" },
  { id: 6, name: "Manchester United", league: "Premier League", country: "England" },
  { id: 7, name: "Newcastle", league: "Premier League", country: "England" },
  { id: 8, name: "Chelsea", league: "Premier League", country: "England" },
  { id: 9, name: "Brighton", league: "Premier League", country: "England" },
  { id: 10, name: "West Ham", league: "Premier League", country: "England" },

  // Bundesliga Teams
  { id: 11, name: "Bayern Munich", league: "Bundesliga", country: "Germany" },
  { id: 12, name: "Borussia Dortmund", league: "Bundesliga", country: "Germany" },
  { id: 13, name: "RB Leipzig", league: "Bundesliga", country: "Germany" },
  { id: 14, name: "Leverkusen", league: "Bundesliga", country: "Germany" },
  { id: 15, name: "Frankfurt", league: "Bundesliga", country: "Germany" },

  // La Liga Teams
  { id: 16, name: "Real Madrid", league: "La Liga", country: "Spain" },
  { id: 17, name: "Barcelona", league: "La Liga", country: "Spain" },
  { id: 18, name: "Atletico Madrid", league: "La Liga", country: "Spain" },
  { id: 19, name: "Sevilla", league: "La Liga", country: "Spain" },
  { id: 20, name: "Real Sociedad", league: "La Liga", country: "Spain" }
];

export const bets: Bet[] = [
  // Premier League Sample Bets
  {
    id: 1,
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    league: "Premier League",
    odds: {
      homeWin: 2.10,
      draw: 3.50,
      awayWin: 3.20
    }
  },
  {
    id: 2,
    homeTeam: "Arsenal",
    awayTeam: "Tottenham",
    league: "Premier League",
    odds: {
      homeWin: 1.90,
      draw: 3.30,
      awayWin: 4.50
    }
  },

  // Bundesliga Sample Bets
  {
    id: 3,
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    league: "Bundesliga",
    odds: {
      homeWin: 1.80,
      draw: 3.60,
      awayWin: 4.10
    }
  },

  // La Liga Sample Bets
  {
    id: 4,
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    league: "La Liga",
    odds: {
      homeWin: 2.20,
      draw: 3.40,
      awayWin: 3.10
    }
  }
];

// Utility function to get teams by league
export const getTeamsByLeague = (leagueName: string): Team[] => {
  return teams.filter(team => team.league === leagueName);
};

// Utility function to get bets by league
export const getBetsByLeague = (leagueName: string): Bet[] => {
  return bets.filter(bet => bet.league === leagueName);
};