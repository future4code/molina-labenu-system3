import { connection } from "./connection"

const deleteRelation = async ( 
    id: string,
    table: string,
    type: string
    ): Promise<any> => {

        console.log(id,table,type)

    await connection.raw(`
        DELETE FROM labenu_system_${table}
        WHERE ${type}_id = ${id}
    `)
}

export default deleteRelation