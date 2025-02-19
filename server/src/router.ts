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

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

export default router;
