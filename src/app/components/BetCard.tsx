import React, {useEffect, useState} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BetCardProps {
  odds: {value: string; odd: string}[];
  darkMode: boolean;
  maxLength?: number;
  event: string;
  homeTeam: string;
  awayTeam: string;
  matchTime: string;
  isFirstCard?: boolean;
}

const BetCard: React.FC<BetCardProps> = ({
  odds,
  darkMode,
  event,
  maxLength = 10,
  homeTeam,
  awayTeam,
  matchTime,
  isFirstCard = false,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedOdd, setSelectedOdd] = useState<string | undefined>(undefined);
  const [betAmount, setBetAmount] = useState<number | string>("");
  const entries = Object.entries(odds);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const truncateText = (text: string, limit: number) =>
    text.length > limit ? text.slice(0, limit) + "..." : text;

  const handleOpenDialog = (index: number, odd: string | undefined) => {
    const team = getOddLabel(index); 
    setSelectedTeam(team);
    setSelectedOdd(odd);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTeam(null);
    setSelectedOdd(undefined);
  };

  const handleBetSubmit = () => {
    console.log(`Aposta feita em: ${selectedTeam}, Valor: ${betAmount}`);
    handleCloseDialog();
  };

  const getOddLabel = (index: number) => {
    if (index === 0) return homeTeam;
    if (index === 1) return "Empate";
    if (index === 2) return awayTeam;
    return "";
  };

  return (
    <div
      className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-md pt-2 ${
        isFirstCard ? "rounded-b-lg" : ""
      } ${isFirstCard ? "" : "rounded-lg"}`}
    >
      <div className="px-3 mb-3 flex justify-between items-center">
        <button className="mb-3 text-lg font-poppins">{event}</button>
        <span className="text-sm font-light">{matchTime}</span>
      </div>
      <h2 className="text-base font-medium px-3 font-bebas">Resultado Final</h2>

      {odds.length > 0 ? (
        isMobile ? (
          <div className="flex m-auto w-full border-t-[1px]">
            {odds.map((odd, index) => (
              <button
                key={index}
                className={`flex-1 text-center py-2 transition-colors ${
                  darkMode
                    ? "bg-transparent text-white hover:text-black hover:bg-blue-300"
                    : "bg-transparent text-black hover:bg-blue-300"
                } ${
                  index === 0
                    ? "rounded-bl-lg"
                    : index === odds.length - 1
                    ? "rounded-br-lg"
                    : ""
                }`}
                disabled={!odd.odd}
                onClick={() => handleOpenDialog(index, odd.odd)}
              >
                <span className="block">
                  {truncateText(getOddLabel(index), maxLength)}
                </span>
                <span className="block">{odd.odd || "N/A"}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex m-auto w-full border-t-[1px]">
            {odds.map((odd, index) => (
              <button
                key={index}
                className={`flex-1 text-start px-3 py-2 transition-colors ${
                  darkMode
                    ? "bg-transparent text-white hover:text-black hover:bg-blue-300"
                    : "bg-transparent text-black hover:bg-blue-300"
                } ${
                  index === 0
                    ? "rounded-bl-lg"
                    : index === odds.length - 1
                    ? "rounded-br-lg"
                    : ""
                }`}
                disabled={odd === undefined}
                onClick={() => handleOpenDialog(index, odd.odd)}
              >
                <span>
                  {getOddLabel(index)} {odd.odd || "N/A"}
                </span>
              </button>
            ))}
          </div>
        )
      ) : (
        <p>No odds available</p>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          position="bottom"
          className={`w-[95%] md:w-[30%] lg:w-[30%] max-w-[500px] m-auto rounded-t-lg p-0 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <DialogHeader className="items-start">
            <DialogTitle className="pt-4 ml-4 font-poppins">
              {selectedTeam ? selectedTeam : "Place a Bet"}
            </DialogTitle>
            <DialogDescription className="ml-4 font-bebas">
              Resultado Final para {selectedTeam}.
            </DialogDescription>
          </DialogHeader>
          <div className="px-4">
            <div className="flex flex-row justify-between">
              <label className="block text-sm font-medium">
                Valor da Aposta
              </label>
              <h2 className="font-poppins">{selectedOdd ?? "N/A"}</h2>
            </div>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
              placeholder="Insira o valor"
            />
          </div>
          <DialogFooter className="flex flex-row !w-full !justify-center border-t-[1px]">
            <button
              className="w-full py-2 hover:bg-green-400"
              onClick={handleBetSubmit}
            >
              Confirmar Aposta
            </button>
            <DialogClose asChild>
              <button
                className="w-full py-2 hover:bg-red-400 !mr-0 !ml-0"
                onClick={handleCloseDialog}
              >
                Cancelar
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BetCard;
