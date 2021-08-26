import { connection } from "./connection";

const insertStudent = async (nome: string, email: string, newDate: string): Promise<any> => {

    const result = await connection('labenu_system_student')
    .insert({
        id: Date.now() + Math.random().toString(),
        nome,
        email,
        data_nasc: newDate,
        turma_id: "1"
    })

    return result
}

export default insertStudent;