import { connection } from "./connection";

const selectRelationById = async(
    id: string,
    table: string,
    type: string
    ): Promise<any> =>{
        const result = await connection.raw(`
            SELECT * FROM labenu_system_${table}
            WHERE ${type}_id = "${id}";
        `);
        return result[0];
};

export default selectRelationById;