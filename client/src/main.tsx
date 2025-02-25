// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import Requests

// Import the main app component
import App from "./App";
import { companyLoader } from "./pages/CompanyInformartion/CompanyInformation";
import CompanyInformation from "./pages/CompanyInformartion/CompanyInformation";
import OfferDetails from "./pages/OfferDetails/OfferDetails";

// Import pages

import CompanyDasboard from "./pages/companyDashboard/CompanyDashboard";
import HomePage from "./pages/homepage/HomePage";

//Import API requests
import { getCompany, getOfferDetails } from "./services/requests";

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
      },

      {
        path: "/OfferDetails/:id",
        element: <OfferDetails />,
        loader: ({ params }) => getOfferDetails(params.id),
      },

      {
        path: "/companies/dashboard/:id",
        element: <CompanyDasboard />,
        loader: async ({ params }) => {
          const company = await getCompany(String(params.id));
          return company || null;
        },
      },
      {
        path: "/companies/information/:companyId",
        element: <CompanyInformation />,
        loader: companyLoader,
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
