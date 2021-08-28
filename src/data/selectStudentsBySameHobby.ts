import { connection } from "./connection";

const selectStudentsBySameHobby = async (
    name: string
    ): Promise<any> => {
        const result = await connection.raw(`
            SELECT users.student_id as id, students.nome as nome
            FROM labenu_system_hobbies AS hobbies
            JOIN labenu_system_student_hobbies AS users
            ON hobbies.id = users.hobbies_id
            JOIN labenu_system_student AS students
            ON users.student_id = students.id
            WHERE hobbies.nome LIKE "%${name}%";
        `)
    
    return result[0]

}

export default selectStudentsBySameHobby;