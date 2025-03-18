import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext<AuthProps | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [role, setRole] = useState(localStorage.getItem("role") || "anonymous");
  const [id, setId] = useState(Number(localStorage.getItem("id")) || -1);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    }
  }, [role]);

  useEffect(() => {
    if (id) {
      localStorage.setItem("id", id.toString());
    }
  }, [id]);

  return (
    <authContext.Provider value={{ role, setRole, id, setId }}>
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
