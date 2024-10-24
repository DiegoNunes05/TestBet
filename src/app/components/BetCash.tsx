"use client";

import React, {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; // Seu componente de Dialog importado

export default function TestDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpen = () => {
    console.log("Abrindo o dialog");
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    console.log("Fechando o dialog");
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={() => setIsDialogOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Dialog
      </button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="fixed inset-0 z-[1200] w-full max-w-lg bg-white p-6">
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
          <p>This is a simple dialog for testing.</p>
          <DialogFooter>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
