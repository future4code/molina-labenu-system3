import { connection } from "./connection"

export async function updateClass(
    id: string,
    turma: string,
    table: string    
): Promise<void> {

    await connection(`labenu_system_${table}`)
        .update({ "class_id": turma })
        .where("id", "=", `${id}`)
}