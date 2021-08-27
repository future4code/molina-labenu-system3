import { connection } from "./connection";

const selectAgeStudentsById = async(studentsId: string): Promise<any> => {

    const result = await connection.raw(`
        SELECT data_nasc FROM labenu_system_student
        WHERE id="${studentsId}"
    `)

    return result[0]

}

export default selectAgeStudentsById