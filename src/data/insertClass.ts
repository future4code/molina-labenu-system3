import { connection } from "./connection";

const insertClass = async(
    name: string,
    startDate: string,
    finalDate: string,
    module: string,
    shift: string
    ): Promise<any> => {

    await connection.raw(`
        INSERT INTO labenu_system_class (id, nome, data_inicio, data_final, modulo )
        VALUES(
            ${Date.now() + Math.random().toString()},
            "${shift === "full" ? name : name+"-na-night"}",
            "${startDate}",
            "${finalDate}",
            "${module}"
        )
    `)
}

export default insertClass;