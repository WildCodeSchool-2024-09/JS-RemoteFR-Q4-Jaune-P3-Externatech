import type { RequestHandler } from "express";

import entrepriseRepository from "./entrepriseRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const entreprises = await entrepriseRepository.readAll();

    // Respond with the items in JSON format
    res.json(entreprises);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const entrepriseId = Number(req.params.id);
    const entreprise = await entrepriseRepository.read(entrepriseId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (entreprise == null) {
      res.sendStatus(404);
    } else {
      res.json(entreprise);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newEntreprise = {
      name: req.body.name,
      description: req.body.description,
    };

    // Create the item
    const insertId = await entrepriseRepository.create(newEntreprise);

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
    const entrepriseId = Number(req.params.id);

    await entrepriseRepository.delete(entrepriseId);

    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific program based on the provided ID
    const entreprise = {
      id: Number(req.params.id),
      name: req.body.name,
      description: req.body.description,
    };

    const affectedRows = await entrepriseRepository.update(entreprise);

    // If the program is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the program in JSON format
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

export default { browse, read, add, destroy, edit };
