import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const OffersContext = createContext<OffersContextProps | undefined>(undefined);

export const useOffersContext = () => {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error("useOffersContext must be used within an OffersProvider");
  }
  return context;
};

export const OffersProvider = ({ children }: OfferProviderProps) => {
  const [registeredOffers, setRegisteredOffers] = useState<OfferData[]>([]);
  const [appliedOffers, setAppliedOffers] = useState<OfferData[]>([]);

  const fetchRegisteredOffers = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/candidates_offers/registered`, {
        withCredentials: true,
      })
      .then((response) => {
        setRegisteredOffers(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des offres enregistrées",
          error,
        );
      });
  }, []);

  const fetchAppliedOffers = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/candidates_offers`, {
        withCredentials: true,
      })
      .then((response) => {
        setAppliedOffers(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des candidatures", error);
      });
  }, []);

  const toggleBookmark = (offer: OfferData, isBookmarked: boolean) => {
    if (isBookmarked) {
      axios
        .delete(
          `${import.meta.env.VITE_API_URL}/api/candidates_offers/registered/${offer.id}`,
          { withCredentials: true },
        )
        .then(() => {
          setRegisteredOffers((prevOffers) =>
            prevOffers.filter((o) => o.id !== offer.id),
          );
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l'offre", error);
        });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/candidates_offers/registered`,
          { offer_id: offer.id },
          { withCredentials: true },
        )
        .then(() => {
          setRegisteredOffers((prevOffers) => [...prevOffers, offer]);
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de l'offre", error);
        });
    }
  };

  const toggleApplication = (offer: OfferData, isApplied: boolean) => {
    if (isApplied) {
      axios
        .delete(
          `${import.meta.env.VITE_API_URL}/api/candidates_offers/${offer.id}`,
          { withCredentials: true },
        )
        .then(() => {
          setAppliedOffers((prevOffers) =>
            prevOffers.filter((o) => o.id !== offer.id),
          );
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la suppression de la candidature",
            error,
          );
        });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/candidates_offers/applied`,
          { offer_id: offer.id },
          { withCredentials: true },
        )
        .then(() => {
          setAppliedOffers((prevOffers) => [...prevOffers, offer]);
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la candidature", error);
        });
    }
  };
  useEffect(() => {
    fetchRegisteredOffers();
    fetchAppliedOffers();
  }, [fetchRegisteredOffers, fetchAppliedOffers]);

  return (
    <OffersContext.Provider
      value={{
        registeredOffers,
        appliedOffers,
        toggleBookmark,
        toggleApplication,
        fetchRegisteredOffers,
        fetchAppliedOffers,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};
