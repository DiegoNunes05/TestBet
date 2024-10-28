"use client";

import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../lib/firebaseConfig";
import {useRouter} from "next/navigation";
import Loader from "../components/Loader";
import {Label} from "../../components/ui/label";
import {Input} from "../../components/ui/input";
import {cn} from "@/lib/utils";
import {IconBrandGithub, IconBrandGoogle} from "@tabler/icons-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Ativa o loader
    try {
      // Logar o usuário
      await signInWithEmailAndPassword(auth, email, password);

      // Adiciona um delay de 2 segundos antes de redirecionar
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      setError("Failed to log in: " + err.message);
    } finally {
      setLoading(false); // Desativa o loader
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black ">
      {loading && <Loader />}
      <div className="max-w-md mx-auto p-8 bg-white dark:bg-black rounded-lg shadow-md w-[90%] md:w-full lg:w-full">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Bem-vindo à TestBet
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Insira suas credenciais para entrar.
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
            <Label htmlFor="password">Senha</Label>
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
            <span className="relative z-10 ">Entrar &rarr;</span>
            <BottomGradient />
          </button>

          <div className="flex justify-end mt-2">
            <button
              className="text-blue-800 underline"
              onClick={() => router.push("/register")}
              type="button"
            >
              Registre-se
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
