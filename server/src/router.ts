import express from "express";
import formCompany from "./middlewares/formCompany";
import formOffer from "./middlewares/formOffer";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import authActions from "./middlewares/authActions";
router.post("/api/companies/login", authActions.login);

// Define company-related routes
import companyActions from "./modules/company/companyActions";
//formCompany.validate à remettre sur post et put une fois le front prêt
router.get("/api/companies", companyActions.browse);
router.get("/api/companies/:id", companyActions.read);
router.post("/api/companies", companyActions.add);
router.put("/api/companies/:id", companyActions.edit);
router.delete("/api/companies/:id", companyActions.destroy);

/* ************************************************************************* */

import offerActions from "./modules/offer/offerActions";

router.get("/api/offers", offerActions.browse);
router.get("/api/offers/companies/:id", offerActions.browseByCompany);
router.get("/api/offers/:id", offerActions.read);
router.post("/api/offers", formOffer.validate, offerActions.add);
router.put("/api/offers/:id", offerActions.edit);
router.delete("/api/offers/:id", offerActions.destroy);

/* ************************************************************************* */

// Define language-related routes
import languageAction from "./modules/language/languageAction";

router.get("/api/languages", languageAction.browse);

/* ************************************************************************* */

import contractActions from "./modules/contract/contractActions";

router.get("/api/contracts", contractActions.browse);

export default router;
