import express from "express";
import form from "./middlewares/form";
import formOffer from "./middlewares/formOffer";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import authActions from "./middlewares/authActions";
router.post("/api/candidates/login", authActions.loginCandidate);

// Define company-related routes
import companyActions from "./modules/company/companyActions";

router.get("/api/companies", companyActions.browse);
router.get("/api/companies/:id", companyActions.read);
router.post(
  "/api/companies",
  form.validate,
  authActions.hashPassword,
  companyActions.add,
);
router.put("/api/companies/:id", form.validate, companyActions.edit);
router.delete("/api/companies/:id", companyActions.destroy);

/* ************************************************************************* */

import candidateAction from "./modules/candidate/candidateAction";

router.get("/api/candidates", candidateAction.browse);
router.get("/api/candidates/:id", candidateAction.read);
router.post(
  "/api/candidates",
  authActions.hashPassword,
  formCandidate.validate,
  candidateAction.add,
);
router.put("/api/candidates/:id", formCandidate.validate, candidateAction.edit);
router.delete("/api/candidates/:id", candidateAction.destroy);

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

/* ************************************************************************* */

import formCandidate from "./middlewares/formCandidate";

export default router;
