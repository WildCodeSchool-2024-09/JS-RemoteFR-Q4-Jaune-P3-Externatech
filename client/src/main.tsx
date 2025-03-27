// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";

// Import Context
import { AuthProvider } from "./services/AuthContext";

// Import pages
import CandidateDashboard from "./pages/candidateDashboard/CandidateDashboard";
import Companies from "./pages/companies/Companies";
import CompanyApplies from "./pages/companyApplies/CompanyApplies";
import CompanyDashboard from "./pages/companyDashboard/CompanyDashboard";
import CompanyInformation from "./pages/companyInformation/CompanyInformation";
import GeneralConditions from "./pages/generalConditions/GeneralConditions";
import HomePage from "./pages/homePage/HomePage";
import LegalInformations from "./pages/legalInformations/LegalInformations";
import OfferDetails from "./pages/offerDetails/OfferDetails";
import Offers from "./pages/offers/Offers";
import RegisteredOffers from "./pages/registeredOffers/RegisteredOffers";

//Import API requests
import {
  getAllCompanies,
  getAllOffers,
  getApplyByCandidate,
  getCandidatesByCompany,
  getCandidatesByOffer,
  getCities,
  getCompanyAuth,
  getContracts,
  getGeneralCompanyDetails,
  getOfferDetails,
  getOffersByCompany,
  getStacks,
  getWorkCondition,
} from "./services/requests";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: async () => ({
          companies: await getAllCompanies(),
          offers: await getAllOffers(),
        }),
      },

      {
        path: "/OfferDetails/:id",
        element: <OfferDetails />,
        loader: ({ params }) => getOfferDetails(params.id),
      },
      {
        path: "/offers",
        element: <Offers />,
        loader: async () => {
          const offers = await getAllOffers();
          const stacks = await getStacks();
          const cities = await getCities();
          const contracts = await getContracts();
          const work_conditionOptions = await getWorkCondition();
          return { offers, stacks, cities, contracts, work_conditionOptions };
        },
      },
      {
        path: "/companies",
        element: <Companies />,
        loader: getAllCompanies,
      },
      {
        path: "/companies/:id",
        element: <CompanyInformation />,
        loader: async ({ params }) => {
          const company = await getGeneralCompanyDetails(params.id);
          return company;
        },
      },
      {
        path: "/companies/dashboard",
        element: <CompanyDashboard />,
        loader: async () => {
          const company = await getCompanyAuth();
          const offers = await getOffersByCompany();
          const stacks = await getStacks();
          const candidatesByCompany = await getCandidatesByCompany();
          if (!company || !offers || !candidatesByCompany) {
            return null;
          }

          return {
            company,
            offers,
            stacks,
            candidatesByCompany,
          };
        },
      },
      {
        path: "/candidates/dashboard/",
        element: <CandidateDashboard />,
        loader: getApplyByCandidate,
      },
      {
        path: "/companies/dashboard/information",
        element: <CompanyInformation />,
        loader: async () => {
          const company = await getCompanyAuth();
          return company || null;
        },
      },
      {
        path: "/companies/dashboard/candidates-offers/:offerId",
        element: <CompanyApplies />,
        loader: async ({ params }) => {
          const applies = await getCandidatesByOffer(params.offerId);
          return applies || null;
        },
      },
      {
        path: "/candidates/registered-offers",
        element: <RegisteredOffers />,
      },

      {
        path: "/LegalInformations",
        element: <LegalInformations />,
      },
      {
        path: "/GeneralConditions",
        element: <GeneralConditions />,
      },
    ],
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    ,
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
