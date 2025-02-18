import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define entreprise-related routes
import entrepriseActions from "./modules/entreprise/entrepriseActions";

router.get("/api/entreprises", entrepriseActions.browse);
router.get("/api/entreprises/:id", entrepriseActions.read);
router.post("/api/entreprises", entrepriseActions.add);
router.delete("/api/entreprises/:id", entrepriseActions.destroy);
router.put("/api/entreprises/:id", entrepriseActions.edit);

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

export default router;
