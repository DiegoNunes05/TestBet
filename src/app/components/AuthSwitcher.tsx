"use client";
import * as React from "react";
import { UserAuthForm } from "./UseAuthForm";
import { Button } from "@/components/ui/button";


export function AuthSwitcher() {
  const [isRegister, setIsRegister] = React.useState(false);

  return (
    <div className="mx-auto w-full max-w-sm border-[2px] border-[var(--third-green)] rounded-md py-6 px-4">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--strong-green)]">
          {isRegister ? "Create an account" : "Login to TestBet"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isRegister
            ? "Enter your information below to create an account"
            : "Enter your email below to login to your account"}
        </p>
      </div>

      <UserAuthForm className="mt-6" isRegister={isRegister} />

      <div className="mt-4 text-center text-sm">
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
            &ldquo;Don't have an account?&ldquo;{" "}
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
  );
}
