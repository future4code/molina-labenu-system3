import { connection } from "./connection"

export async function deletePerson( 
    id: string,
    table: string
    ): Promise<any> {

    await connection.raw(`
        DELETE FROM labenu_system_${table}
        WHERE id = ${id}
    `)
}