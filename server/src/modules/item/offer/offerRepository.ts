import DatabaseClient from "../../../../database/client";
import type { Result, Rows } from "../../../../database/client";

type Offer = {
	id: number;
	title: string;
	description: string;
	date: string;
	salary: number;
	requirements: string;
	entreprise_id: number;
	contract_id: number;
};

class offerRepository {
	async create(offer: Omit<Offer, "id">) {
		// Execute the SQL INSERT query to add a new category to the "category" table
		const {
			title,
			description,
			date,
			salary,
			requirements,
			entreprise_id,
			contract_id,
		} = offer;
		const [result] = await DatabaseClient.query<Result>(
			"insert into offer (title, description, date, salary, requirements, entreprise_id, contract_id) values (?, ?, ?, ?, ?, ?, ?)",
			[
				offer.title,
				offer.description,
				offer.date,
				offer.salary,
				offer.requirements,
				offer.entreprise_id,
				offer.contract_id,
			],
		);

		// Return the ID of the newly inserted item
		return result.insertId;
	}

	async readAll() {
		// Execute the SQL SELECT query to retrieve all categories from the "category" table
		const [rows] = await DatabaseClient.query<Rows>("select * from offer");

		// Return the array of categories
		return rows as Offer[];
	}

	async read(id: number) {
		console.info(id);
		const [rows] = await DatabaseClient.query<Rows>(
			"SELECT * FROM offer WHERE id = ? ",
			[id],
		);

		return rows.length > 0 ? rows[0] : null; // Retourne null si non trouvé
	}

	async update(offer: Offer) {
		// Execute the SQL UPDATE query to update an existing category in the "category" table
		const [result] = await DatabaseClient.query<Result>(
			"update offer set title = ?, description = ?, date = ?, salary = ?, requirements = ?, entreprise_id = ?, contract_id = ? where id = ?",
			[
				offer.title,
				offer.description,
				offer.date,
				offer.salary,
				offer.requirements,
				offer.entreprise_id,
				offer.contract_id,
				offer.id,
			],
		);

		return result.affectedRows;
	}

	async delete(id: number) {
		// Execute the SQL DELETE query to delete an existing offer from the "offer" table
		const [result] = await DatabaseClient.query<Result>(
			"delete from offer where id = ?",
			[id],
		);

		return result.affectedRows;
	}
}

export default new offerRepository();
