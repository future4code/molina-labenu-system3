import { connection } from "./connection";

const selectElementById = async(id: string, table: string): Promise<any> =>{
    const result = await connection.raw(`
        SELECT * FROM labenu_system_${table}
        WHERE id = "${id}";
    `)

    return result[0]
}

export default selectElementById