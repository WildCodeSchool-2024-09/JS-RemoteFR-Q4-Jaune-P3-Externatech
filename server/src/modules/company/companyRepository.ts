import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Company = {
  id: number;
  logo: string;
  name: string;
  email: string;
  description: string;
  hashed_password: string;
  siret: string;
  address?: string;
  postalCode?: string;
  city?: string;
  size?: string;
  website?: string;
};

type editCompany = {
  id: number;
  logo: string;
  name: string;
  email: string;
  description: string;
  siret: string;
  address: string;
  postalCode: string;
  city: string;
  size: string;
  website: string;
};

class CompanyRepository {
  async create(company: Omit<Company, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into company (name, logo, description, email, hashed_password, siret) values (?, ?, ?, ?, ?, ?)",
      [
        company.name,
        company.logo,
        company.description,
        company.email,
        company.hashed_password,
        company.siret,
      ],
    );

    return result.insertId;
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from company where email = ?",
      [email],
    );

    return rows[0] as Company;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from company where id = ?",
      [id],
    );

    return rows[0] as Company;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from company");

    return rows as Company[];
  }

  async update(editCompany: editCompany) {
    const [result] = await databaseClient.query<Result>(
      "update company set name = ?, logo =?, description = ?, email = ?, siret = ?, address = ?, postalCode = ?, city = ?, size = ?, website = ?  where id = ?",
      [
        editCompany.name,
        editCompany.logo,
        editCompany.description,
        editCompany.email,
        editCompany.siret,
        editCompany.address,
        editCompany.postalCode,
        editCompany.city,
        editCompany.size,
        editCompany.website,
        editCompany.id,
      ],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from company where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new CompanyRepository();
