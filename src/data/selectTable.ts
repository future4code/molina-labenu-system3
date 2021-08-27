import { connection } from "./connection";

const selectTable = async (table: string): Promise<any> => {

    const result = await connection(`labenu_system_${table}`)
    

    return result

}

export default selectTable;