"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../lib/firebaseConfig";
import Loader from "./components/Loader";

const AuthGuard = ({children}: {children: React.ReactNode}) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        router.push("/home");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!authenticated) {
    return null; // Retorna vazio até o redirecionamento ocorrer
  }

  return <>{children}</>;
};

export default AuthGuard;
