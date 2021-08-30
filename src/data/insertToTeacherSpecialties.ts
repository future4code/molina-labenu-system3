import { connection } from "./connection";

const insertToTeacherSpecialties = async(
    teacherId: string,
    specialtiesId: string
    ): Promise<any> => {
        await connection.raw(`
            INSERT INTO labenu_system_teacher_specialties
            VALUES(
                "${teacherId}",
                "${specialtiesId}"
            )
        `);
    };
export default insertToTeacherSpecialties;