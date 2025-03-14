"use client";
import * as React from "react";
import {cn} from "@/lib/utils";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {auth} from "@/lib/firebaseConfig";
import {FirebaseError} from "firebase/app";
import {useRouter} from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "./Spinner";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isRegister?: boolean;
}

export function UserAuthForm({
  className,
  isRegister = false,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  // Campos adicionais para registro
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [gender, setGender] = React.useState("Sr.");
  const [birthDate, setBirthDate] = React.useState({
    day: "",
    month: "",
    year: "",
  });

  const router = useRouter();
  const dayRef = React.useRef<HTMLInputElement>(null);
  const monthRef = React.useRef<HTMLInputElement>(null);
  const yearRef = React.useRef<HTMLInputElement>(null);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      setTimeout(() => {
        router.push("/home");
      }, 100);
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        const errorMessage = isRegister
          ? getFirebaseRegistrationErrorMessage(err.code)
          : getFirebaseErrorMessage(err.code);
        setError(errorMessage);
      } else {
        setError(
          `An error occurred during ${
            isRegister ? "registration" : "login"
          }. Please try again.`
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Funções de tratamento de erro
  const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "Incorrect email or password. Please verify your information.";
      case "auth/invalid-email":
        return "Invalid email. Please check the format.";
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support.";
      case "auth/user-not-found":
        return "User not found. Check your email or create an account.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/too-many-requests":
        return "Too many login attempts. Please try again later.";
      case "auth/network-request-failed":
        return "Connection error. Check your internet and try again.";
      default:
        return `Login error: ${errorCode}`;
    }
  };

  const getFirebaseRegistrationErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered. Try logging in instead.";
      case "auth/invalid-email":
        return "Invalid email format. Please check and try again.";
      case "auth/weak-password":
        return "Password is too weak. Use at least 6 characters with letters and numbers.";
      case "auth/operation-not-allowed":
        return "Registration is currently disabled. Please try again later.";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";
      default:
        return `Registration error: ${errorCode}`;
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {isRegister && (
            <>
              <div className="flex w-full gap-2">
                <Button
                  type="button"
                  variant={gender === "Sr." ? "default" : "outline"}
                  onClick={() => setGender("Sr.")}
                  className="w-full"
                  disabled={isLoading}
                >
                  Sr.
                </Button>
                <Button
                  type="button"
                  variant={gender === "Sra." ? "default" : "outline"}
                  onClick={() => setGender("Sra.")}
                  className="w-full"
                  disabled={isLoading}
                >
                  Sra.
                </Button>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  type="text"
                  disabled={isLoading}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  type="text"
                  disabled={isLoading}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-1">
                <Label>Birth Date</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Day"
                    value={birthDate.day}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        setBirthDate({...birthDate, day: e.target.value});
                        if (e.target.value.length === 2)
                          monthRef.current?.focus();
                      }
                    }}
                    ref={dayRef}
                    className="w-full"
                    maxLength={2}
                    required
                    disabled={isLoading}
                  />
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Month"
                    value={birthDate.month}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        setBirthDate({...birthDate, month: e.target.value});
                        if (e.target.value.length === 2)
                          yearRef.current?.focus();
                      }
                    }}
                    ref={monthRef}
                    className="w-full"
                    maxLength={2}
                    required
                    disabled={isLoading}
                  />
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Year"
                    value={birthDate.year}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        setBirthDate({...birthDate, year: e.target.value});
                      }
                    }}
                    ref={yearRef}
                    className="w-full"
                    maxLength={4}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </>
          )}

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}

          <Button type="submit" disabled={isLoading} className="bg-[var(--third-green)] hover:bg-[var(--last-green)]">
            {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            {isRegister ? "Create Account" : "Sign In with Email"}
          </Button>
        </div>
      </form>

      {/* {!isRegister && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Github className="mr-2 h-4 w-4" />
            )}{" "}
            GitHub
          </Button>
        </>
      )} */}
    </div>
  );
}
