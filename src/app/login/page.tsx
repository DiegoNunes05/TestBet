"use client";

import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../lib/firebaseConfig";
import {useRouter} from "next/navigation";
import Loader from "../components/Loader";
import {Label} from "../../components/ui/label";
import {Input} from "../../components/ui/input";
import {cn} from "@/lib/utils";
import {FirebaseError} from "firebase/app";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await signInWithEmailAndPassword(auth, email, password);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        const errorMessage = getFirebaseErrorMessage(err.code);
        setError(errorMessage);
      } else {
        setError("An error occurred during login. Please try again.");
      }
    } finally {
      setLoading(false); // Deactivate loader
    }
  };

  // Function to map error codes to friendly messages
  const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black ">
      {loading && <Loader />}
      <div className="max-w-md mx-auto p-8 bg-white dark:bg-black rounded-lg shadow-md w-[90%] md:w-full lg:w-full">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to TestBet
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Enter your credentials to log in.
        </p>

        <form className="mt-5" onSubmit={handleLogin}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="your-email@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded w-full custom-focus focus:outline-none focus:border-cyan-500"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded w-full custom-focus focus:outline-none focus:border-indigo-500"
              required
            />
          </LabelInputContainer>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="bg-gradient-to-br from-green-500 to-neutral-600 hover:to-green-800 block hover-button w-full text-white rounded-md h-10 font-medium transition-all duration-300"
          >
            <span className="relative z-10 ">Login &rarr;</span>
            <BottomGradient />
          </button>

          <div className="flex justify-end mt-2">
            <button
              className="text-blue-800 underline"
              onClick={() => router.push("/register")}
              type="button"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente de gradiente para o botão e input
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover:opacity-100 block transition-opacity duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover:opacity-100 blur-sm block transition-opacity duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
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

export default LoginPage;
