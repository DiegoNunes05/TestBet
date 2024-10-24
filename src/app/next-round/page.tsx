"use client"

import {useEffect, useState} from "react";

export default function NextRounds() {
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    // Chamada para a API Route no backend
    fetch("/api/getNextRounds?leagueId=39")
      .then((res) => res.json())
      .then((data) => setRounds(data))
      .catch((err) => console.error("Erro ao buscar rodadas:", err));
  }, []);

  return (
    <div>
      <h1>Próximas Rodadas</h1>
      <ul>
        {rounds.map((round, index) => (
          <li key={index}>{JSON.stringify(round)}</li>
        ))}
      </ul>
    </div>
  );
}
