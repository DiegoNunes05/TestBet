"use client";

import {useState, useRef} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {auth} from "../../lib/firebaseConfig";
import {useRouter} from "next/navigation";
import Loader from "../components/Loader";
import {Label} from "../../components/ui/label";
import {Input} from "../../components/ui/input";
import {cn} from "@/lib/utils";
import { FirebaseError } from "firebase/app";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Sr.");
  const [birthDate, setBirthDate] = useState({day: "", month: "", year: ""});
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        const errorMessage = getFirebaseRegistrationErrorMessage(err.code);
        setError(errorMessage);
      } else {
        setError("An error occurred during registration. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to map Firebase registration error codes to friendly messages
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

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center justify-center min-h-screen shadow-lg bg-gray-100 dark:bg-black">
      {loading && <Loader />}
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Register with TestBet
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          PFill in the fields to create an account.
        </p>

        <form className="mt-5" onSubmit={handleRegister}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              placeholder="seu-email@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="custom-focus"
            />
          </LabelInputContainer>

          <div className="flex w-full gap-2 mb-4">
            <button
              type="button"
              onClick={() => setGender("Sr.")}
              className={cn(
                "p-2 border rounded w-full custom-focus",
                gender === "Sr." && "border-blue-500 text-blue-500"
              )}
            >
              Sr.
            </button>
            <button
              type="button"
              onClick={() => setGender("Sra.")}
              className={cn(
                "p-2 border rounded w-full custom-focus",
                gender === "Sra." && "border-blue-500 text-blue-500"
              )}
            >
              Sra.
            </button>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Primeiro Nome"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="custom-focus"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Sobrenome"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="custom-focus"
            />
          </LabelInputContainer>

          <div className="flex gap-2 w-full mb-4">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Day"
              value={birthDate.day}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  setBirthDate({...birthDate, day: e.target.value});
                  if (e.target.value.length === 2) monthRef.current?.focus();
                }
              }}
              ref={dayRef}
              className="w-full custom-focus"
              maxLength={2}
              required
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
                  if (e.target.value.length === 2) yearRef.current?.focus();
                }
              }}
              ref={monthRef}
              className="w-full custom-focus"
              maxLength={2}
              required
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
              className="w-full custom-focus"
              maxLength={4}
              required
            />
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="custom-focus"
            />
          </LabelInputContainer>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="bg-gradient-to-br from-green-500 to-neutral-600 hover:to-green-800 block w-full hover-button text-white rounded-md h-10 font-medium transition-all duration-300"
          >
            Register
          </button>

          <div className="flex justify-center mt-4">
            <p>
              Already have an account?{" "}
              <button
                className="text-blue-800 underline"
                onClick={() => router.push("/login")}
                type="button"
              >
                Log in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default RegisterPage;
