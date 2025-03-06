import express from "express";
import form from "./middlewares/form";
import formOffer from "./middlewares/formOffer";

const router = express.Router();

//Define your imports here
/* ************************************************************************* */
import authActions from "./middlewares/authActions";
import candidateActions from "./modules/candidate/candidateActions";
import companyActions from "./modules/company/companyActions";
import contractActions from "./modules/contract/contractActions";
import offerActions from "./modules/offer/offerActions";

/* ************************************************************************* */

import formCandidate from "./middlewares/formCandidate";

/* ************************************************************************* */
// Define Your API Routes Here

router.post("/api/candidates/login", authActions.loginCandidate);
router.post("/api/companies/login", authActions.login);

/* ************************************************************************* */

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
router.put("/api/offers/:id", offerActions.edit);
router.delete("/api/offers/:id", offerActions.destroy);

/* ************************************************************************* */

// Define stack-related routes
import stackActions from "./modules/stack/stackActions";

router.get("/api/stacks", stackActions.browse);

/* ************************************************************************* */

// Define city-related routes
import cityActions from "./modules/city/cityActions";

router.get("/api/cities", cityActions.browse);

/* ************************************************************************* */

router.get("/api/contracts", contractActions.browse);

/* ************************************************************************* */

export default router;
