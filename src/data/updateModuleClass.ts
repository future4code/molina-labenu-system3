import { connection } from "./connection";

const updateModuleClass = async(id: string, module: string): Promise<any> => {
    await connection.raw(`
        UPDATE labenu_system_class
        SET modulo="${module}"
        WHERE id="${id}"
    `)
}

export default updateModuleClass