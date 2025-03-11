import express from "express";

const router = express.Router();

//Define your imports here
/* ************************************************************************* */

import authActions from "./middlewares/authActions";
import formCompany from "./middlewares/formCompany";
import formOffer from "./middlewares/formOffer";
import candidateActions from "./modules/candidate/candidateActions";
import companyActions from "./modules/company/companyActions";
import contractActions from "./modules/contract/contractActions";
import offerActions from "./modules/offer/offerActions";

import workConditionActions from "./modules/work_condition/workConditionActions";

/* ************************************************************************* */

import formCandidate from "./middlewares/formCandidate";

/* ************************************************************************* */
// Define Your API Routes Here

router.post("/api/login", authActions.login);

/* ************************************************************************* */

router.get("/api/companies", companyActions.browse);
router.get("/api/companies/:id", companyActions.read);
router.post(
  "/api/companies",
  formCompany.validate,
  authActions.hashPassword,
  companyActions.add,
);
router.put("/api/companies/:id", formCompany.validate, companyActions.edit);
router.delete("/api/companies/:id", companyActions.destroy);

/* ************************************************************************* */

router.get("/api/candidates", candidateActions.browse);
router.get("/api/candidates/:id", candidateActions.read);
router.post(
  "/api/candidates",
  authActions.hashPassword,
  formCandidate.validate,
  candidateActions.add,
);
router.put(
  "/api/candidates/:id",
  formCandidate.validate,
  candidateActions.edit,
);
router.delete("/api/candidates/:id", candidateActions.destroy);

/* ************************************************************************* */

router.get("/api/offers", offerActions.browse);
router.get("/api/offers/companies/:id", offerActions.browseByCompany);
router.get("/api/offers/:id", offerActions.read);
router.post("/api/offers", formOffer.validate, offerActions.add);
router.put("/api/offers/:id", formOffer.validate, offerActions.edit);
router.delete("/api/offers/:id", offerActions.destroy);

/* ************************************************************************* */

// Define stack-related routes
import stackActions from "./modules/stack/stackActions";

router.get("/api/stacks", stackActions.browse);

/* ************************************************************************* */

// Define city-related routes

router.get("/api/cities", offerActions.browseCity);

/* ************************************************************************* */

router.get("/api/contracts", contractActions.browse);

/* ************************************************************************* */

router.get("/api/work_condition_options", workConditionActions.browse);

/* ************************************************************************* */

export default router;
