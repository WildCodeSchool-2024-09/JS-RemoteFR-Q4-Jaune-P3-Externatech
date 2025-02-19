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

router.get("/api/offers", offerActions.browse);
router.get("/api/offers/:id", offerActions.read);
router.post("/api/offers", offerActions.add);
router.put("/api/offers/:id", offerActions.edit);
router.delete("/api/offers/:id", offerActions.destroy);

export default router;
