import { connection } from "./connection";

const insertPerson = async (
    nome: string, 
    email: string, 
    newDate: string,
    table: string
    ):Promise<any> => {

    const result = await connection(`labenu_system_${table}`)
    .insert({
        id: Date.now() + Math.random().toString(),
        nome,
        email,
        data_nasc: newDate,
        class_id: "007"
    })

    return result
}

export default insertPerson;