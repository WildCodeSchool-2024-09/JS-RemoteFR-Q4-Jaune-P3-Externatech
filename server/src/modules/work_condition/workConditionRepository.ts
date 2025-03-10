import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type workCondition = {
  id: number;
  name: string;
};

class workConditionRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>(
      "select * from work_condition",
    );

    return rows as workCondition[];
  }
}

export default new workConditionRepository();
