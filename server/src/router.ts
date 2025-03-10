import express from "express";

const router = express.Router();

//Define your imports here
/* ************************************************************************* */

import authActions from "./middlewares/authActions";
import formCandidate from "./middlewares/formCandidate";
import formCompany from "./middlewares/formCompany";
import formOffer from "./middlewares/formOffer";

/* *********************************************************************** */

import candidateActions from "./modules/candidate/candidateActions";
import candidate_offerActions from "./modules/candidate_offer/candidate_offerActions";
import companyActions from "./modules/company/companyActions";
import contractActions from "./modules/contract/contractActions";
import offerActions from "./modules/offer/offerActions";
import remoteActions from "./modules/remote/remoteActions";
import stackActions from "./modules/stack/stackActions";

/* LOGIN ************************************************************************* */

router.post("/api/login", authActions.login);

/* COMPANIES ************************************************************************* */

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

/* CANDIDATES ************************************************************************* */

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

/* OFFERS ************************************************************************* */

router.get("/api/offers", offerActions.browse);
router.get("/api/offers/companies/:id", offerActions.browseByCompany);
router.get("/api/offers/:id", offerActions.read);
router.post("/api/offers", formOffer.validate, offerActions.add);
router.put("/api/offers/:id", offerActions.edit);
router.delete("/api/offers/:id", offerActions.destroy);

/* CANDIDATE_OFFER / APPLICATIONS ************************************************************************* */

router.get(
  "/api/candidates_offers/:company_id",
  candidate_offerActions.browseCandidatesByCompany,
);

/* STACK ************************************************************************* */

router.get("/api/stacks", stackActions.browse);

/* CITY ************************************************************************* */

router.get("/api/cities", offerActions.browseCity);

/* CONTRACTS ************************************************************************* */

router.get("/api/contracts", contractActions.browse);

/* REMOTE OPTIONS ************************************************************************* */

router.get("/api/remote_options", remoteActions.browse);

/* ************************************************************************* */

export default router;
