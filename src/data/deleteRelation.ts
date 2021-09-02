import { connection } from "./connection";

const deleteRelation = async ( 
    id: string,
    table: string,
    type: string
    ): Promise<any> => {
        await connection.raw(`
            DELETE FROM labenu_system_${table}
            WHERE ${type}_id = ${id}
        `);
};

export default deleteRelation;