import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext<AuthProps | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [role, setRole] = useState("anonymous");

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include", // Envoie les cookies
        });

        if (response.ok) {
          const data = await response.json();
          setRole(data.role);
        } else {
          setRole("anonymous");
        }
      } catch (error) {
        console.error("Erreur d'authentification", error);
        setRole("anonymous");
      }
    }

    checkAuth();
  }, []);

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setRole("anonymous");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  }

  return (
    <authContext.Provider value={{ role, setRole, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("Le auth context doit exister");
  }

  return context;
}
