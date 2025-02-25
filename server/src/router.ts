import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define company-related routes
import companyActions from "./modules/company/companyActions";

router.get("/api/companies", companyActions.browse);
router.get("/api/companies/:id", companyActions.read);
router.post("/api/companies", companyActions.add);
router.put("/api/companies/:id", companyActions.edit);
router.delete("/api/companies/:id", companyActions.destroy);

/* ************************************************************************* */

import offerActions from "./modules/offer/offerActions";

router.get("/api/offers", offerActions.browse);
router.get("/api/offers/:id", offerActions.read);
router.post("/api/offers", offerActions.add);
router.put("/api/offers/:id", offerActions.edit);
router.delete("/api/offers/:id", offerActions.destroy);

import contractActions from "./modules/contract/contractActions";

router.get("/api/contract", contractActions.browse);
router.get("/api/contract/:id", contractActions.read);
router.post("/api/contract", contractActions.add);
router.put("/api/contract/:id", contractActions.edit);
router.delete("/api/contract/:id", contractActions.destroy);

export default router;
