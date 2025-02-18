import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

// Define offer-related routes
import offerActions from "./modules/item/offer/offerActions";

router.get("/api/offer", offerActions.browse);
router.get("/api/offer/:id", offerActions.read);
router.post("/api/offer", offerActions.add);
router.put("/api/offer/:id", offerActions.edit);
router.delete("/api/offer/:id", offerActions.destroy);

export default router;
