import type { RequestHandler } from "express";
import offerRepository from "./offerRepository";

const browse: RequestHandler = async (req, res, next) => {
	try {
		// Fetch all categories
		const offer = await offerRepository.readAll();

		// Respond with the categories in JSON format
		res.json(offer);
	} catch (err) {
		// Pass any errors to the error-handling middleware
		next(err);
	}
};

const read: RequestHandler = async (req, res, next) => {
	try {
		// Fetch a specific category based on the provided ID
		const offerId = Number(req.params.id);
		const offer = await offerRepository.read(offerId);

		// If the category is not found, respond with HTTP 404 (Not Found)
		// Otherwise, respond with the category in JSON format
		if (offer == null) {
			res.sendStatus(404);
		} else {
			res.json(offer);
		}
	} catch (err) {
		// Pass any errors to the error-handling middleware
		next(err);
	}
};

const edit: RequestHandler = async (req, res, next) => {
	try {
		// Update a specific category based on the provided ID
		const offer = {
			id: Number(req.params.id),
			title: req.body.title,
			description: req.body.description,
			date: req.body.date,
			salary: req.body.salary,
			requirements: req.body.requirements,
			entreprise_id: req.body.entreprise_id,
			contract_id: req.body.contract_id,
		};

		const affectedRows = await offerRepository.update(offer);

		// If the category is not found, respond with HTTP 404 (Not Found)
		// Otherwise, respond with the category in JSON format
		if (affectedRows === 0) {
			res.sendStatus(404);
		} else {
			res.sendStatus(204);
		}
	} catch (err) {
		// Pass any errors to the error-handling middleware
		next(err);
	}
};

const add: RequestHandler = async (req, res, next) => {
	try {
		const newOffer = req.body;

		console.log("console debug", req.body); // Ajoute ce log pour voir ce qui est reçu
		// Create the offer
		const insertId = await offerRepository.create(newOffer);

		// Respond with HTTP 201 (Created) and the ID of the newly inserted item
		res.status(201).json({ insertId });
	} catch (err) {
		// Pass any errors to the error-handling middleware
		next(err);
	}
};

const destroy: RequestHandler = async (req, res, next) => {
	try {
		// Delete a specific category based on the provided ID
		const offerId = Number(req.params.id);

		await offerRepository.delete(offerId);

		// Respond with HTTP 204 (No Content) anyway
		res.sendStatus(204);
	} catch (err) {
		// Pass any errors to the error-handling middleware
		next(err);
	}
};

export default { browse, read, add, edit, destroy };
