import { connection } from "./connection";

const selectStudentById = async(id: string): Promise<any> =>{
    const result = await connection.raw(`
        SELECT * FROM labenu_system_student
        WHERE id = "${id}";
    `)

    return result[0]
}

export default selectStudentById