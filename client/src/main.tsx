// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import Requests

// Import the main app component
import App from "./App";

// Import pages
import CompanyInformation from "./pages/CompanyInformartion/CompanyInformation";
import OfferDetails from "./pages/OfferDetails/OfferDetails";
import RegisteredOffers from "./pages/RegisteredOffers/RegisteredOffers";
import Companies from "./pages/companies/Companies";
import CompanyDasboard from "./pages/companyDashboard/CompanyDashboard";
import HomePage from "./pages/homepage/HomePage";
import Offers from "./pages/offers/Offers";

//Import API requests
import {
  getAllCompanies,
  getAllOffers,
  getCandidatesByCompany,
  getCities,
  getCompanyAuth,
  getContracts,
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
        path: "/companies/dashboard",
        element: <CompanyDasboard />,
        loader: async () => ({
          company: await getCompanyAuth(),
          offers: await getOffersByCompany(),
          candidatesByCompany: await getCandidatesByCompany(),
        }),
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
        path: "/RegisteredOffers",
        element: <RegisteredOffers />,
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
    <RouterProvider router={router} />
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
