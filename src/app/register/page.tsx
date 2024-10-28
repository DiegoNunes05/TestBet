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

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
      // Criar a conta do usuário
      await createUserWithEmailAndPassword(auth, email, password);

      // Logar o usuário automaticamente após o registro
      await signInWithEmailAndPassword(auth, email, password);

      // Redirecionar para a página inicial ou página protegida
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      setError("Failed to register: " + err.message);
    } finally {
      setLoading(false); // Desativa o loader
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
          Registre-se na TestBet
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Preencha os campos abaixo para criar uma conta.
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
            <Label htmlFor="firstName">Primeiro Nome</Label>
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
            <Label htmlFor="lastName">Sobrenome</Label>
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
              placeholder="Dia"
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
              placeholder="Mês"
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
              placeholder="Ano"
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
            <Label htmlFor="password">Senha</Label>
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
            Registrar
          </button>

          <div className="flex justify-center mt-4">
            <p>
              Já possui uma conta?{" "}
              <button
                className="text-blue-800 underline"
                onClick={() => router.push("/login")}
                type="button"
              >
                Fazer login
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
