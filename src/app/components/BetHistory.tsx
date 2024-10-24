import {useState} from "react";

interface Bet {
  event: string;
  amount: number;
  status: string;
}

const BetHistory = () => {
  const [bets, setBets] = useState<Bet[]>([
    {event: "Team A vs Team B", amount: 100, status: "Won"},
    {event: "Player X vs Player Y", amount: 50, status: "Lost"},
  ]);

  return (
    <div className="mt-4">
      <h2 className="text-xl">Bet History</h2>
      <ul>
        {bets.map((bet, index) => (
          <li key={index} className="p-2 border-b">
            {bet.event} - ${bet.amount} - {bet.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BetHistory;
