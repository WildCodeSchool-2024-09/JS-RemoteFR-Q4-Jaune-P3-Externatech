import { createContext, useContext, useState } from "react";

const RegisteredOffersContext = createContext<
  RegisteredOffersProps | undefined
>(undefined);

export function RegisteredOfferProvider({
  children,
}: RegisteredOffersProviderProps) {
  const [registeredOffers, setRegisteredOffers] = useState<OfferData[]>([]);

  const addRegisteredOffer = (offer: OfferData) => {
    setRegisteredOffers((prevOffers) => [...prevOffers, offer]);
  };

  return (
    <RegisteredOffersContext.Provider
      value={{ registeredOffers, addRegisteredOffer }}
    >
      {children}
    </RegisteredOffersContext.Provider>
  );
}

export const useRegisteredOffers = () => {
  const context = useContext(RegisteredOffersContext);
  if (context === undefined) {
    throw new Error(
      "useRegisteredOffers doit être utilisé dans un RegisteredOffersProvider",
    );
  }
  return context;
};
