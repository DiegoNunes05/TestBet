// components/AuthDrawer.tsx
"use client";

import {Button} from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {useState} from "react";
import { UserAuthForm } from "./UseAuthForm";

export function AuthDrawer() {
  const [isRegister, setIsRegister] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="lg:hidden bg-transparent">Login</Button>
      </DrawerTrigger>
      <DrawerContent className="w-[95%] md:w-[70%] m-auto">
        <div className="p-4 pb-0">
          <DrawerHeader className="px-0">
            <DrawerTitle className="text-[var(--strong-green)]">
              {isRegister ? "Create an account" : "Login to TestBet"}
            </DrawerTitle>
            <DrawerDescription>
              {isRegister
                ? "Enter your information below to create an account"
                : "Enter your email below to login to your account"}
            </DrawerDescription>
          </DrawerHeader>
          <UserAuthForm className="py-4" isRegister={isRegister} />
          <div className="mt-2 text-center text-sm pb-4">
            {isRegister ? (
              <p>
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 text-primary underline"
                  onClick={() => setIsRegister(false)}
                >
                  Sign in
                </Button>
              </p>
            ) : (
              <p>
                {"Don't have an account?"}{" "}
                <Button
                  variant="link"
                  className="p-0 text-primary underline"
                  onClick={() => setIsRegister(true)}
                >
                  Register
                </Button>
              </p>
            )}
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
