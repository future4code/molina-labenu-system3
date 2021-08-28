import { connection } from "./connection";

const insertClass = async(
    nome: string,
    dataInicio: string,
    dataFinal: string,
    modulo: string,
    turno: string
    ): Promise<any> => {

    await connection.raw(`
        INSERT INTO labenu_system_class (id, nome, data_inicio, data_final, modulo )
        VALUES(
            ${Date.now() + Math.random().toString()},
            "${turno === "integral" ? nome : nome+"-na-night"}",
            "${dataInicio}",
            "${dataFinal}",
            "${modulo}"
        )
    `)
}

export default insertClass;