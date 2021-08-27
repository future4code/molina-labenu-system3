import { connection } from "./connection";

const insertHobbie = async (
    idUser: string, 
    nome: string, 
    idHobbie: string
    ):Promise<any> => {

    const result = await connection.raw(`
        INSERT INTO labenu_system_hobbies
        (id, nome)
        VALUES ("${idHobbie}", "${nome}");

        INSERT INTO labenu_system_student_hobbies
        (student_id, hobbies_id)
        VALUES ("${idUser}", "${idHobbie}");
    `)
    

    return result
}

export default insertHobbie;