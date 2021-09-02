import { connection } from "./connection";

const updateModuleClass = async(id: string, modulo: string): Promise<any> => {
    await connection.raw(`
        UPDATE labenu_system_class
        SET modulo="${modulo}"
        WHERE id="${id}"
    `);
};

export default updateModuleClass;