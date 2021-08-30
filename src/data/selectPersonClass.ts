import { connection } from "./connection";

const selectPersonClass = async(
    id: string,
    table: string
    ): Promise<any> => {
        const result = await connection.raw(`
            SELECT * FROM labenu_system_${table}
            WHERE class_id = "${id}";
        `);
        return result[0];
};

export default selectPersonClass;